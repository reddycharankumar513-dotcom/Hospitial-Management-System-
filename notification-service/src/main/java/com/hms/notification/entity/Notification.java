package com.hms.notification.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String notificationId;
    private Long userId;
    private String eventType;
    
    @Column(length = 2000)
    private String message;
    
    private String channel; // EMAIL, SMS, IN_APP
    private String status; // SENT, PENDING, FAILED

    private LocalDateTime createdAt;
    private LocalDateTime sentAt;
}
