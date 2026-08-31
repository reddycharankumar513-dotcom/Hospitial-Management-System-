package com.hms.pharmacy.config;

import com.hms.pharmacy.entity.Medicine;
import com.hms.pharmacy.repository.MedicineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final MedicineRepository repository;

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            createMed("MED-7001", "Amolodipine 5mg", "Amlodipine", "Cardiovascular", 100, 15.0);
            createMed("MED-7002", "Paracetamol 500mg", "Acetaminophen", "Analgesics", 250, 5.0);
            createMed("MED-7003", "Amoxicillin 500mg", "Amoxicillin", "Antibiotics", 80, 25.0);
            createMed("MED-7004", "Metformin 500mg", "Metformin", "Antidiabetic", 150, 12.0);
            createMed("MED-7005", "Atorvastatin 10mg", "Atorvastatin", "Statin", 60, 30.0);
        }
    }

    private void createMed(String code, String name, String generic, String cat, Integer qty, Double price) {
        Medicine med = Medicine.builder()
                .medicineCode(code)
                .name(name)
                .genericName(generic)
                .category(cat)
                .manufacturer("PharmaCorp")
                .batchNumber("B2026-X")
                .expiryDate(LocalDate.now().plusMonths(18))
                .quantity(qty)
                .reorderLevel(20)
                .price(price)
                .status("IN_STOCK")
                .build();
        repository.save(med);
    }
}
