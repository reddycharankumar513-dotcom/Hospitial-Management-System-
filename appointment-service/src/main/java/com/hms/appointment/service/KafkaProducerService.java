package com.hms.appointment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public void sendEvent(String topic, String eventType, String payloadJson) {
        String eventEnvelope = String.format(
                "{\"eventId\":\"%s\", \"eventType\":\"%s\", \"timestamp\":\"%s\", \"source\":\"appointment-service\", \"payload\":%s}",
                java.util.UUID.randomUUID(), eventType, LocalDateTime.now(), payloadJson
        );
        try {
            kafkaTemplate.send(topic, eventEnvelope);
        } catch (Exception e) {
            System.err.println("Kafka send fallback: " + e.getMessage());
        }
    }
}
