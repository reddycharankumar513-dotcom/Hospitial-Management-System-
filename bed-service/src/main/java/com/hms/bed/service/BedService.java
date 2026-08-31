package com.hms.bed.service;

import com.hms.bed.dto.BedDtos.*;
import com.hms.bed.entity.Admission;
import com.hms.bed.entity.Bed;
import com.hms.bed.repository.AdmissionRepository;
import com.hms.bed.repository.BedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BedService {

    private final BedRepository bedRepository;
    private final AdmissionRepository admissionRepository;
    private final KafkaProducerService kafkaProducer;

    public BedResponse createBed(BedRequest req) {
        Bed bed = Bed.builder()
                .bedNumber(req.getBedNumber())
                .wardName(req.getWardName())
                .wardType(req.getWardType())
                .status("AVAILABLE")
                .dailyRate(req.getDailyRate() != null ? req.getDailyRate() : 500.0)
                .build();
        return mapToBedResponse(bedRepository.save(bed));
    }

    public List<BedResponse> getAllBeds() {
        return bedRepository.findAll().stream().map(this::mapToBedResponse).toList();
    }

    public List<BedResponse> getAvailableBeds() {
        return bedRepository.findByStatus("AVAILABLE").stream().map(this::mapToBedResponse).toList();
    }

    public BedResponse updateBedStatus(Long id, String status) {
        Bed bed = bedRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bed not found with id: " + id));
        bed.setStatus(status);
        return mapToBedResponse(bedRepository.save(bed));
    }

    @Transactional
    public AdmissionResponse admitPatient(AdmissionRequest req) {
        Bed bed = bedRepository.findById(req.getBedId())
                .orElseThrow(() -> new RuntimeException("Bed not found with id: " + req.getBedId()));

        if (!"AVAILABLE".equals(bed.getStatus())) {
            throw new RuntimeException("Selected bed is not available for admission! Current status: " + bed.getStatus());
        }

        admissionRepository.findByPatientIdAndStatus(req.getPatientId(), "ADMITTED").ifPresent(a -> {
            throw new RuntimeException("Patient is already admitted in Bed ID: " + a.getBedId());
        });

        bed.setStatus("OCCUPIED");
        bedRepository.save(bed);

        String admNum = "ADM-" + System.currentTimeMillis() % 100000;
        Admission admission = Admission.builder()
                .admissionNumber(admNum)
                .patientId(req.getPatientId())
                .bedId(req.getBedId())
                .admittingDoctorId(req.getAdmittingDoctorId())
                .diagnosis(req.getDiagnosis())
                .status("ADMITTED")
                .admissionDate(LocalDateTime.now())
                .build();

        Admission saved = admissionRepository.save(admission);
        kafkaProducer.sendEvent("PatientAdmitted", String.format("{\"admissionId\":%d, \"patientId\":%d, \"bedId\":%d}", saved.getId(), saved.getPatientId(), saved.getBedId()));
        return mapToAdmissionResponse(saved);
    }

    @Transactional
    public AdmissionResponse transferPatient(Long admissionId, TransferRequest req) {
        Admission admission = admissionRepository.findById(admissionId)
                .orElseThrow(() -> new RuntimeException("Admission record not found with id: " + admissionId));

        Bed currentBed = bedRepository.findById(admission.getBedId())
                .orElseThrow(() -> new RuntimeException("Current bed not found"));

        Bed newBed = bedRepository.findById(req.getNewBedId())
                .orElseThrow(() -> new RuntimeException("Target bed not found with id: " + req.getNewBedId()));

        if (!"AVAILABLE".equals(newBed.getStatus())) {
            throw new RuntimeException("Target bed is not available!");
        }

        currentBed.setStatus("AVAILABLE");
        bedRepository.save(currentBed);

        newBed.setStatus("OCCUPIED");
        bedRepository.save(newBed);

        admission.setBedId(newBed.getId());
        admission.setStatus("TRANSFERRED");

        return mapToAdmissionResponse(admissionRepository.save(admission));
    }

    @Transactional
    public AdmissionResponse dischargePatient(Long admissionId) {
        Admission admission = admissionRepository.findById(admissionId)
                .orElseThrow(() -> new RuntimeException("Admission record not found with id: " + admissionId));

        Bed bed = bedRepository.findById(admission.getBedId())
                .orElseThrow(() -> new RuntimeException("Bed not found"));

        bed.setStatus("AVAILABLE");
        bedRepository.save(bed);

        admission.setStatus("DISCHARGED");
        admission.setDischargeDate(LocalDateTime.now());

        Admission saved = admissionRepository.save(admission);
        kafkaProducer.sendEvent("PatientDischarged", String.format("{\"admissionId\":%d, \"patientId\":%d}", saved.getId(), saved.getPatientId()));
        return mapToAdmissionResponse(saved);
    }

    public AdmissionResponse getAdmissionById(Long id) {
        Admission a = admissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admission not found with id: " + id));
        return mapToAdmissionResponse(a);
    }

    public List<AdmissionResponse> getAdmissionsByPatient(Long patientId) {
        return admissionRepository.findByPatientId(patientId).stream().map(this::mapToAdmissionResponse).toList();
    }

    private BedResponse mapToBedResponse(Bed b) {
        return BedResponse.builder()
                .id(b.getId())
                .bedNumber(b.getBedNumber())
                .wardName(b.getWardName())
                .wardType(b.getWardType())
                .status(b.getStatus())
                .dailyRate(b.getDailyRate())
                .build();
    }

    private AdmissionResponse mapToAdmissionResponse(Admission a) {
        return AdmissionResponse.builder()
                .id(a.getId())
                .admissionNumber(a.getAdmissionNumber())
                .patientId(a.getPatientId())
                .bedId(a.getBedId())
                .admittingDoctorId(a.getAdmittingDoctorId())
                .diagnosis(a.getDiagnosis())
                .status(a.getStatus())
                .admissionDate(a.getAdmissionDate())
                .dischargeDate(a.getDischargeDate())
                .build();
    }
}
