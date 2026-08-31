package com.hms.lab.repository;

import com.hms.lab.entity.LabResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface LabResultRepository extends JpaRepository<LabResult, Long> {
    List<LabResult> findByPatientId(Long patientId);
    Optional<LabResult> findByLabOrderId(Long labOrderId);
}
