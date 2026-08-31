package com.hms.bed.controller;

import com.hms.bed.dto.BedDtos.*;
import com.hms.bed.service.BedService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/admissions", "/api/v1/admissions"})
@RequiredArgsConstructor
public class AdmissionController {

    private final BedService bedService;

    @PostMapping
    public ResponseEntity<AdmissionResponse> admitPatient(@Valid @RequestBody AdmissionRequest req) {
        return ResponseEntity.ok(bedService.admitPatient(req));
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdmissionResponse> getAdmissionById(@PathVariable Long id) {
        return ResponseEntity.ok(bedService.getAdmissionById(id));
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<List<AdmissionResponse>> getAdmissionsByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(bedService.getAdmissionsByPatient(patientId));
    }

    @PostMapping("/{id}/transfer")
    public ResponseEntity<AdmissionResponse> transferPatient(@PathVariable Long id, @Valid @RequestBody TransferRequest req) {
        return ResponseEntity.ok(bedService.transferPatient(id, req));
    }

    @PostMapping("/{id}/discharge")
    public ResponseEntity<AdmissionResponse> dischargePatient(@PathVariable Long id) {
        return ResponseEntity.ok(bedService.dischargePatient(id));
    }
}
