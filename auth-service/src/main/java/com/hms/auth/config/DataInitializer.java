package com.hms.auth.config;

import com.hms.auth.entity.*;
import com.hms.auth.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final RolePermissionRepository permissionRepository;
    private final SystemSettingRepository settingRepository;
    private final AuditLogRepository auditLogRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            createUser("admin@hms.com", "admin123", "System", "Admin", "1234567890", Role.ADMIN);
            createUser("admin@hospital.local", "Admin@12345", "Super", "Admin", "1234567800", Role.ADMIN);
            createUser("doctor@hms.com", "doctor123", "John", "Doe", "1234567891", Role.DOCTOR);
            createUser("doctor@hospital.local", "Doctor@12345", "John", "Doe", "1234567801", Role.DOCTOR);
            createUser("doctor2@hms.com", "doctor123", "Sarah", "Connor", "1234567892", Role.DOCTOR);
            createUser("nurse@hms.com", "nurse123", "Mary", "Jane", "1234567893", Role.NURSE);
            createUser("nurse@hospital.local", "Nurse@12345", "Mary", "Jane", "1234567802", Role.NURSE);
            createUser("lab@hms.com", "lab123", "Alex", "Mercer", "1234567894", Role.LAB_TECHNICIAN);
            createUser("lab@hospital.local", "Lab@12345", "Alex", "Mercer", "1234567803", Role.LAB_TECHNICIAN);
            createUser("pharmacy@hms.com", "pharm123", "Bruce", "Wayne", "1234567895", Role.PHARMACIST);
            createUser("pharmacy@hospital.local", "Pharmacy@12345", "Bruce", "Wayne", "1234567804", Role.PHARMACIST);
            createUser("billing@hms.com", "bill123", "Clark", "Kent", "1234567896", Role.BILLING_STAFF);
            createUser("billing@hospital.local", "Billing@12345", "Clark", "Kent", "1234567805", Role.BILLING_STAFF);
            createUser("patient@hms.com", "patient123", "Peter", "Parker", "1234567897", Role.PATIENT);
            createUser("patient@hospital.local", "Patient@12345", "Peter", "Parker", "1234567806", Role.PATIENT);
        }

        if (permissionRepository.count() == 0) {
            seedPermissions();
        }

        if (settingRepository.count() == 0) {
            seedSettings();
        }

        if (auditLogRepository.count() == 0) {
            seedAuditLogs();
        }
    }

    private void createUser(String email, String password, String firstName, String lastName, String phone, Role role) {
        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .firstName(firstName)
                .lastName(lastName)
                .phone(phone)
                .role(role)
                .active(true)
                .build();
        userRepository.save(user);
    }

    private void seedPermissions() {
        String[] resources = {"PATIENTS", "DOCTORS", "APPOINTMENTS", "RECORDS", "LAB", "PHARMACY", "BILLING", "BEDS", "USERS", "REPORTS"};
        for (Role role : Role.values()) {
            for (String res : resources) {
                boolean isAdmin = (role == Role.ADMIN);
                RolePermission perm = RolePermission.builder()
                        .role(role)
                        .resource(res)
                        .canView(true)
                        .canCreate(isAdmin || role == Role.DOCTOR || role == Role.PATIENT)
                        .canUpdate(isAdmin || role == Role.DOCTOR)
                        .canDelete(isAdmin)
                        .build();
                permissionRepository.save(perm);
            }
        }
    }

    private void seedSettings() {
        createSetting("HOSPITAL_NAME", "St. Jude Medical Center & Research Hospital", "GENERAL", "Official name of hospital");
        createSetting("HOSPITAL_ADDRESS", "742 Evergreen Terrace, Medical District, NY 10001", "GENERAL", "Hospital physical address");
        createSetting("HOSPITAL_PHONE", "+1 (800) 555-4000", "GENERAL", "Main emergency hotline");
        createSetting("APPOINTMENT_DURATION", "30", "SCHEDULING", "Slot duration in minutes");
        createSetting("LOW_STOCK_THRESHOLD", "10", "PHARMACY", "Threshold for medicine stock alerts");
        createSetting("CURRENCY_SYMBOL", "$", "BILLING", "Default billing currency");
    }

    private void seedAuditLogs() {
        logAudit("admin@hms.com", "ADMIN", "AUTHENTICATION", "LOGIN", "127.0.0.1", "SUCCESS");
        logAudit("doctor@hms.com", "DOCTOR", "MEDICAL_RECORDS", "CREATE_RECORD", "127.0.0.1", "SUCCESS");
        logAudit("pharmacy@hms.com", "PHARMACIST", "PHARMACY", "DISPENSE_MEDICINE", "127.0.0.1", "SUCCESS");
    }

    private void createSetting(String key, String value, String cat, String desc) {
        SystemSetting s = SystemSetting.builder()
                .settingKey(key)
                .settingValue(value)
                .category(cat)
                .description(desc)
                .build();
        settingRepository.save(s);
    }

    private void logAudit(String user, String role, String resource, String action, String ip, String result) {
        AuditLog audit = AuditLog.builder()
                .timestamp(LocalDateTime.now().minusHours(1))
                .username(user)
                .role(role)
                .action(action)
                .resource(resource)
                .resourceId("1")
                .ipAddress(ip)
                .result(result)
                .correlationId(UUID.randomUUID().toString())
                .build();
        auditLogRepository.save(audit);
    }
}
