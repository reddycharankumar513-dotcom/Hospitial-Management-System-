import React, { useState } from 'react';
import { Bell, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

export default function NotificationCenter({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'CRITICAL', title: 'Critical Emergency Case', msg: 'Severe Trauma patient assigned to ICU-01', time: '2 mins ago', read: false },
    { id: 2, type: 'WARNING', title: 'ICU Bed Availability Low', msg: 'Only 2 ICU beds remaining', time: '15 mins ago', read: false },
    { id: 3, type: 'INFO', title: 'Lab Result Completed', msg: 'Blood test results ready for Patient #1001', time: '45 mins ago', read: true },
    { id: 4, type: 'SUCCESS', title: 'Payment Completed', msg: 'Invoice #INV-9001 settled via UPI', time: '1 hr ago', read: true }
  ]);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div style={{
      position: 'absolute',
      top: '60px',
      right: '24px',
      width: '360px',
      background: 'var(--bg-surface)',
      border: '1px solid var(--border-color)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: 'var(--shadow-lg)',
      zIndex: 500,
      padding: '16px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bell size={18} color="#06b6d4" />
          <strong style={{ fontSize: '0.95rem' }}>Notification Center</strong>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: '#06b6d4', fontSize: '0.75rem', cursor: 'pointer' }}>Mark all read</button>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}><X size={16} /></button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '320px', overflowY: 'auto' }}>
        {notifications.map(n => (
          <div key={n.id} style={{
            padding: '10px 12px',
            borderRadius: '8px',
            background: n.read ? 'transparent' : 'rgba(6,182,212,0.08)',
            borderLeft: n.type === 'CRITICAL' ? '3px solid #ef4444' : n.type === 'WARNING' ? '3px solid #f59e0b' : '3px solid #06b6d4'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <strong style={{ fontSize: '0.85rem' }}>{n.title}</strong>
              <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{n.time}</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '4px' }}>{n.msg}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
