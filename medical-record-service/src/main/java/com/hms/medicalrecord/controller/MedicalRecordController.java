package com.hms.medicalrecord.controller;

import com.hms.medicalrecord.dto.MedicalRecordDtos.*;
import com.hms.medicalrecord.service.MedicalRecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/medical-records", "/api/v1/medical-records"})
@RequiredArgsConstructor
public class MedicalRecordController {

    private final MedicalRecordService service;

    @PostMapping
    public ResponseEntity<RecordResponse> createRecord(@Valid @RequestBody RecordRequest req) {
        return ResponseEntity.ok(service.createRecord(req));
    }

    @GetMapping("/{id}")
    public ResponseEntity<RecordResponse> getRecordById(@PathVariable Long id) {
        return ResponseEntity.ok(service.getRecordById(id));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<RecordResponse>> getRecordsByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(service.getRecordsByPatient(patientId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RecordResponse> updateRecord(@PathVariable Long id, @Valid @RequestBody RecordRequest req) {
        return ResponseEntity.ok(service.updateRecord(id, req));
    }
}
