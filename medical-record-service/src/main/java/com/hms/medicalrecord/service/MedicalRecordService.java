package com.hms.medicalrecord.service;

import com.hms.medicalrecord.dto.MedicalRecordDtos.*;
import com.hms.medicalrecord.entity.MedicalRecord;
import com.hms.medicalrecord.repository.MedicalRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MedicalRecordService {

    private final MedicalRecordRepository repository;

    public RecordResponse createRecord(RecordRequest req) {
        MedicalRecord record = MedicalRecord.builder()
                .patientId(req.getPatientId())
                .doctorId(req.getDoctorId())
                .appointmentId(req.getAppointmentId())
                .visitDate(req.getVisitDate() != null ? req.getVisitDate() : LocalDate.now())
                .symptoms(req.getSymptoms())
                .observations(req.getObservations())
                .diagnosisNotes(req.getDiagnosisNotes())
                .treatmentNotes(req.getTreatmentNotes())
                .prescription(req.getPrescription())
                .followUpDate(req.getFollowUpDate())
                .build();

        return mapToResponse(repository.save(record));
    }

    public RecordResponse getRecordById(Long id) {
        MedicalRecord record = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical record not found with id: " + id));
        return mapToResponse(record);
    }

    public List<RecordResponse> getRecordsByPatient(Long patientId) {
        return repository.findByPatientId(patientId).stream().map(this::mapToResponse).toList();
    }

    public RecordResponse updateRecord(Long id, RecordRequest req) {
        MedicalRecord rec = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medical record not found with id: " + id));

        rec.setSymptoms(req.getSymptoms());
        rec.setObservations(req.getObservations());
        rec.setDiagnosisNotes(req.getDiagnosisNotes());
        rec.setTreatmentNotes(req.getTreatmentNotes());
        rec.setPrescription(req.getPrescription());
        rec.setFollowUpDate(req.getFollowUpDate());

        return mapToResponse(repository.save(rec));
    }

    private RecordResponse mapToResponse(MedicalRecord r) {
        return RecordResponse.builder()
                .id(r.getId())
                .patientId(r.getPatientId())
                .doctorId(r.getDoctorId())
                .appointmentId(r.getAppointmentId())
                .visitDate(r.getVisitDate())
                .symptoms(r.getSymptoms())
                .observations(r.getObservations())
                .diagnosisNotes(r.getDiagnosisNotes())
                .treatmentNotes(r.getTreatmentNotes())
                .prescription(r.getPrescription())
                .followUpDate(r.getFollowUpDate())
                .build();
    }
}
