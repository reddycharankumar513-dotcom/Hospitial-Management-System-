package com.hms.patient.controller;

import com.hms.patient.dto.PatientDtos.*;
import com.hms.patient.service.PatientService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/api/patients", "/api/v1/patients"})
@RequiredArgsConstructor
public class PatientController {

    private final PatientService patientService;

    @PostMapping
    public ResponseEntity<PatientResponse> createPatient(@Valid @RequestBody PatientRequest req) {
        return ResponseEntity.ok(patientService.createPatient(req));
    }

    @GetMapping
    public ResponseEntity<List<PatientResponse>> getAllPatients() {
        return ResponseEntity.ok(patientService.getAllPatients());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientResponse> getPatientById(@PathVariable Long id) {
        return ResponseEntity.ok(patientService.getPatientById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PatientResponse> updatePatient(@PathVariable Long id, @Valid @RequestBody PatientRequest req) {
        return ResponseEntity.ok(patientService.updatePatient(id, req));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deletePatient(@PathVariable Long id) {
        patientService.deletePatient(id);
        return ResponseEntity.ok(Map.of("message", "Patient deleted successfully"));
    }

    @PostMapping("/triage")
    public ResponseEntity<TriageResponse> triage(@RequestBody TriageRequest req) {
        return ResponseEntity.ok(patientService.evaluateTriage(req));
    }

    @GetMapping("/{id}/medical-history")
    public ResponseEntity<Map<String, Object>> getMedicalHistory(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("patientId", id, "history", List.of("Hypertension diagnosed 2024", "Penicillin allergy")));
    }

    @GetMapping("/{id}/appointments")
    public ResponseEntity<Map<String, Object>> getAppointments(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("patientId", id, "appointments", List.of()));
    }

    @GetMapping("/{id}/lab-results")
    public ResponseEntity<Map<String, Object>> getLabResults(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("patientId", id, "labResults", List.of()));
    }

    @GetMapping("/{id}/bills")
    public ResponseEntity<Map<String, Object>> getBills(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("patientId", id, "bills", List.of()));
    }
}
