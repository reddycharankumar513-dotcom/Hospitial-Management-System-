import React, { useState } from 'react';
import { TestTube, CheckCircle, Upload, ArrowRight } from 'lucide-react';

export default function LabPortal() {
  const [orders, setOrders] = useState([
    { id: 1, orderNum: 'LAB-8001', patient: 'Peter Parker', doctor: 'Dr. John Doe', test: 'Complete Blood Count (CBC)', status: 'ORDERED', result: '' }
  ]);

  const [activeOrder, setActiveOrder] = useState(orders[0]);
  const [resultInput, setResultInput] = useState('Hemoglobin: 14.5 g/dL, WBC: 7,200 /mcL (Normal)');

  const handleUpdateStatus = (status) => {
    setOrders(orders.map(o => o.id === activeOrder.id ? { ...o, status, result: resultInput } : o));
    if (status === 'COMPLETED') {
      alert("Lab Result Published! Dispatched LabResultAvailable Kafka Event -> Notified Doctor & Patient.");
    }
  };

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, rgba(245,158,11,0.1), rgba(6,182,212,0.15))' }}>
        <h2>Laboratory Technician Workspace</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Sample collection, result verification & Kafka event publishing</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
        <div className="glass-card">
          <h3>Pending Test Orders</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            {orders.map(o => (
              <div key={o.id} onClick={() => setActiveOrder(o)} style={{ padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{o.orderNum}</strong>
                  <span className="badge badge-warning">{o.status}</span>
                </div>
                <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>{o.patient}</p>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{o.test}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card">
          <h3>Order Details & Result Entry: {activeOrder.orderNum}</h3>
          <div style={{ margin: '16px 0', padding: '14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
            <p>Patient: <strong>{activeOrder.patient}</strong> | Ordering Doctor: <strong>{activeOrder.doctor}</strong></p>
            <p style={{ color: '#06b6d4', marginTop: '4px' }}>Test: <strong>{activeOrder.test}</strong></p>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label>Test Result Findings</label>
            <textarea rows={3} value={resultInput} onChange={e => setResultInput(e.target.value)} />
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn btn-secondary" onClick={() => handleUpdateStatus('SAMPLE_COLLECTED')}>Mark Sample Collected</button>
            <button className="btn btn-secondary" onClick={() => handleUpdateStatus('PROCESSING')}>Mark Processing</button>
            <button className="btn btn-primary" onClick={() => handleUpdateStatus('COMPLETED')}><CheckCircle size={16} /> Publish Result (Kafka Event)</button>
          </div>
        </div>
      </div>
    </div>
  );
}
