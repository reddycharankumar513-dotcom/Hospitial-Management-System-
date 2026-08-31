import React, { useState } from 'react';
import { Pill, CheckCircle, AlertTriangle } from 'lucide-react';

export default function PharmacyPortal({ medicines, onDispenseMedicine }) {
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, rxNum: 'RX-5001', patient: 'Peter Parker', doctor: 'Dr. John Doe', med: 'Amolodipine 5mg', qty: 30, status: 'PENDING' }
  ]);

  const handleDispense = (id, medName, qty) => {
    setPrescriptions(prescriptions.map(p => p.id === id ? { ...p, status: 'DISPENSED' } : p));
    onDispenseMedicine(medName, qty);
    alert(`Medicine ${medName} Dispensed! Stock automatically reduced by ${qty} units. Dispatched MedicineDispensed Kafka Event -> Billing.`);
  };

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(6,182,212,0.15))' }}>
        <h2>Pharmacist Dispensing Portal ({medicines.length} Medicine Batches in Live Catalog)</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Live shared state with Pharmacy Inventory & atomic stock deduction</p>
      </div>

      <div className="glass-card" style={{ marginBottom: '24px' }}>
        <h3>Incoming Prescriptions Queue</h3>
        <table>
          <thead>
            <tr><th>Rx #</th><th>Patient</th><th>Doctor</th><th>Prescribed Medicine</th><th>Qty</th><th>Live Catalog Stock</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {prescriptions.map(p => {
              const catalogItem = medicines.find(m => m.name.toLowerCase().includes(p.med.toLowerCase())) || medicines[0];
              return (
                <tr key={p.id}>
                  <td><span className="badge badge-info">{p.rxNum}</span></td>
                  <td><strong>{p.patient}</strong></td>
                  <td>{p.doctor}</td>
                  <td>{p.med}</td>
                  <td>{p.qty} tabs</td>
                  <td><strong style={{ color: catalogItem?.qty < 15 ? '#ef4444' : '#34d399' }}>{catalogItem?.qty || 100} units available</strong></td>
                  <td><span className={`badge ${p.status === 'DISPENSED' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span></td>
                  <td>
                    {p.status === 'PENDING' && (
                      <button className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => handleDispense(p.id, p.med, p.qty)}>
                        Dispense & Deduct Stock
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="glass-card">
        <h3>Live Shared Pharmacy Catalog ({medicines.length} Medicines)</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginTop: '14px' }}>
          {medicines.map(m => (
            <div key={m.id} style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <strong>{m.name}</strong>
              <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '2px' }}>{m.cat} | Batch: {m.batch}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                <span className={`badge ${m.qty < 15 ? 'badge-danger' : 'badge-success'}`}>{m.qty} units</span>
                <span style={{ fontSize: '0.85rem', color: '#06b6d4', fontWeight: 'bold' }}>{m.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
