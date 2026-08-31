package com.hms.pharmacy.service;

import com.hms.pharmacy.dto.PharmacyDtos.*;
import com.hms.pharmacy.entity.Medicine;
import com.hms.pharmacy.entity.Prescription;
import com.hms.pharmacy.repository.MedicineRepository;
import com.hms.pharmacy.repository.PrescriptionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PharmacyService {

    private final MedicineRepository medicineRepository;
    private final PrescriptionRepository prescriptionRepository;
    private final KafkaProducerService kafkaProducer;

    public MedicineResponse addMedicine(MedicineRequest req) {
        String code = "MED-" + System.currentTimeMillis() % 100000;
        Medicine med = Medicine.builder()
                .medicineCode(code)
                .name(req.getName())
                .genericName(req.getGenericName())
                .category(req.getCategory() != null ? req.getCategory() : "General")
                .manufacturer(req.getManufacturer())
                .batchNumber(req.getBatchNumber() != null ? req.getBatchNumber() : "B1001")
                .expiryDate(req.getExpiryDate() != null ? req.getExpiryDate() : LocalDate.now().plusYears(1))
                .quantity(req.getQuantity())
                .reorderLevel(req.getReorderLevel() != null ? req.getReorderLevel() : 10)
                .price(req.getPrice() != null ? req.getPrice() : 10.0)
                .status(req.getQuantity() > 0 ? "IN_STOCK" : "OUT_OF_STOCK")
                .build();

        return mapToMedicineResponse(medicineRepository.save(med));
    }

    public List<MedicineResponse> getAllMedicines() {
        return medicineRepository.findAll().stream().map(this::mapToMedicineResponse).toList();
    }

    public MedicineResponse getMedicineById(Long id) {
        Medicine med = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));
        return mapToMedicineResponse(med);
    }

    public MedicineResponse updateMedicine(Long id, MedicineRequest req) {
        Medicine med = medicineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + id));

        med.setName(req.getName());
        med.setGenericName(req.getGenericName());
        med.setQuantity(req.getQuantity());
        med.setPrice(req.getPrice());
        if (req.getExpiryDate() != null) med.setExpiryDate(req.getExpiryDate());

        return mapToMedicineResponse(medicineRepository.save(med));
    }

    public Prescription createPrescription(PrescriptionRequest req) {
        Prescription p = Prescription.builder()
                .patientId(req.getPatientId())
                .doctorId(req.getDoctorId())
                .medicalRecordId(req.getMedicalRecordId())
                .medicineName(req.getMedicineName())
                .dosage(req.getDosage() != null ? req.getDosage() : "1 tablet daily")
                .quantityRequested(req.getQuantityRequested())
                .status("PENDING")
                .createdAt(LocalDateTime.now())
                .build();

        Prescription saved = prescriptionRepository.save(p);
        kafkaProducer.sendEvent("PrescriptionCreated", String.format("{\"prescriptionId\":%d, \"patientId\":%d}", saved.getId(), saved.getPatientId()));
        return saved;
    }

    @Transactional
    public DispenseResponse dispenseMedicine(DispenseRequest req) {
        Prescription prescription = prescriptionRepository.findById(req.getPrescriptionId())
                .orElseThrow(() -> new RuntimeException("Prescription not found with id: " + req.getPrescriptionId()));

        Medicine medicine = medicineRepository.findById(req.getMedicineId())
                .orElseThrow(() -> new RuntimeException("Medicine not found with id: " + req.getMedicineId()));

        if (medicine.getExpiryDate() != null && medicine.getExpiryDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Cannot dispense expired medicine!");
        }

        if (medicine.getQuantity() < req.getQuantity()) {
            throw new RuntimeException("Insufficient medicine stock! Available: " + medicine.getQuantity());
        }

        medicine.setQuantity(medicine.getQuantity() - req.getQuantity());
        if (medicine.getQuantity() <= 0) {
            medicine.setStatus("OUT_OF_STOCK");
        }
        medicineRepository.save(medicine);

        prescription.setStatus("DISPENSED");
        prescriptionRepository.save(prescription);

        if (medicine.getQuantity() <= medicine.getReorderLevel()) {
            kafkaProducer.sendEvent("LowStockAlert", String.format("{\"medicineId\":%d, \"medicineName\":\"%s\", \"remainingQuantity\":%d}",
                    medicine.getId(), medicine.getName(), medicine.getQuantity()));
        }

        kafkaProducer.sendEvent("MedicineDispensed", String.format("{\"prescriptionId\":%d, \"medicineId\":%d, \"quantity\":%d}",
                prescription.getId(), medicine.getId(), req.getQuantity()));

        double total = medicine.getPrice() * req.getQuantity();

        return DispenseResponse.builder()
                .prescriptionId(prescription.getId())
                .medicineName(medicine.getName())
                .quantityDispensed(req.getQuantity())
                .totalAmount(total)
                .status("DISPENSED")
                .build();
    }

    private MedicineResponse mapToMedicineResponse(Medicine m) {
        return MedicineResponse.builder()
                .id(m.getId())
                .medicineCode(m.getMedicineCode())
                .name(m.getName())
                .genericName(m.getGenericName())
                .category(m.getCategory())
                .manufacturer(m.getManufacturer())
                .batchNumber(m.getBatchNumber())
                .expiryDate(m.getExpiryDate())
                .quantity(m.getQuantity())
                .reorderLevel(m.getReorderLevel())
                .price(m.getPrice())
                .status(m.getStatus())
                .build();
    }
}
