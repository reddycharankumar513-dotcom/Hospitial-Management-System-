package com.hms.lab.repository;

import com.hms.lab.entity.LabOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LabOrderRepository extends JpaRepository<LabOrder, Long> {
    List<LabOrder> findByPatientId(Long patientId);
    List<LabOrder> findByDoctorId(Long doctorId);
    List<LabOrder> findByStatus(String status);
}
