package com.hms.lab.config;

import com.hms.lab.entity.LabOrder;
import com.hms.lab.repository.LabOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final LabOrderRepository repository;

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            LabOrder order = LabOrder.builder()
                    .orderNumber("LAB-8001")
                    .patientId(1L)
                    .doctorId(1L)
                    .appointmentId(1L)
                    .testName("Complete Blood Count (CBC)")
                    .category("Hematology")
                    .priority("URGENT")
                    .status("ORDERED")
                    .build();
            repository.save(order);
        }
    }
}
