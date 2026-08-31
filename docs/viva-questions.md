# Academic Viva & Examination Guide

## Frequently Asked Questions & Concept Explanations

### Q1: Why use a Microservices Architecture instead of a Monolith?
**Answer**: Microservices offer independent deployability, fault isolation (if Lab Service crashes, Auth & Patient Services continue working), technological flexibility, and distinct database ownership for granular scalability.

### Q2: What is the role of Eureka Server?
**Answer**: Eureka acts as a Dynamic Service Registry. Microservices register their hostname and IP dynamically upon boot so the API Gateway can load balance requests without hardcoding service URLs (`lb://doctor-service`).

### Q3: Why use Apache Kafka instead of direct HTTP calls between services?
**Answer**: Kafka provides asynchronous, event-driven decoupling. When a lab result is ready, the Lab Service publishes a `LabResultAvailable` event to Kafka without waiting for the Notification or Billing services to respond synchronously.

### Q4: How is data consistency maintained with Database-per-Service?
**Answer**: Eventual consistency is maintained via Apache Kafka event streaming. For instance, when a patient is admitted, Bed Service publishes `PatientAdmitted` to trigger billing or notification updates asynchronously.

### Q5: How is caching implemented with Redis?
**Answer**: Redis caches frequently requested doctor availability slots (`appointment:slots:{doctorId}:{date}`) with a Cache-Aside strategy and TTL eviction to reduce database read pressure.
