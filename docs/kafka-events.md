# Apache Kafka Event Streaming

## Event Topics & Messages

### `appointment-events`
- `AppointmentBooked`: Published when an appointment is confirmed.
- `AppointmentCancelled`: Published when an appointment is cancelled.

### `lab-events`
- `LabResultAvailable`: Triggered when lab technician finalizes test results.

### `pharmacy-events`
- `PrescriptionCreated`: Triggered upon prescription issuance.
- `MedicineDispensed`: Published when stock is atomically deducted.
- `LowStockAlert`: Triggered when inventory falls below reorder level.

### `billing-events`
- `BillGenerated`: Invoicing event.
- `PaymentCompleted`: Payment record event.

### `admission-events`
- `PatientAdmitted`: Ward bed occupied.
- `PatientDischarged`: Bed freed.
