package com.hms.notification.service;

import com.hms.notification.entity.Notification;
import com.hms.notification.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class KafkaConsumerService {

    private final NotificationRepository repository;

    @KafkaListener(topics = {"appointment-events", "lab-events", "prescription-events", "pharmacy-events", "billing-events", "admission-events"}, groupId = "hms-notification-group")
    public void consumeEvent(String message) {
        System.out.println("Notification Consumer Received Kafka Event: " + message);
        saveNotification("KAFKA_EVENT", 1L, message, "IN_APP");
    }

    public Notification saveNotification(String eventType, Long userId, String msgText, String channel) {
        Notification notification = Notification.builder()
                .notificationId(UUID.randomUUID().toString())
                .userId(userId != null ? userId : 1L)
                .eventType(eventType)
                .message(msgText)
                .channel(channel)
                .status("SENT")
                .createdAt(LocalDateTime.now())
                .sentAt(LocalDateTime.now())
                .build();
        return repository.save(notification);
    }
}
