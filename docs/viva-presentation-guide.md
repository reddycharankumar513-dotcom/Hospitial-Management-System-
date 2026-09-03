# Student Viva & Project Presentation Guide
## Hospital Management System — Microservices-Based Intelligent Healthcare Platform

---

### 1. Project Overview & Architecture Summary

This project is an **Enterprise Hospital Management System** built using a **Microservices Architecture**. It digitizes and automates the complete patient clinical journey across 7 hospital roles: **Patient**, **Doctor**, **Nurse**, **Lab Technician**, **Pharmacist**, **Billing Staff**, and **Administrator**.

#### Key Tech Stack Component Breakdown:
1. **Backend Microservices**: Spring Boot 3.2.x, Spring Cloud Gateway, Spring Cloud Eureka Discovery Server.
2. **Databases**: PostgreSQL (Database-per-service for relational transactions) + MongoDB (Document storage for clinical medical records).
3. **Event Streaming**: Apache Kafka (`Zookeeper` + `Kafka Broker`) for asynchronous event publishing (`AppointmentBooked`, `LabResultAvailable`, `MedicineDispensed`, `PaymentCompleted`).
4. **Caching & Session**: Redis for doctor slot availability caching & token rate limiting.
5. **Frontend Application**: React 18 with Vite, Lucide React Icons, and flat React Router v6 routing.
6. **Containerization & Deployment**: Docker Compose & Vercel Production Hosting.

---

### 2. End-to-End Clinical Workflow (Explain This in Your Viva)

```text
PATIENT (Search Doctor & Book Slot)
    │
    ▼
DOCTOR (Attending Queue & Patient 360° Workspace)
    │
    ▼
LAB TECHNICIAN (Sample Collection, Enter Findings & Publish Kafka Event)
    │
    ▼
DOCTOR / PATIENT (Review Completed Lab Reports)
    │
    ▼
PHARMACIST (Prescription Queue, Atomic Inventory Stock Deduction)
    │
    ▼
BILLING STAFF (Automatic Multi-Service Invoice Calculation & UPI/Card Payment)
    │
    ▼
NOTIFICATION SERVICE (Kafka Event Alerts & Telemetry Audit Trail Logs)
```

---

### 3. Frequently Asked Viva Questions & Standard Answers

#### Q1: Why did you choose a Microservices Architecture instead of a Monolith?
> **Answer**: In a large hospital, different departments (Laboratory, Pharmacy, Billing, Appointments) experience varying traffic loads. Microservices allow each service to scale independently, isolate failures (e.g. if Pharmacy Service goes down, Patient Booking still works), and maintain independent database schemas for strict data isolation.

#### Q2: How do your microservices communicate with each other?
> **Answer**: 
> 1. **Synchronous REST APIs**: via Spring Cloud Gateway (`:8080`) using JWT tokens for HTTP request-response operations (e.g. fetching doctor slots, logging in).
> 2. **Asynchronous Kafka Events**: for decoupled business workflows (e.g. when a Lab Tech publishes a result, a `LabResultAvailable` Kafka event is broadcast so Notification Service and Medical Record Service update without tight coupling).

#### Q3: How do you prevent double-booking of doctor appointment slots?
> **Answer**: Slot booking uses Redis slot key locking (`slot:doc_id:date:time`) and transactional PostgreSQL database checks (`SELECT FOR UPDATE`) to guarantee atomic reservation and prevent race conditions.

#### Q4: How is security and authorization enforced?
> **Answer**: Authentication uses stateless JWT tokens signed with HMAC-SHA256 containing user claims and roles (`ADMIN`, `DOCTOR`, `PATIENT`, etc.). Method-level authorization (`@PreAuthorize("hasRole('DOCTOR')")`) in Spring Security enforces backend ownership checks so patients cannot access other patients' records.

#### Q5: What is the Patient 360° Workspace?
> **Answer**: It is a single-screen clinical workspace for attending physicians that aggregates Patient Profile, Vitals, Previous Medical Record History, Active Consultation notes, Prescription creator, Recommended Lab test order, and Completed Lab Report review in unified tabs without page reloads.

---

### 4. System Quick Run Commands

```bash
# 1. Run local React Frontend dev server
cd frontend
npm install
npm run dev

# 2. Build React production bundle
npm run build

# 3. Start full Docker container infrastructure
docker compose up --build
```

---

### 5. Live Production URLs & Demo Accounts

- **Live Production URL**: https://frontend-nine-iota-46.vercel.app
- **GitHub Repository**: https://github.com/reddycharankumar513-dotcom/Hospitial-Management-System-

#### Demo Sign In Accounts:
- **ADMIN**: `admin@hms.com` / `admin123`
- **DOCTOR**: `doctor@hms.com` / `doctor123`
- **PATIENT**: `patient@hms.com` / `patient123`
- **LAB TECH**: `lab@hms.com` / `lab123`
- **PHARMACIST**: `pharmacy@hms.com` / `pharmacy123`
- **BILLING**: `billing@hms.com` / `billing123`
- **BED MANAGER**: `bed@hms.com` / `bed123`
