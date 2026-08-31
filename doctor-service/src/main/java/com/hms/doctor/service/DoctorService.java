package com.hms.doctor.service;

import com.hms.doctor.dto.DoctorDtos.*;
import com.hms.doctor.entity.Doctor;
import com.hms.doctor.repository.DoctorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;

    public DoctorResponse createDoctor(DoctorRequest req) {
        String docNum = "DOC-" + System.currentTimeMillis() % 100000;
        Doctor doctor = Doctor.builder()
                .userId(req.getUserId())
                .doctorNumber(docNum)
                .firstName(req.getFirstName())
                .lastName(req.getLastName())
                .specialization(req.getSpecialization())
                .department(req.getDepartment())
                .qualification(req.getQualification())
                .experience(req.getExperience())
                .phone(req.getPhone())
                .email(req.getEmail())
                .consultationFee(req.getConsultationFee())
                .status(req.getStatus() != null ? req.getStatus() : "AVAILABLE")
                .build();

        return mapToResponse(doctorRepository.save(doctor));
    }

    public List<DoctorResponse> getAllDoctors() {
        return doctorRepository.findAll().stream().map(this::mapToResponse).toList();
    }

    public DoctorResponse getDoctorById(Long id) {
        Doctor doctor = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));
        return mapToResponse(doctor);
    }

    public List<DoctorResponse> getBySpecialization(String specialization) {
        return doctorRepository.findBySpecializationIgnoreCase(specialization)
                .stream().map(this::mapToResponse).toList();
    }

    public DoctorResponse updateDoctor(Long id, DoctorRequest req) {
        Doctor doc = doctorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Doctor not found with id: " + id));

        doc.setFirstName(req.getFirstName());
        doc.setLastName(req.getLastName());
        doc.setSpecialization(req.getSpecialization());
        doc.setDepartment(req.getDepartment());
        doc.setQualification(req.getQualification());
        doc.setExperience(req.getExperience());
        doc.setPhone(req.getPhone());
        doc.setEmail(req.getEmail());
        doc.setConsultationFee(req.getConsultationFee());
        if (req.getStatus() != null) doc.setStatus(req.getStatus());

        return mapToResponse(doctorRepository.save(doc));
    }

    public void deleteDoctor(Long id) {
        doctorRepository.deleteById(id);
    }

    public RecommendationResponse recommendDoctor(RecommendationRequest req) {
        String dept = "General Medicine";
        String spec = "General Physician";

        if (req.getSymptoms() != null) {
            String syms = String.join(" ", req.getSymptoms()).toLowerCase();
            if (syms.contains("chest") || syms.contains("heart") || syms.contains("palpitation")) {
                dept = "Cardiology";
                spec = "Cardiologist";
            } else if (syms.contains("skin") || syms.contains("rash") || syms.contains("itch")) {
                dept = "Dermatology";
                spec = "Dermatologist";
            } else if (syms.contains("bone") || syms.contains("joint") || syms.contains("fracture")) {
                dept = "Orthopedics";
                spec = "Orthopedic Surgeon";
            } else if (syms.contains("headache") || syms.contains("dizzy") || syms.contains("nerve")) {
                dept = "Neurology";
                spec = "Neurologist";
            }
        }

        List<Doctor> docs = doctorRepository.findBySpecializationIgnoreCase(spec);
        if (docs.isEmpty()) {
            docs = doctorRepository.findAll();
        }

        List<DoctorResponse> matchedDocs = docs.stream().map(this::mapToResponse).toList();
        List<String> defaultSlots = List.of("09:00 AM", "10:30 AM", "02:00 PM", "04:30 PM");

        return RecommendationResponse.builder()
                .recommendedDepartment(dept)
                .specialization(spec)
                .recommendedDoctors(matchedDocs)
                .availableSlots(defaultSlots)
                .notice("Academic Appointment Recommendation - Not a clinical diagnosis")
                .build();
    }

    public List<String> getAvailableSlots(Long id) {
        return List.of("09:00", "09:30", "10:00", "10:30", "11:00", "14:00", "14:30", "15:00", "15:30", "16:00");
    }

    private DoctorResponse mapToResponse(Doctor d) {
        return DoctorResponse.builder()
                .id(d.getId())
                .userId(d.getUserId())
                .doctorNumber(d.getDoctorNumber())
                .firstName(d.getFirstName())
                .lastName(d.getLastName())
                .specialization(d.getSpecialization())
                .department(d.getDepartment())
                .qualification(d.getQualification())
                .experience(d.getExperience())
                .phone(d.getPhone())
                .email(d.getEmail())
                .consultationFee(d.getConsultationFee())
                .status(d.getStatus())
                .build();
    }
}
