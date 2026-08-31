package com.hms.medicalrecord.config;

import com.hms.medicalrecord.entity.MedicalRecord;
import com.hms.medicalrecord.repository.MedicalRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final MedicalRecordRepository repository;

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            MedicalRecord record = MedicalRecord.builder()
                    .patientId(1L)
                    .doctorId(1L)
                    .appointmentId(1L)
                    .visitDate(LocalDate.now().minusDays(2))
                    .symptoms("Chest tightness, mild fatigue")
                    .observations("Normal heart sounds S1 S2, BP 130/85")
                    .diagnosisNotes("Mild essential hypertension")
                    .treatmentNotes("Lifestyle modification, low sodium diet")
                    .prescription("Amolodipine 5mg once daily for 30 days")
                    .followUpDate(LocalDate.now().plusDays(28))
                    .build();
            repository.save(record);
        }
    }
}
