package com.hms.lab.service;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {

    private final KafkaTemplate<String, String> kafkaTemplate;

    public void sendLabResultEvent(Long labOrderId, Long patientId, String testName, String resultValue) {
        String eventEnvelope = String.format(
                "{\"eventId\":\"%s\", \"eventType\":\"LabResultAvailable\", \"timestamp\":\"%s\", \"source\":\"lab-service\", \"payload\":{\"labOrderId\":%d, \"patientId\":%d, \"testName\":\"%s\", \"resultValue\":\"%s\"}}",
                java.util.UUID.randomUUID(), LocalDateTime.now(), labOrderId, patientId, testName, resultValue
        );
        try {
            kafkaTemplate.send("lab-events", eventEnvelope);
        } catch (Exception e) {
            System.err.println("Kafka send fallback: " + e.getMessage());
        }
    }
}
