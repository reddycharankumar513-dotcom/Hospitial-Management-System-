import React, { useState } from 'react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import { UserPlus, Activity, Calendar, Award, Phone, Clock } from 'lucide-react';

export default function DoctorManagement() {
  const [doctors, setDoctors] = useState([
    { id: 1, docNum: 'DOC-2001', name: 'Dr. John Doe', spec: 'Interventional Cardiology', dept: 'Cardiology', qual: 'MD, FACC', exp: '15 yrs', fee: '$150.00', status: 'AVAILABLE', phone: '9876543001' },
    { id: 2, docNum: 'DOC-2002', name: 'Dr. Robert Chen', spec: 'Electrophysiology', dept: 'Cardiology', qual: 'MD, FESC', exp: '12 yrs', fee: '$160.00', status: 'AVAILABLE', phone: '9876543002' },
    { id: 3, docNum: 'DOC-2003', name: 'Dr. Emily Watson', spec: 'Pediatric Cardiology', dept: 'Cardiology', qual: 'MD, DCH', exp: '10 yrs', fee: '$140.00', status: 'AVAILABLE', phone: '9876543003' },
    { id: 4, docNum: 'DOC-2004', name: 'Dr. Alan Grant', spec: 'Clinical Neurology', dept: 'Neurology', qual: 'MD, DM Neurology', exp: '18 yrs', fee: '$180.00', status: 'AVAILABLE', phone: '9876543004' },
    { id: 5, docNum: 'DOC-2005', name: 'Dr. Sophia Martinez', spec: 'Stroke & Neuro-Critical Care', dept: 'Neurology', qual: 'MD, FINR', exp: '14 yrs', fee: '$175.00', status: 'AVAILABLE', phone: '9876543005' },
    { id: 6, docNum: 'DOC-2006', name: 'Dr. Marcus Vance', spec: 'Trauma & Joint Replacement', dept: 'Orthopedics', qual: 'MS Ortho, MCh', exp: '16 yrs', fee: '$150.00', status: 'AVAILABLE', phone: '9876543006' },
    { id: 7, docNum: 'DOC-2007', name: 'Dr. Olivia Taylor', spec: 'Sports Medicine & Arthroscopy', dept: 'Orthopedics', qual: 'MS Ortho, Dip. Sports', exp: '9 yrs', fee: '$135.00', status: 'AVAILABLE', phone: '9876543007' },
    { id: 8, docNum: 'DOC-2008', name: 'Dr. David Miller', spec: 'General Pediatrics & Neonatology', dept: 'Pediatrics', qual: 'MD Pediatrics, DCH', exp: '11 yrs', fee: '$120.00', status: 'AVAILABLE', phone: '9876543008' },
    { id: 9, docNum: 'DOC-2009', name: 'Dr. Jessica Alba', spec: 'Pediatric Pulmonology', dept: 'Pediatrics', qual: 'MD Pediatrics', exp: '8 yrs', fee: '$125.00', status: 'AVAILABLE', phone: '9876543009' },
    { id: 10, docNum: 'DOC-2010', name: 'Dr. Vikram Seth', spec: 'Medical Oncology', dept: 'Oncology', qual: 'MD, DM Oncology', exp: '20 yrs', fee: '$220.00', status: 'AVAILABLE', phone: '9876543010' },
    { id: 11, docNum: 'DOC-2011', name: 'Dr. Hannah Abbott', spec: 'Radiation Oncology', dept: 'Oncology', qual: 'MD Radiation Oncology', exp: '13 yrs', fee: '$200.00', status: 'AVAILABLE', phone: '9876543011' },
    { id: 12, docNum: 'DOC-2012', name: 'Dr. Clara Oswald', spec: 'Clinical & Cosmetic Dermatology', dept: 'Dermatology', qual: 'MD Dermatology', exp: '7 yrs', fee: '$110.00', status: 'AVAILABLE', phone: '9876543012' },
    { id: 13, docNum: 'DOC-2013', name: 'Dr. Sarah Connor', spec: 'Internal Medicine', dept: 'General Medicine', qual: 'MBBS, MD Medicine', exp: '14 yrs', fee: '$100.00', status: 'AVAILABLE', phone: '9876543013' },
    { id: 14, docNum: 'DOC-2014', name: 'Dr. James Wilson', spec: 'Gastrointestinal Surgery', dept: 'General Surgery', qual: 'MS Surgery, FMAS', exp: '15 yrs', fee: '$165.00', status: 'AVAILABLE', phone: '9876543014' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDoc, setNewDoc] = useState({ name: '', spec: '', dept: 'Cardiology', qual: '', exp: '', fee: '', phone: '' });

  const handleAddDoctor = (e) => {
    e.preventDefault();
    const created = { id: Date.now(), docNum: `DOC-${Math.floor(2015 + Math.random() * 800)}`, ...newDoc, status: 'AVAILABLE' };
    setDoctors([...doctors, created]);
    setIsModalOpen(false);
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
        <h1>Doctor Directory & Department Roster ({doctors.length} Doctors)</h1>
        <p style={{ color: '#94a3b8' }}>Specialization management, qualifications & consultation fee roster</p>
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
