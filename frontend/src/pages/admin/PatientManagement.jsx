import React, { useState } from 'react';
import DataTable from '../../components/common/DataTable';
import { UserCheck, Eye, FileText, Activity } from 'lucide-react';

export default function PatientManagement() {
  const [patients] = useState([
    { id: 1, num: 'PAT-1001', name: 'Peter Parker', age: 26, gender: 'Male', blood: 'O+', phone: '9876543210', email: 'patient@hms.com', status: 'ACTIVE' },
    { id: 2, num: 'PAT-1002', name: 'Tony Stark', age: 51, gender: 'Male', blood: 'A+', phone: '9876543211', email: 'patient2@hms.com', status: 'ACTIVE' },
    { id: 3, num: 'PAT-1003', name: 'Diana Prince', age: 34, gender: 'Female', blood: 'B+', phone: '9876543212', email: 'patient3@hms.com', status: 'ACTIVE' },
  ]);

  const [selectedPatient, setSelectedPatient] = useState(null);

  const columns = [
    { label: 'Patient ID', key: 'num', render: p => <span className="badge badge-info">{p.num}</span> },
    { label: 'Full Name', key: 'name', render: p => <strong>{p.name}</strong> },
    { label: 'Age / Gender', key: 'age', render: p => `${p.age} yrs / ${p.gender}` },
    { label: 'Blood Group', key: 'blood', render: p => <span className="badge badge-warning">{p.blood}</span> },
    { label: 'Phone', key: 'phone' },
    { label: 'Status', key: 'status', render: p => <span className="badge badge-success">{p.status}</span> },
    {
      label: 'Actions', key: 'actions', render: p => (
        <button className="btn btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => setSelectedPatient(p)}>
          <Eye size={14} /> Profile
        </button>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Patient Directory & EHR Records</h1>
        <p style={{ color: '#94a3b8' }}>Comprehensive electronic health history & patient profiles</p>
      </div>

      <div className="glass-card">
        <DataTable columns={columns} data={patients} searchPlaceholder="Search patient name, ID, phone..." />
      </div>

      {selectedPatient && (
        <div style={{ marginTop: '24px' }} className="glass-card">
          <h3>Patient Profile: {selectedPatient.name} ({selectedPatient.num})</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginTop: '16px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
            <div><span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>AGE / GENDER</span><p><strong>{selectedPatient.age} yrs / {selectedPatient.gender}</strong></p></div>
            <div><span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>BLOOD GROUP</span><p><strong>{selectedPatient.blood}</strong></p></div>
            <div><span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>PHONE</span><p><strong>{selectedPatient.phone}</strong></p></div>
            <div><span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>EMAIL</span><p><strong>{selectedPatient.email}</strong></p></div>
          </div>
          <button className="btn btn-secondary" style={{ marginTop: '16px' }} onClick={() => setSelectedPatient(null)}>Close Profile</button>
        </div>
      )}
    </div>
  );
}
