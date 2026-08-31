package com.hms.billing.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long billId;

    @Column(unique = true, nullable = false)
    private String paymentNumber;

    @Column(nullable = false)
    private String paymentMethod; // CASH, CARD, UPI, BANK_TRANSFER

    @Column(nullable = false)
    private Double amount;

    private String transactionId;
    private String status;

    private LocalDateTime paymentDate;
}
