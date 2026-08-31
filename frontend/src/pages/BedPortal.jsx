import React, { useState } from 'react';
import { BedDouble, CheckCircle } from 'lucide-react';

export default function BedPortal() {
  const [beds] = useState([
    { id: 1, num: 'ICU-01', ward: 'ICU', status: 'OCCUPIED', patient: 'Peter Parker' },
    { id: 2, num: 'ICU-02', ward: 'ICU', status: 'AVAILABLE', patient: null },
    { id: 3, num: 'GEN-101', ward: 'General Ward A', status: 'OCCUPIED', patient: 'Tony Stark' },
    { id: 4, num: 'GEN-102', ward: 'General Ward A', status: 'AVAILABLE', patient: null }
  ]);

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '24px' }}>
        <h2>Ward Bed Allocation & Occupancy Portal</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>ICU, General Ward, Private Wing admissions and discharges</p>
      </div>

      <div className="glass-card">
        <h3>Live Hospital Ward Grid</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginTop: '16px' }}>
          {beds.map(b => (
            <div key={b.id} style={{
              padding: '16px',
              borderRadius: '12px',
              background: b.status === 'AVAILABLE' ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
              border: b.status === 'AVAILABLE' ? '1px solid #10b981' : '1px solid #ef4444'
            }}>
              <strong style={{ fontSize: '1.1rem' }}>{b.num} ({b.ward})</strong>
              <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>{b.patient ? `Patient: ${b.patient}` : 'Unassigned'}</p>
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
