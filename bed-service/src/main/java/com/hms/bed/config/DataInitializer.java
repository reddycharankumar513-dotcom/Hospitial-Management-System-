package com.hms.bed.config;

import com.hms.bed.entity.Bed;
import com.hms.bed.repository.BedRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final BedRepository repository;

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            createBed("ICU-01", "Intensive Care Unit", "ICU", 1500.0);
            createBed("ICU-02", "Intensive Care Unit", "ICU", 1500.0);
            createBed("GEN-101", "General Ward A", "GENERAL", 400.0);
            createBed("GEN-102", "General Ward A", "GENERAL", 400.0);
            createBed("PVT-301", "Private Deluxe Wing", "PRIVATE", 1000.0);
            createBed("EMG-01", "Emergency Trauma Ward", "EMERGENCY", 800.0);
        }
    }

    private void createBed(String num, String ward, String type, Double rate) {
        Bed bed = Bed.builder()
                .bedNumber(num)
                .wardName(ward)
                .wardType(type)
                .status("AVAILABLE")
                .dailyRate(rate)
                .build();
        repository.save(bed);
    }
}
