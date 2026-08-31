# Testing & Verification

## Running Backend Tests
Execute Maven test suite across all 12 modules:
```bash
./mvnw test
```

## Unit Test Coverage
- `AuthServiceTest`: User registration & BCrypt verification.
- `PatientTriageTest`: Urgency classification logic.
- `DoctorRecommendationTest`: Symptom to department matching.
- `AppointmentConflictTest`: Double booking prevention.
- `PharmacyStockTest`: Expiry & stock deduction check.
- `BedAllocationTest`: Double bed allocation block.
