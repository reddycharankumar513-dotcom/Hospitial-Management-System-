import React, { useState } from 'react';
import { BedDouble, CheckCircle, UserPlus, ArrowRightLeft, ShieldAlert } from 'lucide-react';
import Modal from '../../components/common/Modal';

export default function BedManagement() {
  const [beds, setBeds] = useState([
    { id: 1, num: 'ICU-01', ward: 'Cardiac ICU', type: 'ICU', rate: '$1,500/day', status: 'OCCUPIED', patient: 'Peter Parker' },
    { id: 2, num: 'ICU-02', ward: 'Cardiac ICU', type: 'ICU', rate: '$1,500/day', status: 'AVAILABLE', patient: null },
    { id: 3, num: 'ICU-03', ward: 'Surgical ICU', type: 'ICU', rate: '$1,500/day', status: 'OCCUPIED', patient: 'Bruce Wayne' },
    { id: 4, num: 'ICU-04', ward: 'Surgical ICU', type: 'ICU', rate: '$1,500/day', status: 'AVAILABLE', patient: null },
    { id: 5, num: 'ICU-05', ward: 'Pediatric ICU', type: 'ICU', rate: '$1,400/day', status: 'AVAILABLE', patient: null },
    { id: 6, num: 'ICU-06', ward: 'Pediatric ICU', type: 'ICU', rate: '$1,400/day', status: 'MAINTENANCE', patient: null },

    { id: 7, num: 'GEN-101', ward: 'General Ward A', type: 'GENERAL', rate: '$400/day', status: 'OCCUPIED', patient: 'Tony Stark' },
    { id: 8, num: 'GEN-102', ward: 'General Ward A', type: 'GENERAL', rate: '$400/day', status: 'AVAILABLE', patient: null },
    { id: 9, num: 'GEN-103', ward: 'General Ward A', type: 'GENERAL', rate: '$400/day', status: 'OCCUPIED', patient: 'Diana Prince' },
    { id: 10, num: 'GEN-104', ward: 'General Ward A', type: 'GENERAL', rate: '$400/day', status: 'AVAILABLE', patient: null },
    { id: 11, num: 'GEN-201', ward: 'General Ward B', type: 'GENERAL', rate: '$400/day', status: 'AVAILABLE', patient: null },
    { id: 12, num: 'GEN-202', ward: 'General Ward B', type: 'GENERAL', rate: '$400/day', status: 'OCCUPIED', patient: 'Clark Kent' },
    { id: 13, num: 'GEN-203', ward: 'General Ward B', type: 'GENERAL', rate: '$400/day', status: 'AVAILABLE', patient: null },
    { id: 14, num: 'GEN-204', ward: 'General Ward B', type: 'GENERAL', rate: '$400/day', status: 'AVAILABLE', patient: null },

    { id: 15, num: 'PVT-301', ward: 'Private Wing West', type: 'PRIVATE', rate: '$1,000/day', status: 'RESERVED', patient: null },
    { id: 16, num: 'PVT-302', ward: 'Private Wing West', type: 'PRIVATE', rate: '$1,000/day', status: 'AVAILABLE', patient: null },
    { id: 17, num: 'PVT-303', ward: 'Private Wing East', type: 'PRIVATE', rate: '$1,000/day', status: 'OCCUPIED', patient: 'Steve Rogers' },
    { id: 18, num: 'PVT-304', ward: 'Private Wing East', type: 'PRIVATE', rate: '$1,000/day', status: 'AVAILABLE', patient: null },
    { id: 19, num: 'SUITE-401', ward: 'Executive Deluxe Suite', type: 'SUITE', rate: '$2,500/day', status: 'AVAILABLE', patient: null },
    { id: 20, num: 'SUITE-402', ward: 'Executive Deluxe Suite', type: 'SUITE', rate: '$2,500/day', status: 'OCCUPIED', patient: 'Natasha Romanoff' },

    { id: 21, num: 'EMG-01', ward: 'Trauma Triage Bay', type: 'EMERGENCY', rate: '$800/day', status: 'OCCUPIED', patient: 'Barry Allen' },
    { id: 22, num: 'EMG-02', ward: 'Trauma Triage Bay', type: 'EMERGENCY', rate: '$800/day', status: 'AVAILABLE', patient: null },
    { id: 23, num: 'EMG-03', ward: 'Emergency Bay B', type: 'EMERGENCY', rate: '$800/day', status: 'AVAILABLE', patient: null },
    { id: 24, num: 'EMG-04', ward: 'Emergency Bay B', type: 'EMERGENCY', rate: '$800/day', status: 'MAINTENANCE', patient: null },
  ]);

  const [selectedBed, setSelectedBed] = useState(null);
  const [admitPatientName, setAdmitPatientName] = useState('');

  const handleAdmit = (e) => {
    e.preventDefault();
    setBeds(beds.map(b => b.id === selectedBed.id ? { ...b, status: 'OCCUPIED', patient: admitPatientName } : b));
    alert(`Patient ${admitPatientName} admitted to bed ${selectedBed.num}! Dispatched PatientAdmitted Kafka Event.`);
    setSelectedBed(null);
  };

  const handleDischarge = (id) => {
    setBeds(beds.map(b => b.id === id ? { ...b, status: 'AVAILABLE', patient: null } : b));
    alert("Patient discharged! Dispatched PatientDischarged Kafka Event -> Updated Bed Availability.");
  };

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Visual Hospital Bed Map ({beds.length} Total Hospital Beds)</h1>
          <p style={{ color: '#94a3b8' }}>Real-time ward occupancy, ICU admissions, bed transfers & discharges</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <span className="badge badge-success">AVAILABLE: {beds.filter(b => b.status === 'AVAILABLE').length}</span>
          <span className="badge badge-danger">OCCUPIED: {beds.filter(b => b.status === 'OCCUPIED').length}</span>
          <span className="badge badge-warning">RESERVED/MAINT: {beds.filter(b => b.status !== 'AVAILABLE' && b.status !== 'OCCUPIED').length}</span>
        </div>
      </div>

      <div className="glass-card">
        <h3>Live Hospital Ward Grid</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '16px' }}>
          {beds.map(b => (
            <div key={b.id} style={{
              padding: '16px',
              borderRadius: '12px',
              background: b.status === 'AVAILABLE' ? 'rgba(16,185,129,0.1)' : b.status === 'OCCUPIED' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
              border: b.status === 'AVAILABLE' ? '1px solid #10b981' : b.status === 'OCCUPIED' ? '1px solid #ef4444' : '1px solid #f59e0b'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '1.1rem' }}>{b.num}</strong>
                <BedDouble size={20} color={b.status === 'AVAILABLE' ? '#10b981' : '#ef4444'} />
              </div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '6px' }}>{b.ward} ({b.type})</p>
              <p style={{ fontSize: '0.75rem', color: '#06b6d4', marginTop: '2px' }}>Rate: {b.rate}</p>
              {b.patient && <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', marginTop: '6px' }}>Patient: {b.patient}</p>}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                <span className={`badge ${b.status === 'AVAILABLE' ? 'badge-success' : 'badge-danger'}`}>
                  {b.status}
                </span>

                {b.status === 'AVAILABLE' && (
                  <button className="btn btn-primary" style={{ padding: '4px 8px', fontSize: '0.72rem' }} onClick={() => setSelectedBed(b)}>
                    Admit Patient
                  </button>
                )}
                {b.status === 'OCCUPIED' && (
                  <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.72rem' }} onClick={() => handleDischarge(b.id)}>
                    Discharge
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={!!selectedBed} onClose={() => setSelectedBed(null)} title={`Admit Patient to Bed ${selectedBed?.num}`}>
        <form onSubmit={handleAdmit}>
          <div style={{ marginBottom: '14px' }}>
            <label>Ward / Bed Location</label>
            <input disabled value={`${selectedBed?.ward} (${selectedBed?.num})`} />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Patient Full Name</label>
            <input required placeholder="Enter patient name..." value={admitPatientName} onChange={e => setAdmitPatientName(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Confirm Admission (Kafka Event)
          </button>
        </form>
      </Modal>
    </div>
  );
}
