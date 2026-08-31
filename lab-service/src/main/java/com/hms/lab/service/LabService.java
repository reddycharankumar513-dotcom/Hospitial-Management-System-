package com.hms.lab.service;

import com.hms.lab.dto.LabDtos.*;
import com.hms.lab.entity.LabOrder;
import com.hms.lab.entity.LabResult;
import com.hms.lab.repository.LabOrderRepository;
import com.hms.lab.repository.LabResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class LabService {

    private final LabOrderRepository orderRepository;
    private final LabResultRepository resultRepository;
    private final KafkaProducerService kafkaProducer;

    public OrderResponse createOrder(OrderRequest req) {
        String orderNum = "LAB-" + System.currentTimeMillis() % 100000;
        LabOrder order = LabOrder.builder()
                .orderNumber(orderNum)
                .patientId(req.getPatientId())
                .doctorId(req.getDoctorId())
                .appointmentId(req.getAppointmentId())
                .testName(req.getTestName())
                .category(req.getCategory() != null ? req.getCategory() : "Pathology")
                .priority(req.getPriority() != null ? req.getPriority() : "NORMAL")
                .status("ORDERED")
                .build();

        return mapToOrderResponse(orderRepository.save(order));
    }

    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream().map(this::mapToOrderResponse).toList();
    }

    public OrderResponse getOrderById(Long id) {
        LabOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lab order not found with id: " + id));
        return mapToOrderResponse(order);
    }

    public OrderResponse updateOrderStatus(Long id, String status) {
        LabOrder order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lab order not found with id: " + id));
        order.setStatus(status);
        return mapToOrderResponse(orderRepository.save(order));
    }

    @Transactional
    public ResultResponse submitResult(ResultRequest req) {
        LabOrder order = orderRepository.findById(req.getLabOrderId())
                .orElseThrow(() -> new RuntimeException("Lab order not found with id: " + req.getLabOrderId()));

        order.setStatus("COMPLETED");
        orderRepository.save(order);

        LabResult result = LabResult.builder()
                .labOrderId(req.getLabOrderId())
                .patientId(req.getPatientId())
                .testName(req.getTestName() != null ? req.getTestName() : order.getTestName())
                .resultValue(req.getResultValue())
                .unit(req.getUnit())
                .referenceRange(req.getReferenceRange())
                .remarks(req.getRemarks())
                .technicianId(req.getTechnicianId())
                .verifiedBy(req.getVerifiedBy() != null ? req.getVerifiedBy() : "Dr. Chief Pathologist")
                .resultDate(LocalDateTime.now())
                .build();

        LabResult saved = resultRepository.save(result);

        kafkaProducer.sendLabResultEvent(order.getId(), order.getPatientId(), saved.getTestName(), saved.getResultValue());

        return mapToResultResponse(saved);
    }

    public ResultResponse getResultById(Long id) {
        LabResult res = resultRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lab result not found with id: " + id));
        return mapToResultResponse(res);
    }

    public List<ResultResponse> getResultsByPatient(Long patientId) {
        return resultRepository.findByPatientId(patientId).stream().map(this::mapToResultResponse).toList();
    }

    private OrderResponse mapToOrderResponse(LabOrder o) {
        return OrderResponse.builder()
                .id(o.getId())
                .orderNumber(o.getOrderNumber())
                .patientId(o.getPatientId())
                .doctorId(o.getDoctorId())
                .appointmentId(o.getAppointmentId())
                .testName(o.getTestName())
                .category(o.getCategory())
                .priority(o.getPriority())
                .status(o.getStatus())
                .createdAt(o.getCreatedAt())
                .build();
    }

    private ResultResponse mapToResultResponse(LabResult r) {
        return ResultResponse.builder()
                .id(r.getId())
                .labOrderId(r.getLabOrderId())
                .patientId(r.getPatientId())
                .testName(r.getTestName())
                .resultValue(r.getResultValue())
                .unit(r.getUnit())
                .referenceRange(r.getReferenceRange())
                .remarks(r.getRemarks())
                .verifiedBy(r.getVerifiedBy())
                .resultDate(r.getResultDate())
                .build();
    }
}
