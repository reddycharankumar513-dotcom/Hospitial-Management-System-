# Security & Role-Based Access Control

## JWT Authentication Architecture
1. Client logs in via `/api/auth/login`.
2. Auth Service verifies BCrypt hashed password and signs an HMAC-SHA256 JWT containing `userId`, `email`, and `role`.
3. Client passes `Authorization: Bearer <token>` to API Gateway.
4. Gateway parses token and passes downstream headers `X-User-Id` and `X-User-Role`.

## Role Matrix
- `ADMIN`: Platform monitoring & user status management.
- `DOCTOR`: Appointments, clinical records, prescriptions, lab orders.
- `PATIENT`: Self profile, own appointments, own records, recommendation & triage tool.
- `LAB_TECHNICIAN`: Pending orders & result entry.
- `PHARMACIST`: Pharmacy stock & dispensing.
- `BILLING_STAFF`: Invoices & payment settlement.
- `NURSE`: Ward bed allocation & patient admission/discharge.
