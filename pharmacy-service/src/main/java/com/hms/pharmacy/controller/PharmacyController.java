package com.hms.pharmacy.controller;

import com.hms.pharmacy.dto.PharmacyDtos.*;
import com.hms.pharmacy.entity.Prescription;
import com.hms.pharmacy.service.PharmacyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping({"/api/pharmacy", "/api/v1/pharmacy"})
@RequiredArgsConstructor
public class PharmacyController {

    private final PharmacyService pharmacyService;

    @PostMapping("/medicines")
    public ResponseEntity<MedicineResponse> addMedicine(@Valid @RequestBody MedicineRequest req) {
        return ResponseEntity.ok(pharmacyService.addMedicine(req));
    }

    @GetMapping("/medicines")
    public ResponseEntity<List<MedicineResponse>> getAllMedicines() {
        return ResponseEntity.ok(pharmacyService.getAllMedicines());
    }

    @GetMapping("/medicines/{id}")
    public ResponseEntity<MedicineResponse> getMedicineById(@PathVariable Long id) {
        return ResponseEntity.ok(pharmacyService.getMedicineById(id));
    }

    @PutMapping("/medicines/{id}")
    public ResponseEntity<MedicineResponse> updateMedicine(@PathVariable Long id, @Valid @RequestBody MedicineRequest req) {
        return ResponseEntity.ok(pharmacyService.updateMedicine(id, req));
    }

    @PostMapping("/prescriptions")
    public ResponseEntity<Prescription> createPrescription(@Valid @RequestBody PrescriptionRequest req) {
        return ResponseEntity.ok(pharmacyService.createPrescription(req));
    }

    @PostMapping("/dispense")
    public ResponseEntity<DispenseResponse> dispenseMedicine(@Valid @RequestBody DispenseRequest req) {
        return ResponseEntity.ok(pharmacyService.dispenseMedicine(req));
    }

    @GetMapping("/inventory")
    public ResponseEntity<List<MedicineResponse>> getInventory() {
        return ResponseEntity.ok(pharmacyService.getAllMedicines());
    }
}
