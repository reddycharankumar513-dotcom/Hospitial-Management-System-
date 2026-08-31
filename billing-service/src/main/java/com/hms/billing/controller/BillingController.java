package com.hms.billing.controller;

import com.hms.billing.dto.BillingDtos.*;
import com.hms.billing.service.BillingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/api/billing", "/api/v1/billing"})
@RequiredArgsConstructor
public class BillingController {

    private final BillingService billingService;

    @PostMapping("/bills")
    public ResponseEntity<BillResponse> createBill(@Valid @RequestBody BillRequest req) {
        return ResponseEntity.ok(billingService.createBill(req));
    }

    @GetMapping("/bills")
    public ResponseEntity<List<BillResponse>> getAllBills() {
        return ResponseEntity.ok(billingService.getAllBills());
    }

    @GetMapping("/bills/{id}")
    public ResponseEntity<BillResponse> getBillById(@PathVariable Long id) {
        return ResponseEntity.ok(billingService.getBillById(id));
    }

    @GetMapping("/patients/{patientId}/bills")
    public ResponseEntity<List<BillResponse>> getBillsByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(billingService.getBillsByPatient(patientId));
    }

    @PostMapping("/payments")
    public ResponseEntity<PaymentResponse> recordPayment(@Valid @RequestBody PaymentRequest req) {
        return ResponseEntity.ok(billingService.recordPayment(req));
    }

    @GetMapping("/payments/{id}")
    public ResponseEntity<PaymentResponse> getPaymentById(@PathVariable Long id) {
        return ResponseEntity.ok(billingService.getPaymentById(id));
    }

    @PutMapping("/bills/{id}/status")
    public ResponseEntity<BillResponse> updateBillStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(billingService.updateBillStatus(id, body.get("status")));
    }
}
