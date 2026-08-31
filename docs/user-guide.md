# End-to-End User Guide

## Complete Demo Scenario Walkthrough
1. **Patient Registration & Login**: Login as `patient@hms.com` (`patient123`).
2. **Smart Recommendation**: Enter symptoms (`fever, chest tightness`) to get recommended doctor & slot.
3. **Book Appointment**: Select time slot and book appointment with `Dr. John Doe`.
4. **Doctor Consultation**: Switch role to `DOCTOR`, confirm appointment, enter symptoms, diagnosis, and prescription.
5. **Lab Order & Result**: Switch role to `LAB_TECHNICIAN`, select pending order, submit test result (triggers Kafka `LabResultAvailable` event).
6. **Pharmacy Dispensing**: Switch role to `PHARMACIST`, open prescription, dispense medicine (atomically updates stock).
7. **Billing & Payment**: Switch role to `BILLING_STAFF`, view invoice, record payment (triggers Kafka `PaymentCompleted` event).
8. **Bed Admission**: Nurse admits patient to `ICU-01`, then discharges patient when treatment completes.
