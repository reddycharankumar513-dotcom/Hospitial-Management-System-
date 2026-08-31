package com.hms.billing.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bills")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String billNumber;

    @Column(nullable = false)
    private Long patientId;

    private Long appointmentId;

    @Column(nullable = false)
    private Double totalAmount;

    private Double discount;
    private Double taxAmount;

    @Column(nullable = false)
    private Double netAmount;

    @Builder.Default
    private Double paidAmount = 0.0;

    @Column(nullable = false)
    private String status; // GENERATED, PARTIALLY_PAID, PAID, CANCELLED

    private LocalDate billDate;
    private LocalDate dueDate;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
