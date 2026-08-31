package com.hms.appointment.config;

import com.hms.appointment.entity.Appointment;
import com.hms.appointment.entity.AppointmentStatus;
import com.hms.appointment.repository.AppointmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final AppointmentRepository appointmentRepository;

    @Override
    public void run(String... args) {
        if (appointmentRepository.count() == 0) {
            createAppt(1L, 1L, LocalDate.now(), "09:00", "Regular Cardiology Consultation", AppointmentStatus.CONFIRMED);
            createAppt(2L, 2L, LocalDate.now(), "10:30", "Fever and cold checkup", AppointmentStatus.BOOKED);
        }
    }

    private void createAppt(Long patientId, Long doctorId, LocalDate date, String time, String reason, AppointmentStatus status) {
        Appointment appointment = Appointment.builder()
                .appointmentNumber("APT-" + System.currentTimeMillis() % 100000)
                .patientId(patientId)
                .doctorId(doctorId)
                .appointmentDate(date)
                .startTime(time)
                .endTime("30 mins")
                .reason(reason)
                .status(status)
                .build();
        appointmentRepository.save(appointment);
    }
}
