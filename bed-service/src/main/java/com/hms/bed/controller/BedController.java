package com.hms.bed.controller;

import com.hms.bed.dto.BedDtos.*;
import com.hms.bed.service.BedService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping({"/api/beds", "/api/v1/beds"})
@RequiredArgsConstructor
public class BedController {

    private final BedService bedService;

    @GetMapping
    public ResponseEntity<List<BedResponse>> getAllBeds() {
        return ResponseEntity.ok(bedService.getAllBeds());
    }

    @GetMapping("/available")
    public ResponseEntity<List<BedResponse>> getAvailableBeds() {
        return ResponseEntity.ok(bedService.getAvailableBeds());
    }

    @PostMapping
    public ResponseEntity<BedResponse> createBed(@Valid @RequestBody BedRequest req) {
        return ResponseEntity.ok(bedService.createBed(req));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<BedResponse> updateBedStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(bedService.updateBedStatus(id, body.get("status")));
    }
}
