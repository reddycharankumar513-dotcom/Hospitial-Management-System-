package com.hms.pharmacy.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

public class PharmacyDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MedicineRequest {
        @NotBlank(message = "Name is required")
        private String name;
        private String genericName;
        private String category;
        private String manufacturer;
        private String batchNumber;
        private LocalDate expiryDate;
        @NotNull(message = "Quantity is required")
        @Min(0)
        private Integer quantity;
        private Integer reorderLevel;
        private Double price;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MedicineResponse {
        private Long id;
        private String medicineCode;
        private String name;
        private String genericName;
        private String category;
        private String manufacturer;
        private String batchNumber;
        private LocalDate expiryDate;
        private Integer quantity;
        private Integer reorderLevel;
        private Double price;
        private String status;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PrescriptionRequest {
        @NotNull
        private Long patientId;
        @NotNull
        private Long doctorId;
        private Long medicalRecordId;
        @NotBlank
        private String medicineName;
        private String dosage;
        @NotNull
        private Integer quantityRequested;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DispenseRequest {
        @NotNull
        private Long prescriptionId;
        @NotNull
        private Long medicineId;
        @NotNull
        @Min(1)
        private Integer quantity;
        private Long pharmacistId;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DispenseResponse {
        private Long prescriptionId;
        private String medicineName;
        private Integer quantityDispensed;
        private Double totalAmount;
        private String status;
    }
}
