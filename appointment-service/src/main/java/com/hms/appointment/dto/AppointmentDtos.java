package com.hms.appointment.dto;

import com.hms.appointment.entity.AppointmentStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class AppointmentDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AppointmentRequest {
        @NotNull(message = "Patient ID is required")
        private Long patientId;
        @NotNull(message = "Doctor ID is required")
        private Long doctorId;
        @NotNull(message = "Appointment date is required")
        private LocalDate appointmentDate;
        @NotBlank(message = "Start time is required")
        private String startTime;
        private String reason;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AppointmentResponse {
        private Long id;
        private String appointmentNumber;
        private Long patientId;
        private Long doctorId;
        private LocalDate appointmentDate;
        private String startTime;
        private String endTime;
        private AppointmentStatus status;
        private String reason;
        private String notes;
        private LocalDateTime createdAt;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class StatusUpdateRequest {
        @NotNull(message = "Status is required")
        private AppointmentStatus status;
        private String notes;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RecommendedSlotResponse {
        private Long doctorId;
        private String recommendedSlot;
        private Integer estimatedWaitMinutes;
        private String reason;
    }
}
