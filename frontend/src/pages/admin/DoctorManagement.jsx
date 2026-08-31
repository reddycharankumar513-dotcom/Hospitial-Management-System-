import React, { useState } from 'react';
import DataTable from '../../components/common/DataTable';
import { Activity, Calendar } from 'lucide-react';

export default function DoctorManagement() {
  const doctors = [
    { id: 1, docNum: 'DOC-2001', name: 'Dr. John Doe', spec: 'Cardiologist', dept: 'Cardiology', qual: 'MD, FACC', fee: '$150.00', status: 'AVAILABLE' },
    { id: 2, docNum: 'DOC-2002', name: 'Dr. Sarah Connor', spec: 'General Physician', dept: 'General Medicine', qual: 'MBBS, MD', fee: '$100.00', status: 'AVAILABLE' },
  ];

  const columns = [
    { label: 'Doctor ID', key: 'docNum', render: d => <span className="badge badge-info">{d.docNum}</span> },
    { label: 'Doctor Name', key: 'name', render: d => <strong>{d.name}</strong> },
    { label: 'Specialization', key: 'spec' },
    { label: 'Department', key: 'dept' },
    { label: 'Fee', key: 'fee' },
    { label: 'Status', key: 'status', render: d => <span className="badge badge-success">{d.status}</span> }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Doctor Directory & Schedules</h1>
        <p style={{ color: '#94a3b8' }}>Specialization management & working hours</p>
      </div>

      <div className="glass-card">
        <DataTable columns={columns} data={doctors} searchPlaceholder="Search doctor, department..." />
      </div>
    </div>
  );
}
