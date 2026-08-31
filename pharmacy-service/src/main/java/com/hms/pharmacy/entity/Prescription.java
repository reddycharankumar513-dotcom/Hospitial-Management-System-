package com.hms.pharmacy.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "prescriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Prescription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long patientId;

    @Column(nullable = false)
    private Long doctorId;

    private Long medicalRecordId;
    private String medicineName;
    private String dosage;
    private Integer quantityRequested;
    private String status; // PENDING, DISPENSED, CANCELLED

    private LocalDateTime createdAt;
}
