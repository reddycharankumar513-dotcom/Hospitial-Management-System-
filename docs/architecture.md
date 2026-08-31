# System Architecture Document

## Overview
The Hospital Management System is built using a modern Microservices Architecture based on Spring Cloud, Apache Kafka, Redis, PostgreSQL, and React.

## Topology Diagram
```text
                         ┌──────────────────────┐
                         │      React Frontend  │
                         └──────────┬───────────┘
                                    │
                         ┌──────────▼───────────┐
                         │     API Gateway       │
                         │  Spring Cloud Gateway │
                         └──────────┬───────────┘
                                    │
                         ┌──────────▼───────────┐
                         │   Eureka Discovery    │
                         └──────────┬───────────┘
                                    │
       ┌────────────────────────────┼─────────────────────────────┐
       │                            │                             │
       ▼                            ▼                             ▼
 Auth Service              Patient Service                Doctor Service
(Port 8081)                 (Port 8082)                    (Port 8083)
       │                            │                             │
       └────────────────────────────┼─────────────────────────────┘
                                    │
       ┌────────────────────────────┼─────────────────────────────┐
       │                            │                             │
       ▼                            ▼                             ▼
Appointment Service        Medical Record Service          Lab Service
(Port 8084)                 (Port 8085)                    (Port 8086)
       │                            │                             │
       └────────────────────────────┼─────────────────────────────┘
                                    │
       ┌────────────────────────────┼─────────────────────────────┐
       │                            │                             │
       ▼                            ▼                             ▼
 Pharmacy Service             Billing Service              Bed Service
(Port 8087)                 (Port 8088)                    (Port 8089)
                                    │
                                    ▼
                           Notification Service
                            (Port 8090)
```

## Microservice Components
1. **Eureka Server**: Service registration & discovery (`8761`)
2. **API Gateway**: Single entry point (`8080`), JWT authentication header routing, correlation ID injection
3. **Auth Service**: User identity & JWT token provider (`8081`)
4. **Patient Service**: Patient management & Emergency Triage (`8082`)
5. **Doctor Service**: Doctor schedules & Smart Recommendation (`8083`)
6. **Appointment Service**: Appointment engine, double-booking prevention, Redis cache (`8084`)
7. **Medical Record Service**: EHR records & clinical encounter notes (`8085`)
8. **Lab Service**: Test orders, processing & `LabResultAvailable` event (`8086`)
9. **Pharmacy Service**: Inventory, atomic dispensing & low-stock alerts (`8087`)
10. **Billing Service**: Invoicing & payment recording (`8088`)
11. **Bed Service**: Ward bed allocation & admission/discharge management (`8089`)
12. **Notification Service**: Kafka consumer for real-time notifications (`8090`)
