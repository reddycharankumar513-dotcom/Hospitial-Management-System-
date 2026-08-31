import React, { useState } from 'react';
import DataTable from '../../components/common/DataTable';
import { Calendar } from 'lucide-react';

export default function AppointmentManagement() {
  const appts = [
    { id: 1, apptNum: 'APT-1001', patient: 'Peter Parker', doctor: 'Dr. John Doe', date: '2026-09-01', time: '09:00 AM', status: 'CONFIRMED' },
    { id: 2, apptNum: 'APT-1002', patient: 'Tony Stark', doctor: 'Dr. Sarah Connor', date: '2026-09-01', time: '10:30 AM', status: 'BOOKED' }
  ];

  const columns = [
    { label: 'Appt #', key: 'apptNum', render: a => <span className="badge badge-info">{a.apptNum}</span> },
    { label: 'Patient Name', key: 'patient' },
    { label: 'Attending Doctor', key: 'doctor' },
    { label: 'Date & Time', key: 'date', render: a => `${a.date} (${a.time})` },
    { label: 'Status', key: 'status', render: a => <span className="badge badge-success">{a.status}</span> }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Appointment Operations Queue</h1>
        <p style={{ color: '#94a3b8' }}>Double booking prevention & queue scheduling</p>
      </div>

      <div className="glass-card">
        <DataTable columns={columns} data={appts} searchPlaceholder="Search appointment..." />
      </div>
    </div>
  );
}
