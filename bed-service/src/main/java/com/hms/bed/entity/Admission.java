package com.hms.bed.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "admissions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Admission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String admissionNumber;

    @Column(nullable = false)
    private Long patientId;

    @Column(nullable = false)
    private Long bedId;

    private Long admittingDoctorId;
    private String diagnosis;

    @Column(nullable = false)
    private String status; // ADMITTED, TRANSFERRED, DISCHARGED

    private LocalDateTime admissionDate;
    private LocalDateTime dischargeDate;
}
