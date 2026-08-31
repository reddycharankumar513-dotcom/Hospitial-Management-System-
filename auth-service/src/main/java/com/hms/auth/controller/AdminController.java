package com.hms.auth.controller;

import com.hms.auth.dto.AdminDtos.*;
import com.hms.auth.entity.Role;
import com.hms.auth.service.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/api/v1/admin", "/api/admin"})
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/dashboard")
    public ResponseEntity<DashboardAnalyticsResponse> getDashboard() {
        return ResponseEntity.ok(adminService.getDashboardAnalytics());
    }

    @GetMapping("/users")
    public ResponseEntity<List<UserAdminDto>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }

    @PostMapping("/users")
    public ResponseEntity<UserAdminDto> createUser(@RequestBody CreateUserRequest req) {
        return ResponseEntity.ok(adminService.createUser(req));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<UserAdminDto> updateUser(@PathVariable Long id, @RequestBody UpdateUserRequest req) {
        return ResponseEntity.ok(adminService.updateUser(id, req));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
    }

    @PostMapping("/users/{id}/reset-password")
    public ResponseEntity<Map<String, String>> resetUserPassword(@PathVariable Long id, @RequestBody Map<String, String> body) {
        adminService.resetUserPassword(id, body.get("newPassword"));
        return ResponseEntity.ok(Map.of("message", "Password reset successfully"));
    }

    @GetMapping("/audit-logs")
    public ResponseEntity<List<AuditLogDto>> getAuditLogs() {
        return ResponseEntity.ok(adminService.getAuditLogs());
    }

    @GetMapping("/settings")
    public ResponseEntity<List<SystemSettingDto>> getSettings() {
        return ResponseEntity.ok(adminService.getSystemSettings());
    }

    @PutMapping("/settings/{key}")
    public ResponseEntity<SystemSettingDto> updateSetting(@PathVariable String key, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(adminService.updateSystemSetting(key, body.get("settingValue")));
    }

    @GetMapping("/roles/{role}/permissions")
    public ResponseEntity<List<RolePermissionDto>> getRolePermissions(@PathVariable Role role) {
        return ResponseEntity.ok(adminService.getRolePermissions(role));
    }
}
