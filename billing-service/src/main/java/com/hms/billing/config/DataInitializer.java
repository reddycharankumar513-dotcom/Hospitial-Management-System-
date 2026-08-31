package com.hms.billing.config;

import com.hms.billing.entity.Bill;
import com.hms.billing.repository.BillRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final BillRepository repository;

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            Bill bill = Bill.builder()
                    .billNumber("INV-9001")
                    .patientId(1L)
                    .appointmentId(1L)
                    .totalAmount(150.0)
                    .discount(0.0)
                    .taxAmount(15.0)
                    .netAmount(165.0)
                    .paidAmount(0.0)
                    .status("GENERATED")
                    .billDate(LocalDate.now())
                    .dueDate(LocalDate.now().plusDays(15))
                    .build();
            repository.save(bill);
        }
    }
}
