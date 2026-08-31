package com.hms.bed.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class BedDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class BedRequest {
        @NotBlank(message = "Bed number is required")
        private String bedNumber;
        @NotBlank(message = "Ward name is required")
        private String wardName;
        @NotBlank(message = "Ward type is required")
        private String wardType;
        private Double dailyRate;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class BedResponse {
        private Long id;
        private String bedNumber;
        private String wardName;
        private String wardType;
        private String status;
        private Double dailyRate;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AdmissionRequest {
        @NotNull(message = "Patient ID is required")
        private Long patientId;
        @NotNull(message = "Bed ID is required")
        private Long bedId;
        private Long admittingDoctorId;
        private String diagnosis;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AdmissionResponse {
        private Long id;
        private String admissionNumber;
        private Long patientId;
        private Long bedId;
        private Long admittingDoctorId;
        private String diagnosis;
        private String status;
        private LocalDateTime admissionDate;
        private LocalDateTime dischargeDate;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TransferRequest {
        @NotNull
        private Long newBedId;
        private String reason;
    }
}
