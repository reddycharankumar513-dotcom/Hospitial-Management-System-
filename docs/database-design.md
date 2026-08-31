# Database Design & Strategy

## Database-per-Service Architecture
Each microservice owns its private PostgreSQL database to guarantee strict data isolation.

| Service | Database Name | Primary Entities |
| :--- | :--- | :--- |
| Auth Service | `auth_db` | `users` |
| Patient Service | `patient_db` | `patients` |
| Doctor Service | `doctor_db` | `doctors` |
| Appointment Service | `appointment_db` | `appointments` |
| Medical Record Service | `medical_record_db` | `medical_records` |
| Lab Service | `lab_db` | `lab_orders`, `lab_results` |
| Pharmacy Service | `pharmacy_db` | `medicines`, `prescriptions` |
| Billing Service | `billing_db` | `bills`, `payments` |
| Bed Service | `bed_db` | `beds`, `admissions` |
| Notification Service | `notification_db` | `notifications` |
