package com.hms.medicalrecord.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

public class MedicalRecordDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RecordRequest {
        @NotNull(message = "Patient ID is required")
        private Long patientId;
        @NotNull(message = "Doctor ID is required")
        private Long doctorId;
        private Long appointmentId;
        private LocalDate visitDate;
        private String symptoms;
        private String observations;
        private String diagnosisNotes;
        private String treatmentNotes;
        private String prescription;
        private LocalDate followUpDate;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RecordResponse {
        private Long id;
        private Long patientId;
        private Long doctorId;
        private Long appointmentId;
        private LocalDate visitDate;
        private String symptoms;
        private String observations;
        private String diagnosisNotes;
        private String treatmentNotes;
        private String prescription;
        private LocalDate followUpDate;
    }
}
