package com.hms.auth.service;

import com.hms.auth.dto.AdminDtos.*;
import com.hms.auth.entity.Role;
import com.hms.auth.entity.User;
import com.hms.auth.repository.AuditLogRepository;
import com.hms.auth.repository.RolePermissionRepository;
import com.hms.auth.repository.SystemSettingRepository;
import com.hms.auth.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AdminServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private AuditLogRepository auditLogRepository;

    @Mock
    private SystemSettingRepository settingRepository;

    @Mock
    private RolePermissionRepository rolePermissionRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private AdminService adminService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetDashboardAnalytics() {
        when(userRepository.findAll()).thenReturn(List.of());

        DashboardAnalyticsResponse resp = adminService.getDashboardAnalytics();

        assertNotNull(resp);
        assertEquals(1240, resp.getTotalPatients());
        assertEquals(42, resp.getTodayAppointments());
        assertEquals(14, resp.getAvailableBeds());
    }

    @Test
    void testCreateUserAccountSuccess() {
        CreateUserRequest req = CreateUserRequest.builder()
                .email("newstaff@hms.com")
                .password("password123")
                .firstName("New")
                .lastName("Staff")
                .role(Role.DOCTOR)
                .build();

        when(userRepository.existsByEmail("newstaff@hms.com")).thenReturn(false);
        when(passwordEncoder.encode("password123")).thenReturn("encodedPassword");
        
        User mockSaved = User.builder()
                .id(10L)
                .email("newstaff@hms.com")
                .firstName("New")
                .lastName("Staff")
                .role(Role.DOCTOR)
                .active(true)
                .build();
        when(userRepository.save(any(User.class))).thenReturn(mockSaved);

        UserAdminDto result = adminService.createUser(req);

        assertNotNull(result);
        assertEquals("newstaff@hms.com", result.getEmail());
        assertEquals(Role.DOCTOR, result.getRole());
        verify(userRepository, times(1)).save(any(User.class));
    }
}
