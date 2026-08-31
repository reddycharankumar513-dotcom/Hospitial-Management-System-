# API Documentation

## Routing Scheme
All external requests pass through API Gateway (`http://localhost:8080`).

| Microservice | Base Route | Description |
| :--- | :--- | :--- |
| Auth Service | `/api/auth/**` | Authentication & User Management |
| Patient Service | `/api/patients/**` | Patient Profiles & Emergency Triage |
| Doctor Service | `/api/doctors/**` | Doctor Profiles & Smart Recommendation |
| Appointment Service | `/api/appointments/**` | Appointment Booking & Slot Optimization |
| Medical Record Service | `/api/medical-records/**` | Clinical Encounter Records |
| Lab Service | `/api/lab/**` | Lab Test Orders & Result Finalization |
| Pharmacy Service | `/api/pharmacy/**` | Medicine Inventory & Dispensing |
| Billing Service | `/api/billing/**` | Invoices & Payment Recording |
| Bed Service | `/api/beds/**`, `/api/admissions/**` | Ward Beds & Admission Workflow |
| Notification Service | `/api/notifications/**` | Audit Trail & Event Notification History |
