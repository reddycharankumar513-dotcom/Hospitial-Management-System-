package com.hms.lab.controller;

import com.hms.lab.dto.LabDtos.*;
import com.hms.lab.service.LabService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/api/lab", "/api/v1/lab"})
@RequiredArgsConstructor
public class LabController {

    private final LabService labService;

    @PostMapping("/orders")
    public ResponseEntity<OrderResponse> createOrder(@Valid @RequestBody OrderRequest req) {
        return ResponseEntity.ok(labService.createOrder(req));
    }

    @GetMapping("/orders")
    public ResponseEntity<List<OrderResponse>> getAllOrders() {
        return ResponseEntity.ok(labService.getAllOrders());
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<OrderResponse> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(labService.getOrderById(id));
    }

    @PutMapping("/orders/{id}/status")
    public ResponseEntity<OrderResponse> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(labService.updateOrderStatus(id, body.get("status")));
    }

    @PostMapping("/results")
    public ResponseEntity<ResultResponse> submitResult(@Valid @RequestBody ResultRequest req) {
        return ResponseEntity.ok(labService.submitResult(req));
    }

    @GetMapping("/results/{id}")
    public ResponseEntity<ResultResponse> getResultById(@PathVariable Long id) {
        return ResponseEntity.ok(labService.getResultById(id));
    }

    @GetMapping("/patients/{patientId}/lab-results")
    public ResponseEntity<List<ResultResponse>> getResultsByPatient(@PathVariable Long patientId) {
        return ResponseEntity.ok(labService.getResultsByPatient(patientId));
    }
}
