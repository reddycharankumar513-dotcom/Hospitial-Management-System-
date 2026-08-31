package com.hms.lab.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "lab_results")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LabResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long labOrderId;

    @Column(nullable = false)
    private Long patientId;

    private String testName;
    private String resultValue;
    private String unit;
    private String referenceRange;
    private String remarks;
    private Long technicianId;
    private String verifiedBy;

    private LocalDateTime resultDate;
}
