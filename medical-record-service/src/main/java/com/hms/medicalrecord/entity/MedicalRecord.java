package com.hms.medicalrecord.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "medical_records")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MedicalRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long patientId;

    @Column(nullable = false)
    private Long doctorId;

    private Long appointmentId;
    private LocalDate visitDate;

    @Column(length = 2000)
    private String symptoms;

    @Column(length = 2000)
    private String observations;

    @Column(length = 2000)
    private String diagnosisNotes;

    @Column(length = 2000)
    private String treatmentNotes;

    @Column(length = 2000)
    private String prescription;

    private LocalDate followUpDate;

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
