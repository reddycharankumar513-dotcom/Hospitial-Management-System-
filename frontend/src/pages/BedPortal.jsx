import React, { useState } from 'react';

export default function BedPortal() {
  const [beds, setBeds] = useState([
    { id: 1, code: 'ICU-01', ward: 'ICU', status: 'OCCUPIED', patient: 'Tony Stark' },
    { id: 2, code: 'ICU-02', ward: 'ICU', status: 'AVAILABLE', patient: '-' },
    { id: 3, code: 'WARD-A01', ward: 'General Ward A', status: 'AVAILABLE', patient: '-' },
    { id: 4, code: 'WARD-A02', ward: 'General Ward A', status: 'OCCUPIED', patient: 'Bruce Wayne' },
    { id: 5, code: 'PRIV-101', ward: 'Private Wing', status: 'AVAILABLE', patient: '-' }
  ]);

  const [admitPatientName, setAdmitPatientName] = useState('Peter Parker');

  const handleAdmit = (bedId) => {
    setBeds(beds.map(b => b.id === bedId ? { ...b, status: 'OCCUPIED', patient: admitPatientName } : b));
    alert(`Admitted ${admitPatientName} to bed.`);
  };

  const handleDischarge = (bedId) => {
    setBeds(beds.map(b => b.id === bedId ? { ...b, status: 'AVAILABLE', patient: '-' } : b));
    alert(`Patient discharged from bed.`);
  };

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '20px' }}>
        <h2>Ward Bed Management Portal</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>Logged in as: Elena Rostova (Ward Bed Manager)</p>
      </div>

      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h3>Hospital Bed Grid Map</h3>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <label style={{ fontSize: '0.8rem' }}>Admit Patient:</label>
            <input value={admitPatientName} onChange={e => setAdmitPatientName(e.target.value)} style={{ width: '160px', marginTop: 0, padding: '4px 8px', fontSize: '0.8rem' }} />
          </div>
        </div>

        <div className="grid-cols-4">
          {beds.map(bed => (
            <div key={bed.id} style={{ padding: '14px', borderRadius: '8px', background: 'var(--bg-surface)', border: bed.status === 'OCCUPIED' ? '1px solid #dc2626' : '1px solid #16a34a' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <strong>{bed.code}</strong>
                <span className={`badge ${bed.status === 'OCCUPIED' ? 'badge-danger' : 'badge-success'}`}>{bed.status}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Ward: {bed.ward}</p>
              <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Occupant: <strong>{bed.patient}</strong></p>

              <div style={{ marginTop: '10px' }}>
                {bed.status === 'AVAILABLE' ? (
                  <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '4px', fontSize: '0.75rem' }} onClick={() => handleAdmit(bed.id)}>
                    Admit Patient
                  </button>
                ) : (
                  <button className="btn btn-danger" style={{ width: '100%', justifyContent: 'center', padding: '4px', fontSize: '0.75rem' }} onClick={() => handleDischarge(bed.id)}>
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
