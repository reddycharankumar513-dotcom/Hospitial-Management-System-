import React, { useState } from 'react';
import { BedDouble, CheckCircle } from 'lucide-react';

export default function BedPortal({ beds, onAdmitBed, onDischargeBed }) {
  const [selectedBed, setSelectedBed] = useState(null);
  const [patientName, setPatientName] = useState('');

  const handleAdmitSubmit = (e) => {
    e.preventDefault();
    onAdmitBed(selectedBed.id, patientName);
    alert(`Patient ${patientName} admitted to bed ${selectedBed.num}! Dispatched PatientAdmitted Kafka Event.`);
    setSelectedBed(null);
    setPatientName('');
  };

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>Bed Manager Portal ({beds.length} Total Hospital Ward Beds)</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Live state synchronized with Bed Management Administration</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="badge badge-success">AVAILABLE: {beds.filter(b => b.status === 'AVAILABLE').length}</span>
            <span className="badge badge-danger">OCCUPIED: {beds.filter(b => b.status === 'OCCUPIED').length}</span>
          </div>
        </div>
      </div>

      <div className="glass-card">
        <h3>Live Hospital Ward Grid</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '16px' }}>
          {beds.map(b => (
            <div key={b.id} style={{
              padding: '16px',
              borderRadius: '12px',
              background: b.status === 'AVAILABLE' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
              border: b.status === 'AVAILABLE' ? '1px solid #10b981' : '1px solid #ef4444'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '1.1rem' }}>{b.num}</strong>
                <BedDouble size={20} color={b.status === 'AVAILABLE' ? '#10b981' : '#ef4444'} />
              </div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '4px' }}>{b.ward} ({b.type})</p>
              <p style={{ fontSize: '0.75rem', color: '#06b6d4', marginTop: '2px' }}>Rate: {b.rate}</p>
              <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#e2e8f0', marginTop: '6px' }}>{b.patient ? `Patient: ${b.patient}` : 'Unassigned'}</p>
              
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
                  <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.72rem' }} onClick={() => onDischargeBed(b.id)}>
                    Discharge
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
