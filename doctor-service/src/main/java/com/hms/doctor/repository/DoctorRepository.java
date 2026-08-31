package com.hms.doctor.repository;

import com.hms.doctor.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {
    List<Doctor> findBySpecializationIgnoreCase(String specialization);
    List<Doctor> findByDepartmentIgnoreCase(String department);
    Optional<Doctor> findByDoctorNumber(String doctorNumber);
    Optional<Doctor> findByUserId(Long userId);
}
