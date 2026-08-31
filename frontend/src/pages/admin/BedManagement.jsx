import React, { useState } from 'react';
import { BedDouble, CheckCircle, UserPlus, ArrowRightLeft } from 'lucide-react';

export default function BedManagement() {
  const [beds, setBeds] = useState([
    { id: 1, num: 'ICU-01', ward: 'Intensive Care Unit', type: 'ICU', rate: '$1,500/day', status: 'OCCUPIED', patient: 'Peter Parker' },
    { id: 2, num: 'ICU-02', ward: 'Intensive Care Unit', type: 'ICU', rate: '$1,500/day', status: 'AVAILABLE', patient: null },
    { id: 3, num: 'GEN-101', ward: 'General Ward A', type: 'GENERAL', rate: '$400/day', status: 'OCCUPIED', patient: 'Tony Stark' },
    { id: 4, num: 'GEN-102', ward: 'General Ward A', type: 'GENERAL', rate: '$400/day', status: 'AVAILABLE', patient: null },
    { id: 5, num: 'PVT-301', ward: 'Private Wing', type: 'PRIVATE', rate: '$1,000/day', status: 'RESERVED', patient: null },
    { id: 6, num: 'EMG-01', ward: 'Emergency Ward', type: 'EMERGENCY', rate: '$800/day', status: 'MAINTENANCE', patient: null }
  ]);

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Visual Hospital Bed Occupancy Map</h1>
        <p style={{ color: '#94a3b8' }}>Ward allocation, patient admissions, transfers & discharge</p>
      </div>

      <div className="glass-card">
        <h3>Live Hospital Ward Grid</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '16px' }}>
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
              {b.patient && <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e2e8f0', marginTop: '4px' }}>Patient: {b.patient}</p>}
              <span className={`badge ${b.status === 'AVAILABLE' ? 'badge-success' : 'badge-danger'}`} style={{ marginTop: '10px', display: 'inline-block' }}>
                {b.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
