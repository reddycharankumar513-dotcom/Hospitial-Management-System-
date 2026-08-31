package com.hms.billing.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class BillingDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class BillRequest {
        @NotNull(message = "Patient ID is required")
        private Long patientId;
        private Long appointmentId;
        @NotNull(message = "Total amount is required")
        @Min(0)
        private Double totalAmount;
        private Double discount;
        private Double taxAmount;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class BillResponse {
        private Long id;
        private String billNumber;
        private Long patientId;
        private Long appointmentId;
        private Double totalAmount;
        private Double discount;
        private Double taxAmount;
        private Double netAmount;
        private Double paidAmount;
        private String status;
        private LocalDate billDate;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PaymentRequest {
        @NotNull(message = "Bill ID is required")
        private Long billId;
        @NotBlank(message = "Payment method is required")
        private String paymentMethod;
        @NotNull(message = "Amount is required")
        @Min(1)
        private Double amount;
        private String transactionId;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PaymentResponse {
        private Long id;
        private Long billId;
        private String paymentNumber;
        private String paymentMethod;
        private Double amount;
        private String transactionId;
        private String status;
        private LocalDateTime paymentDate;
    }
}
