package com.hms.bed.repository;

import com.hms.bed.entity.Admission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface AdmissionRepository extends JpaRepository<Admission, Long> {
    List<Admission> findByPatientId(Long patientId);
    Optional<Admission> findByPatientIdAndStatus(Long patientId, String status);
}
