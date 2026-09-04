import React, { useState } from 'react';

export default function LabPortal() {
  const [labOrders, setLabOrders] = useState([
    { id: 1, reqId: 'LAB-501', patient: 'Peter Parker', doctor: 'Dr. Ravi Kumar', test: 'Complete Blood Count (CBC)', status: 'ORDERED', result: '' },
    { id: 2, reqId: 'LAB-502', patient: 'Tony Stark', doctor: 'Dr. Priya Sharma', test: 'Lipid Profile', status: 'SAMPLE_COLLECTED', result: '' }
  ]);

  const [activeOrder, setActiveOrder] = useState(labOrders[0]);
  const [resultInput, setResultInput] = useState('Hemoglobin: 14.5 g/dL, WBC: 7,200 /mcL');

  const handleUpdateStatus = (id, newStatus) => {
    setLabOrders(labOrders.map(o => o.id === id ? { ...o, status: newStatus } : o));
    if (activeOrder.id === id) {
      setActiveOrder({ ...activeOrder, status: newStatus });
    }
  };

  const handlePublishResult = (e) => {
    e.preventDefault();
    setLabOrders(labOrders.map(o => o.id === activeOrder.id ? { ...o, status: 'VERIFIED', result: resultInput } : o));
    setActiveOrder({ ...activeOrder, status: 'VERIFIED', result: resultInput });
    alert(`Lab Test Result published for ${activeOrder.patient}. Kafka event dispatched to Notification & Medical Record Service.`);
  };

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '20px' }}>
        <h2>Laboratory Orders & Processing Portal</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>Logged in as: Alex Mercer (Laboratory Technician)</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="glass-card">
          <h3>Pending Laboratory Orders</h3>
          <table>
            <thead>
              <tr><th>Order #</th><th>Patient</th><th>Test Requested</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {labOrders.map(o => (
                <tr key={o.id} onClick={() => setActiveOrder(o)} style={{ cursor: 'pointer', background: activeOrder.id === o.id ? 'rgba(37, 99, 235, 0.1)' : 'transparent' }}>
                  <td><span className="badge badge-info">{o.reqId}</span></td>
                  <td><strong>{o.patient}</strong></td>
                  <td>{o.test}</td>
                  <td><span className={`badge ${o.status === 'VERIFIED' ? 'badge-success' : 'badge-warning'}`}>{o.status}</span></td>
                  <td>
                    <button className="btn btn-secondary" style={{ padding: '2px 8px', fontSize: '0.75rem' }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-card">
          <h3>Test Processing & Result Entry</h3>
          <div style={{ padding: '12px', background: 'var(--bg-primary)', borderRadius: '6px', marginBottom: '16px', border: '1px solid var(--border-color)' }}>
            <strong>{activeOrder.test}</strong> ({activeOrder.reqId})
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '2px' }}>Patient: {activeOrder.patient} | Requested by: {activeOrder.doctor}</p>
            <span className={`badge ${activeOrder.status === 'VERIFIED' ? 'badge-success' : 'badge-warning'}`} style={{ marginTop: '6px' }}>{activeOrder.status}</span>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <button className="btn btn-secondary" onClick={() => handleUpdateStatus(activeOrder.id, 'SAMPLE_COLLECTED')}>
              Mark Sample Collected
            </button>
            <button className="btn btn-secondary" onClick={() => handleUpdateStatus(activeOrder.id, 'PROCESSING')}>
              Mark Processing
            </button>
          </div>

          <form onSubmit={handlePublishResult}>
            <div style={{ marginBottom: '16px' }}>
              <label>Enter Test Findings / Numerical Results</label>
              <textarea rows={3} value={resultInput} onChange={e => setResultInput(e.target.value)} />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Verify & Publish Lab Report (Kafka Event)
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
