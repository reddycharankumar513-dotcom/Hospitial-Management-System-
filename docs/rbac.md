# Role-Based Access Control (RBAC) Matrix

| Resource | ADMIN | DOCTOR | NURSE | LAB_TECHNICIAN | PHARMACIST | BILLING_STAFF | PATIENT |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Patients** | CRUD | CRU | CRU | R | R | R | R (Own) |
| **Doctors** | CRUD | R | R | R | R | R | R |
| **Appointments** | CRUD | CRU | CRU | R | R | R | CR (Own) |
| **Medical Records**| CRUD | CRU | R | R | R | - | R (Own) |
| **Laboratory** | CRUD | CR | R | CRU | - | - | R (Own) |
| **Pharmacy** | CRUD | R | R | - | CRU | - | - |
| **Billing** | CRUD | - | - | - | - | CRU | R (Own) |
| **Beds Map** | CRUD | R | CRU | - | - | - | - |
| **Users** | CRUD | - | - | - | - | - | - |
| **Audit Logs** | R | - | - | - | - | - | - |
