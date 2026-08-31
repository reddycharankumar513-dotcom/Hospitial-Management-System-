package com.hms.pharmacy.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "medicines")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Medicine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String medicineCode;

    @Column(nullable = false)
    private String name;

    private String genericName;
    private String category;
    private String manufacturer;
    private String batchNumber;
    private LocalDate expiryDate;

    @Column(nullable = false)
    private Integer quantity;

    private Integer reorderLevel;
    private Double price;

    @Builder.Default
    private String status = "IN_STOCK";

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
