import React, { useState } from 'react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import { Calendar, Plus } from 'lucide-react';

export default function AppointmentManagement({ doctors, appointments, onAddAppointment }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppt, setNewAppt] = useState({ patient: '', doctor: doctors[0]?.name || '', date: '2026-09-02', time: '10:00 AM' });

  const handleBookSubmit = (e) => {
    e.preventDefault();
    const created = {
      id: Date.now(),
      apptNum: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      patient: newAppt.patient,
      doctor: newAppt.doctor,
      date: newAppt.date,
      time: newAppt.time,
      status: 'CONFIRMED'
    };
    onAddAppointment(created);
    setIsModalOpen(false);
  };

  const columns = [
    { label: 'Appt #', key: 'apptNum', render: a => <span className="badge badge-info">{a.apptNum}</span> },
    { label: 'Patient Name', key: 'patient', render: a => <strong>{a.patient}</strong> },
    { label: 'Attending Doctor & Specialization', key: 'doctor', render: a => <span style={{ color: '#06b6d4', fontWeight: 600 }}>{a.doctor}</span> },
    { label: 'Scheduled Date & Time', key: 'date', render: a => `${a.date} (${a.time})` },
    { label: 'Status', key: 'status', render: a => <span className={`badge ${a.status === 'CONFIRMED' ? 'badge-success' : 'badge-warning'}`}>{a.status}</span> }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Enterprise Appointment Management Queue</h1>
        <p style={{ color: '#94a3b8' }}>Dynamic doctor availability dropdown updated live from Doctor Directory</p>
      </div>

      <div className="glass-card">
        <DataTable
          columns={columns}
          data={appointments}
          searchPlaceholder="Search appointment, patient, doctor..."
          actions={
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              <Plus size={16} /> Schedule New Appointment
            </button>
          }
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Schedule Doctor Appointment">
        <form onSubmit={handleBookSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label>Patient Full Name</label>
            <input required placeholder="Enter patient name" value={newAppt.patient} onChange={e => setNewAppt({ ...newAppt, patient: e.target.value })} />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label>Select Attending Doctor</label>
            <select value={newAppt.doctor} onChange={e => setNewAppt({ ...newAppt, doctor: e.target.value })}>
              {doctors.map(d => (
                <option key={d.id} value={`${d.name} (${d.spec})`}>
                  {d.name} - {d.spec} ({d.dept})
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label>Consultation Date</label>
              <input type="date" value={newAppt.date} onChange={e => setNewAppt({ ...newAppt, date: e.target.value })} />
            </div>
            <div>
              <label>Time Slot</label>
              <select value={newAppt.time} onChange={e => setNewAppt({ ...newAppt, time: e.target.value })}>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
                <option value="04:00 PM">04:00 PM</option>
              </select>
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Confirm Scheduled Appointment
          </button>
        </form>
      </Modal>
    </div>
  );
}
