package com.hms.doctor.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

public class DoctorDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DoctorRequest {
        private Long userId;
        @NotBlank(message = "First name is required")
        private String firstName;
        @NotBlank(message = "Last name is required")
        private String lastName;
        @NotBlank(message = "Specialization is required")
        private String specialization;
        private String department;
        private String qualification;
        private Integer experience;
        private String phone;
        private String email;
        private Double consultationFee;
        private String status;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DoctorResponse {
        private Long id;
        private Long userId;
        private String doctorNumber;
        private String firstName;
        private String lastName;
        private String specialization;
        private String department;
        private String qualification;
        private Integer experience;
        private String phone;
        private String email;
        private Double consultationFee;
        private String status;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RecommendationRequest {
        private List<String> symptoms;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RecommendationResponse {
        private String recommendedDepartment;
        private String specialization;
        private List<DoctorResponse> recommendedDoctors;
        private List<String> availableSlots;
        private String notice;
    }
}
