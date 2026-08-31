package com.hms.notification.config;

import com.hms.notification.entity.Notification;
import com.hms.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final NotificationRepository repository;

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            Notification n1 = Notification.builder()
                    .notificationId(UUID.randomUUID().toString())
                    .userId(1L)
                    .eventType("AppointmentBooked")
                    .message("Your appointment with Dr. John Doe (Cardiology) is confirmed for today at 09:00 AM.")
                    .channel("IN_APP")
                    .status("SENT")
                    .createdAt(LocalDateTime.now().minusHours(2))
                    .sentAt(LocalDateTime.now().minusHours(2))
                    .build();
            repository.save(n1);
        }
    }
}
