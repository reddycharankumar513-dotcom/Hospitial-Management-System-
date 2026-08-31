package com.hms.billing.service;

import com.hms.billing.dto.BillingDtos.*;
import com.hms.billing.entity.Bill;
import com.hms.billing.entity.Payment;
import com.hms.billing.repository.BillRepository;
import com.hms.billing.repository.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BillingService {

    private final BillRepository billRepository;
    private final PaymentRepository paymentRepository;
    private final KafkaProducerService kafkaProducer;

    public BillResponse createBill(BillRequest req) {
        double disc = req.getDiscount() != null ? req.getDiscount() : 0.0;
        double tax = req.getTaxAmount() != null ? req.getTaxAmount() : 0.0;
        double net = (req.getTotalAmount() - disc) + tax;

        String billNum = "INV-" + System.currentTimeMillis() % 100000;
        Bill bill = Bill.builder()
                .billNumber(billNum)
                .patientId(req.getPatientId())
                .appointmentId(req.getAppointmentId())
                .totalAmount(req.getTotalAmount())
                .discount(disc)
                .taxAmount(tax)
                .netAmount(net)
                .paidAmount(0.0)
                .status("GENERATED")
                .billDate(LocalDate.now())
                .dueDate(LocalDate.now().plusDays(15))
                .build();

        Bill saved = billRepository.save(bill);
        kafkaProducer.sendEvent("BillGenerated", String.format("{\"billId\":%d, \"patientId\":%d, \"netAmount\":%.2f}", saved.getId(), saved.getPatientId(), saved.getNetAmount()));
        return mapToBillResponse(saved);
    }

    public List<BillResponse> getAllBills() {
        return billRepository.findAll().stream().map(this::mapToBillResponse).toList();
    }

    public BillResponse getBillById(Long id) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found with id: " + id));
        return mapToBillResponse(bill);
    }

    public List<BillResponse> getBillsByPatient(Long patientId) {
        return billRepository.findByPatientId(patientId).stream().map(this::mapToBillResponse).toList();
    }

    @Transactional
    public PaymentResponse recordPayment(PaymentRequest req) {
        Bill bill = billRepository.findById(req.getBillId())
                .orElseThrow(() -> new RuntimeException("Bill not found with id: " + req.getBillId()));

        double newPaid = bill.getPaidAmount() + req.getAmount();
        bill.setPaidAmount(newPaid);
        if (newPaid >= bill.getNetAmount()) {
            bill.setStatus("PAID");
        } else {
            bill.setStatus("PARTIALLY_PAID");
        }
        billRepository.save(bill);

        String payNum = "PAY-" + System.currentTimeMillis() % 100000;
        Payment payment = Payment.builder()
                .billId(bill.getId())
                .paymentNumber(payNum)
                .paymentMethod(req.getPaymentMethod())
                .amount(req.getAmount())
                .transactionId(req.getTransactionId() != null ? req.getTransactionId() : "TXN-" + System.currentTimeMillis() % 10000)
                .status("COMPLETED")
                .paymentDate(LocalDateTime.now())
                .build();

        Payment saved = paymentRepository.save(payment);
        kafkaProducer.sendEvent("PaymentCompleted", String.format("{\"paymentId\":%d, \"billId\":%d, \"amount\":%.2f}", saved.getId(), bill.getId(), saved.getAmount()));
        return mapToPaymentResponse(saved);
    }

    public PaymentResponse getPaymentById(Long id) {
        Payment p = paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with id: " + id));
        return mapToPaymentResponse(p);
    }

    public BillResponse updateBillStatus(Long id, String status) {
        Bill bill = billRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bill not found with id: " + id));
        bill.setStatus(status);
        return mapToBillResponse(billRepository.save(bill));
    }

    private BillResponse mapToBillResponse(Bill b) {
        return BillResponse.builder()
                .id(b.getId())
                .billNumber(b.getBillNumber())
                .patientId(b.getPatientId())
                .appointmentId(b.getAppointmentId())
                .totalAmount(b.getTotalAmount())
                .discount(b.getDiscount())
                .taxAmount(b.getTaxAmount())
                .netAmount(b.getNetAmount())
                .paidAmount(b.getPaidAmount())
                .status(b.getStatus())
                .billDate(b.getBillDate())
                .build();
    }

    private PaymentResponse mapToPaymentResponse(Payment p) {
        return PaymentResponse.builder()
                .id(p.getId())
                .billId(p.getBillId())
                .paymentNumber(p.getPaymentNumber())
                .paymentMethod(p.getPaymentMethod())
                .amount(p.getAmount())
                .transactionId(p.getTransactionId())
                .status(p.getStatus())
                .paymentDate(p.getPaymentDate())
                .build();
    }
}
