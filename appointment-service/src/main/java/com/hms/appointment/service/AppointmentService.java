package com.hms.appointment.service;

import com.hms.appointment.dto.AppointmentDtos.*;
import com.hms.appointment.entity.Appointment;
import com.hms.appointment.entity.AppointmentStatus;
import com.hms.appointment.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final KafkaProducerService kafkaProducer;

    @Transactional
    public AppointmentResponse createAppointment(AppointmentRequest req) {
        if (req.getAppointmentDate().isBefore(LocalDate.now())) {
            throw new RuntimeException("Cannot book appointment in the past");
        }

        boolean exists = appointmentRepository.existsByDoctorIdAndAppointmentDateAndStartTimeAndStatusNot(
                req.getDoctorId(), req.getAppointmentDate(), req.getStartTime(), AppointmentStatus.CANCELLED
        );
        if (exists) {
            throw new RuntimeException("Selected doctor slot is already booked");
        }

        String apptNum = "APT-" + System.currentTimeMillis() % 100000;
        Appointment appointment = Appointment.builder()
                .appointmentNumber(apptNum)
                .patientId(req.getPatientId())
                .doctorId(req.getDoctorId())
                .appointmentDate(req.getAppointmentDate())
                .startTime(req.getStartTime())
                .endTime("30 mins")
                .status(AppointmentStatus.BOOKED)
                .reason(req.getReason())
                .build();

        Appointment saved = appointmentRepository.save(appointment);

        String payload = String.format("{\"appointmentId\":%d, \"patientId\":%d, \"doctorId\":%d}",
                saved.getId(), saved.getPatientId(), saved.getDoctorId());
        kafkaProducer.sendEvent("appointment-events", "AppointmentBooked", payload);

        return mapToResponse(saved);
    }

    public List<AppointmentResponse> getAllAppointments() {
        return appointmentRepository.findAll().stream().map(this::mapToResponse).toList();
    }

    public AppointmentResponse getAppointmentById(Long id) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));
        return mapToResponse(appointment);
    }

    public List<AppointmentResponse> getAppointmentsByPatient(Long patientId) {
        return appointmentRepository.findByPatientId(patientId).stream().map(this::mapToResponse).toList();
    }

    public List<AppointmentResponse> getAppointmentsByDoctor(Long doctorId) {
        return appointmentRepository.findByDoctorId(doctorId).stream().map(this::mapToResponse).toList();
    }

    @Transactional
    public AppointmentResponse updateStatus(Long id, StatusUpdateRequest req) {
        Appointment appt = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appointment not found with id: " + id));

        appt.setStatus(req.getStatus());
        if (req.getNotes() != null) appt.setNotes(req.getNotes());

        Appointment saved = appointmentRepository.save(appt);

        if (req.getStatus() == AppointmentStatus.CANCELLED) {
            String payload = String.format("{\"appointmentId\":%d, \"patientId\":%d}", saved.getId(), saved.getPatientId());
            kafkaProducer.sendEvent("appointment-events", "AppointmentCancelled", payload);
        }

        return mapToResponse(saved);
    }

    public void deleteAppointment(Long id) {
        appointmentRepository.deleteById(id);
    }

    public RecommendedSlotResponse getRecommendedSlot(Long doctorId, LocalDate date) {
        List<Appointment> existing = appointmentRepository.findByDoctorIdAndAppointmentDate(doctorId, date != null ? date : LocalDate.now());
        int queueCount = (int) existing.stream().filter(a -> a.getStatus() != AppointmentStatus.CANCELLED).count();
        int waitTime = queueCount * 15;

        String slot = (9 + (queueCount * 30) / 60) + ":" + String.format("%02d", (queueCount * 30) % 60);

        return RecommendedSlotResponse.builder()
                .doctorId(doctorId)
                .recommendedSlot(slot)
                .estimatedWaitMinutes(waitTime)
                .reason("Lowest expected waiting time based on current doctor queue")
                .build();
    }

    private AppointmentResponse mapToResponse(Appointment a) {
        return AppointmentResponse.builder()
                .id(a.getId())
                .appointmentNumber(a.getAppointmentNumber())
                .patientId(a.getPatientId())
                .doctorId(a.getDoctorId())
                .appointmentDate(a.getAppointmentDate())
                .startTime(a.getStartTime())
                .endTime(a.getEndTime())
                .status(a.getStatus())
                .reason(a.getReason())
                .notes(a.getNotes())
                .createdAt(a.getCreatedAt())
                .build();
    }
}
