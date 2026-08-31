package com.hms.patient.service;

import com.hms.patient.dto.PatientDtos.*;
import com.hms.patient.entity.Patient;
import com.hms.patient.repository.PatientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PatientService {

    private final PatientRepository patientRepository;

    public PatientResponse createPatient(PatientRequest req) {
        String patientNum = "PAT-" + System.currentTimeMillis() % 100000;
        Patient patient = Patient.builder()
                .patientNumber(patientNum)
                .userId(req.getUserId())
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .dateOfBirth(req.getDateOfBirth())
                .gender(req.getGender())
                .phone(req.getPhone())
                .email(req.getEmail())
                .address(req.getAddress())
                .emergencyContact(req.getEmergencyContact())
                .bloodGroup(req.getBloodGroup())
                .status("ACTIVE")
                .build();

        Patient saved = patientRepository.save(patient);
        return mapToResponse(saved);
    }

    public List<PatientResponse> getAllPatients() {
        return patientRepository.findAll().stream().map(this::mapToResponse).toList();
    }

    public PatientResponse getPatientById(Long id) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));
        return mapToResponse(patient);
    }

    public PatientResponse updatePatient(Long id, PatientRequest req) {
        Patient patient = patientRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Patient not found with id: " + id));

        patient.setFirstName(req.getFirstName());
        patient.setLastName(req.getLastName());
        patient.setDateOfBirth(req.getDateOfBirth());
        patient.setGender(req.getGender());
        patient.setPhone(req.getPhone());
        patient.setEmail(req.getEmail());
        patient.setAddress(req.getAddress());
        patient.setEmergencyContact(req.getEmergencyContact());
        patient.setBloodGroup(req.getBloodGroup());

        return mapToResponse(patientRepository.save(patient));
    }

    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }

    public TriageResponse evaluateTriage(TriageRequest req) {
        String level = "LOW";
        String priority = "Routine Queue";
        String action = "Standard Outpatient Consultation";

        boolean criticalVitals = (req.getSpo2() != null && req.getSpo2() < 90) ||
                                 (req.getHeartRate() != null && req.getHeartRate() > 130) ||
                                 Boolean.TRUE.equals(req.getDifficultyBreathing());

        boolean highVitals = (req.getSpo2() != null && req.getSpo2() < 94) ||
                             (req.getHeartRate() != null && req.getHeartRate() > 110) ||
                             (req.getSystolicBp() != null && req.getSystolicBp() > 160) ||
                             Boolean.TRUE.equals(req.getSeverePain());

        if (criticalVitals) {
            level = "CRITICAL";
            priority = "Immediate Priority";
            action = "Direct Emergency Room Transfer & Resuscitation";
        } else if (highVitals) {
            level = "HIGH";
            priority = "Urgent Priority Queue";
            action = "Urgent Doctor Assessment within 15 mins";
        } else if (req.getSymptoms() != null && !req.getSymptoms().isEmpty()) {
            level = "MEDIUM";
            priority = "Normal Priority Queue";
            action = "Standard Consultation within 30-45 mins";
        }

        return TriageResponse.builder()
                .triageLevel(level)
                .waitPriority(priority)
                .recommendedAction(action)
                .notice("Academic workflow simulation, not clinically validated triage.")
                .build();
    }

    private PatientResponse mapToResponse(Patient p) {
        return PatientResponse.builder()
                .id(p.getId())
                .patientNumber(p.getPatientNumber())
                .userId(p.getUserId())
                .firstName(p.getFirstName())
                .lastName(p.getLastName())
                .dateOfBirth(p.getDateOfBirth())
                .gender(p.getGender())
                .phone(p.getPhone())
                .email(p.getEmail())
                .address(p.getAddress())
                .emergencyContact(p.getEmergencyContact())
                .bloodGroup(p.getBloodGroup())
                .status(p.getStatus())
                .build();
    }
}
