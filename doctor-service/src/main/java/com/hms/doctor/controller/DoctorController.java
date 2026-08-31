package com.hms.doctor.controller;

import com.hms.doctor.dto.DoctorDtos.*;
import com.hms.doctor.service.DoctorService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/api/doctors", "/api/v1/doctors"})
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;

    @PostMapping
    public ResponseEntity<DoctorResponse> createDoctor(@Valid @RequestBody DoctorRequest req) {
        return ResponseEntity.ok(doctorService.createDoctor(req));
    }

    @GetMapping
    public ResponseEntity<List<DoctorResponse>> getAllDoctors() {
        return ResponseEntity.ok(doctorService.getAllDoctors());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DoctorResponse> getDoctorById(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getDoctorById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DoctorResponse> updateDoctor(@PathVariable Long id, @Valid @RequestBody DoctorRequest req) {
        return ResponseEntity.ok(doctorService.updateDoctor(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteDoctor(@PathVariable Long id) {
        doctorService.deleteDoctor(id);
        return ResponseEntity.ok(Map.of("message", "Doctor deleted successfully"));
    }

    @GetMapping("/specialization/{specialization}")
    public ResponseEntity<List<DoctorResponse>> getBySpecialization(@PathVariable String specialization) {
        return ResponseEntity.ok(doctorService.getBySpecialization(specialization));
    }

    @PostMapping("/recommend")
    public ResponseEntity<RecommendationResponse> recommendDoctor(@RequestBody RecommendationRequest req) {
        return ResponseEntity.ok(doctorService.recommendDoctor(req));
    }

    @GetMapping("/{id}/schedule")
    public ResponseEntity<Map<String, Object>> getSchedule(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("doctorId", id, "workingDays", List.of("MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY")));
    }

    @GetMapping("/{id}/available-slots")
    public ResponseEntity<List<String>> getAvailableSlots(@PathVariable Long id) {
        return ResponseEntity.ok(doctorService.getAvailableSlots(id));
    }
}
