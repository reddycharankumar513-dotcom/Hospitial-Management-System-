import React, { useState } from 'react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import { UserPlus, Activity, Calendar, Award, Phone } from 'lucide-react';

export default function DoctorManagement({ doctors, onAddDoctor }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({ name: '', spec: '', dept: 'Cardiology', qual: '', exp: '', fee: '', phone: '' });

  const handleAddDoctor = (e) => {
    e.preventDefault();
    const created = { id: Date.now(), docNum: `DOC-${Math.floor(2015 + Math.random() * 800)}`, ...newDoc, status: 'AVAILABLE' };
    onAddDoctor(created);
    setIsModalOpen(false);
    setNewDoc({ name: '', spec: '', dept: 'Cardiology', qual: '', exp: '', fee: '', phone: '' });
  };

  const columns = [
    { label: 'Doctor ID', key: 'docNum', render: d => <span className="badge badge-info">{d.docNum}</span> },
    { label: 'Doctor Name', key: 'name', render: d => <strong>{d.name}</strong> },
    { label: 'Specialization', key: 'spec' },
    { label: 'Department', key: 'dept', render: d => <span className="badge badge-warning">{d.dept}</span> },
    { label: 'Qualification / Exp', key: 'qual', render: d => `${d.qual} (${d.exp})` },
    { label: 'Consultation Fee', key: 'fee', render: d => <strong style={{ color: '#06b6d4' }}>{d.fee}</strong> },
    { label: 'Contact Phone', key: 'phone' },
    { label: 'Status', key: 'status', render: d => <span className="badge badge-success">{d.status}</span> }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Doctor Directory & Department Roster ({doctors.length} Doctors Registered)</h1>
        <p style={{ color: '#94a3b8' }}>Adding a doctor here automatically updates the Appointments & Patient Booking dropdowns!</p>
      </div>

      <div className="glass-card">
        <DataTable
          columns={columns}
          data={doctors}
          searchPlaceholder="Search doctor, specialization, department..."
          actions={
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              <UserPlus size={16} /> Add New Specialist Doctor
            </button>
          }
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Register Specialist Doctor">
        <form onSubmit={handleAddDoctor}>
          <div style={{ marginBottom: '14px' }}>
            <label>Doctor Full Name</label>
            <input required placeholder="Dr. Alexander Fleming" value={newDoc.name} onChange={e => setNewDoc({ ...newDoc, name: e.target.value })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <label>Department</label>
              <select value={newDoc.dept} onChange={e => setNewDoc({ ...newDoc, dept: e.target.value })}>
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Oncology">Oncology</option>
                <option value="Dermatology">Dermatology</option>
                <option value="General Medicine">General Medicine</option>
                <option value="General Surgery">General Surgery</option>
              </select>
            </div>
            <div>
              <label>Specialization</label>
              <input required placeholder="Sub-specialty" value={newDoc.spec} onChange={e => setNewDoc({ ...newDoc, spec: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label>Qualification</label>
              <input required placeholder="MD, FACC" value={newDoc.qual} onChange={e => setNewDoc({ ...newDoc, qual: e.target.value })} />
            </div>
            <div>
              <label>Experience</label>
              <input required placeholder="10 yrs" value={newDoc.exp} onChange={e => setNewDoc({ ...newDoc, exp: e.target.value })} />
            </div>
            <div>
              <label>Consultation Fee</label>
              <input required placeholder="$150.00" value={newDoc.fee} onChange={e => setNewDoc({ ...newDoc, fee: e.target.value })} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Register Specialist
          </button>
        </form>
      </Modal>
    </div>
  );
}
