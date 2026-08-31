package com.hms.bed.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "beds")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Bed {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String bedNumber;

    @Column(nullable = false)
    private String wardName;

    @Column(nullable = false)
    private String wardType; // ICU, GENERAL, PRIVATE, EMERGENCY, PEDIATRIC

    @Column(nullable = false)
    private String status; // AVAILABLE, OCCUPIED, RESERVED, MAINTENANCE

    private Double dailyRate;

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
