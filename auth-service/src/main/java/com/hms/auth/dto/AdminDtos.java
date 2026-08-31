package com.hms.auth.dto;

import com.hms.auth.entity.Role;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

public class AdminDtos {

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ForgotPasswordRequest {
        private String email;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ResetPasswordRequest {
        private String token;
        private String newPassword;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DashboardAnalyticsResponse {
        private long totalPatients;
        private long activeDoctors;
        private long todayAppointments;
        private long emergencyCases;
        private long availableBeds;
        private long pendingLabTests;
        private long pendingBills;
        private long lowStockMedicines;
        private List<Map<String, Object>> patientRegistrationTrend;
        private Map<String, Long> appointmentStatusBreakdown;
        private Map<String, Long> bedOccupancyBreakdown;
        private List<Map<String, Object>> revenueTrend;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UserAdminDto {
        private Long id;
        private String email;
        private String firstName;
        private String lastName;
        private String phone;
        private Role role;
        private boolean active;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CreateUserRequest {
        private String email;
        private String password;
        private String firstName;
        private String lastName;
        private String phone;
        private Role role;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class UpdateUserRequest {
        private String firstName;
        private String lastName;
        private String phone;
        private Role role;
        private Boolean active;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AuditLogDto {
        private Long id;
        private LocalDateTime timestamp;
        private String username;
        private String role;
        private String action;
        private String resource;
        private String resourceId;
        private String ipAddress;
        private String result;
        private String correlationId;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SystemSettingDto {
        private Long id;
        private String settingKey;
        private String settingValue;
        private String category;
        private String description;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RolePermissionDto {
        private Long id;
        private Role role;
        private String resource;
        private boolean canView;
        private boolean canCreate;
        private boolean canUpdate;
        private boolean canDelete;
    }
}
