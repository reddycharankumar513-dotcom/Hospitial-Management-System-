package com.hms.patient.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

public class PatientDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PatientRequest {
        private Long userId;
        @NotBlank(message = "First name is required")
        private String firstName;
        @NotBlank(message = "Last name is required")
        private String lastName;
        private LocalDate dateOfBirth;
        private String gender;
        private String phone;
        private String email;
        private String address;
        private String emergencyContact;
        private String bloodGroup;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class PatientResponse {
        private Long id;
        private String patientNumber;
        private Long userId;
        private String firstName;
        private String lastName;
        private LocalDate dateOfBirth;
        private String gender;
        private String phone;
        private String email;
        private String address;
        private String emergencyContact;
        private String bloodGroup;
        private String status;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TriageRequest {
        private List<String> symptoms;
        private Integer heartRate;
        private Integer systolicBp;
        private Integer diastolicBp;
        private Integer spo2;
        private Double temperature;
        private Integer age;
        private Boolean severePain;
        private Boolean difficultyBreathing;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TriageResponse {
        private String triageLevel; // CRITICAL, HIGH, MEDIUM, LOW
        private String waitPriority;
        private String recommendedAction;
        private String notice;
    }
}
