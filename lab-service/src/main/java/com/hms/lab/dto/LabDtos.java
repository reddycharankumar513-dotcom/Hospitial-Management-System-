package com.hms.lab.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class LabDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderRequest {
        @NotNull(message = "Patient ID is required")
        private Long patientId;
        @NotNull(message = "Doctor ID is required")
        private Long doctorId;
        private Long appointmentId;
        @NotBlank(message = "Test name is required")
        private String testName;
        private String category;
        private String priority;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class OrderResponse {
        private Long id;
        private String orderNumber;
        private Long patientId;
        private Long doctorId;
        private Long appointmentId;
        private String testName;
        private String category;
        private String priority;
        private String status;
        private LocalDateTime createdAt;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ResultRequest {
        @NotNull(message = "Lab order ID is required")
        private Long labOrderId;
        @NotNull(message = "Patient ID is required")
        private Long patientId;
        private String testName;
        @NotBlank(message = "Result value is required")
        private String resultValue;
        private String unit;
        private String referenceRange;
        private String remarks;
        private Long technicianId;
        private String verifiedBy;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ResultResponse {
        private Long id;
        private Long labOrderId;
        private Long patientId;
        private String testName;
        private String resultValue;
        private String unit;
        private String referenceRange;
        private String remarks;
        private String verifiedBy;
        private LocalDateTime resultDate;
    }
}
