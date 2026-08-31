package com.hms.doctor.config;

import com.hms.doctor.entity.Doctor;
import com.hms.doctor.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final DoctorRepository doctorRepository;

    @Override
    public void run(String... args) {
        if (doctorRepository.count() == 0) {
            createDoctor(2L, "DOC-2001", "John", "Doe", "Cardiology", "Cardiology", "MD, FACC", 12, "doctor@hms.com", 150.0);
            createDoctor(3L, "DOC-2002", "Sarah", "Connor", "General Physician", "General Medicine", "MBBS, MD", 8, "doctor2@hms.com", 100.0);
        }
    }

    private void createDoctor(Long userId, String number, String first, String last, String spec, String dept, String qual, Integer exp, String email, Double fee) {
        Doctor doctor = Doctor.builder()
                .userId(userId)
                .doctorNumber(number)
                .firstName(first)
                .lastName(last)
                .specialization(spec)
                .department(dept)
                .qualification(qual)
                .experience(exp)
                .phone("9876500000")
                .email(email)
                .consultationFee(fee)
                .status("AVAILABLE")
                .build();
        doctorRepository.save(doctor);
    }
}
