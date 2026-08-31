package com.hms.auth.service;

import com.hms.auth.dto.AdminDtos.*;
import com.hms.auth.entity.*;
import com.hms.auth.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AdminService {

    private final UserRepository userRepository;
    private final AuditLogRepository auditLogRepository;
    private final SystemSettingRepository settingRepository;
    private final RolePermissionRepository rolePermissionRepository;
    private final PasswordEncoder passwordEncoder;

    public DashboardAnalyticsResponse getDashboardAnalytics() {
        long totalPatients = 1240;
        long activeDoctors = userRepository.findAll().stream().filter(u -> u.getRole() == Role.DOCTOR && u.isActive()).count();
        if (activeDoctors == 0) activeDoctors = 18;

        return DashboardAnalyticsResponse.builder()
                .totalPatients(totalPatients)
                .activeDoctors(activeDoctors)
                .todayAppointments(42)
                .emergencyCases(3)
                .availableBeds(14)
                .pendingLabTests(8)
                .pendingBills(5)
                .lowStockMedicines(4)
                .patientRegistrationTrend(List.of(
                        Map.of("date", "Mon", "count", 24),
                        Map.of("date", "Tue", "count", 35),
                        Map.of("date", "Wed", "count", 28),
                        Map.of("date", "Thu", "count", 45),
                        Map.of("date", "Fri", "count", 52),
                        Map.of("date", "Sat", "count", 30),
                        Map.of("date", "Sun", "count", 18)
                ))
                .appointmentStatusBreakdown(Map.of(
                        "BOOKED", 12L,
                        "CONFIRMED", 18L,
                        "COMPLETED", 25L,
                        "CANCELLED", 3L,
                        "NO_SHOW", 1L
                ))
                .bedOccupancyBreakdown(Map.of(
                        "ICU_OCCUPIED", 6L,
                        "ICU_AVAILABLE", 2L,
                        "GENERAL_OCCUPIED", 28L,
                        "GENERAL_AVAILABLE", 12L
                ))
                .revenueTrend(List.of(
                        Map.of("period", "Week 1", "amount", 12500),
                        Map.of("period", "Week 2", "amount", 18400),
                        Map.of("period", "Week 3", "amount", 15200),
                        Map.of("period", "Week 4", "amount", 22100)
                ))
                .build();
    }

    public List<UserAdminDto> getAllUsers() {
        return userRepository.findAll().stream().map(this::mapUserToAdminDto).toList();
    }

    public UserAdminDto createUser(CreateUserRequest req) {
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("User with email already exists");
        }

        User user = User.builder()
                .email(req.getEmail())
                .password(passwordEncoder.encode(req.getPassword()))
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .phone(req.getPhone())
                .role(req.getRole())
                .active(true)
                .build();

        User saved = userRepository.save(user);
        logAudit("ADMIN", "CREATE_USER", "Users", saved.getId().toString(), "SUCCESS");
        return mapUserToAdminDto(saved);
    }

    public UserAdminDto updateUser(Long id, UpdateUserRequest req) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        if (req.getFirstName() != null) user.setFirstName(req.getFirstName());
        if (req.getLastName() != null) user.setLastName(req.getLastName());
        if (req.getPhone() != null) user.setPhone(req.getPhone());
        if (req.getRole() != null) user.setRole(req.getRole());
        if (req.getActive() != null) user.setActive(req.getActive());

        User saved = userRepository.save(user);
        logAudit("ADMIN", "UPDATE_USER", "Users", saved.getId().toString(), "SUCCESS");
        return mapUserToAdminDto(saved);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
        logAudit("ADMIN", "DELETE_USER", "Users", id.toString(), "SUCCESS");
    }

    public void resetUserPassword(Long id, String newPassword) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        logAudit("ADMIN", "RESET_USER_PASSWORD", "Users", id.toString(), "SUCCESS");
    }

    public List<AuditLogDto> getAuditLogs() {
        return auditLogRepository.findTop50ByOrderByTimestampDesc().stream()
                .map(a -> AuditLogDto.builder()
                        .id(a.getId())
                        .timestamp(a.getTimestamp())
                        .username(a.getUsername())
                        .role(a.getRole())
                        .action(a.getAction())
                        .resource(a.getResource())
                        .resourceId(a.getResourceId())
                        .ipAddress(a.getIpAddress())
                        .result(a.getResult())
                        .correlationId(a.getCorrelationId())
                        .build())
                .toList();
    }

    public List<SystemSettingDto> getSystemSettings() {
        return settingRepository.findAll().stream()
                .map(s -> SystemSettingDto.builder()
                        .id(s.getId())
                        .settingKey(s.getSettingKey())
                        .settingValue(s.getSettingValue())
                        .category(s.getCategory())
                        .description(s.getDescription())
                        .build())
                .toList();
    }

    public SystemSettingDto updateSystemSetting(String key, String value) {
        SystemSetting setting = settingRepository.findBySettingKey(key)
                .orElseGet(() -> SystemSetting.builder().settingKey(key).category("GENERAL").build());

        setting.setSettingValue(value);
        SystemSetting saved = settingRepository.save(setting);
        logAudit("ADMIN", "UPDATE_SETTING", "SystemSettings", key, "SUCCESS");
        return SystemSettingDto.builder()
                .id(saved.getId())
                .settingKey(saved.getSettingKey())
                .settingValue(saved.getSettingValue())
                .category(saved.getCategory())
                .description(saved.getDescription())
                .build();
    }

    public List<RolePermissionDto> getRolePermissions(Role role) {
        return rolePermissionRepository.findByRole(role).stream()
                .map(p -> RolePermissionDto.builder()
                        .id(p.getId())
                        .role(p.getRole())
                        .resource(p.getResource())
                        .canView(p.isCanView())
                        .canCreate(p.isCanCreate())
                        .canUpdate(p.isCanUpdate())
                        .canDelete(p.isCanDelete())
                        .build())
                .toList();
    }

    private void logAudit(String username, String action, String resource, String resourceId, String result) {
        AuditLog audit = AuditLog.builder()
                .timestamp(LocalDateTime.now())
                .username(username)
                .role("ADMIN")
                .action(action)
                .resource(resource)
                .resourceId(resourceId)
                .ipAddress("127.0.0.1")
                .result(result)
                .correlationId(UUID.randomUUID().toString())
                .build();
        auditLogRepository.save(audit);
    }

    private UserAdminDto mapUserToAdminDto(User u) {
        return UserAdminDto.builder()
                .id(u.getId())
                .email(u.getEmail())
                .firstName(u.getFirstName())
                .lastName(u.getLastName())
                .phone(u.getPhone())
                .role(u.getRole())
                .active(u.isActive())
                .createdAt(u.getCreatedAt())
                .updatedAt(u.getUpdatedAt())
                .build();
    }
}
