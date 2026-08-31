package com.hms.patient.config;

import com.hms.patient.entity.Patient;
import com.hms.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final PatientRepository patientRepository;

    @Override
    public void run(String... args) {
        if (patientRepository.count() == 0) {
            createPatient(8L, "PAT-1001", "Peter", "Parker", LocalDate.of(1998, 8, 10), "Male", "9876543210", "patient@hms.com", "O+");
            createPatient(9L, "PAT-1002", "Tony", "Stark", LocalDate.of(1975, 5, 29), "Male", "9876543211", "patient2@hms.com", "A+");
            createPatient(10L, "PAT-1003", "Diana", "Prince", LocalDate.of(1990, 3, 22), "Female", "9876543212", "patient3@hms.com", "B+");
        }
    }

    private void createPatient(Long userId, String number, String first, String last, LocalDate dob, String gender, String phone, String email, String bloodGroup) {
        Patient patient = Patient.builder()
                .userId(userId)
                .patientNumber(number)
                .firstName(first)
                .lastName(last)
                .dateOfBirth(dob)
                .gender(gender)
                .phone(phone)
                .email(email)
                .bloodGroup(bloodGroup)
                .address("123 Health Ave, Metro City")
                .emergencyContact("9998887776")
                .status("ACTIVE")
                .build();
        patientRepository.save(patient);
    }
}
