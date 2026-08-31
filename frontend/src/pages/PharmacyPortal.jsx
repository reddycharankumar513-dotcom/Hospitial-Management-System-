import React, { useState } from 'react';
import { Pill, CheckCircle, AlertTriangle } from 'lucide-react';

export default function PharmacyPortal() {
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, rxNum: 'RX-5001', patient: 'Peter Parker', doctor: 'Dr. John Doe', med: 'Amolodipine 5mg', qty: 30, stock: 100, expiry: '2027-12-31', status: 'PENDING' }
  ]);

  const handleDispense = (id) => {
    setPrescriptions(prescriptions.map(p => p.id === id ? { ...p, status: 'DISPENSED', stock: p.stock - p.qty } : p));
    alert("Medicine Dispensed! Stock atomically reduced by 30 units. Dispatched MedicineDispensed Kafka Event -> Billing Service.");
  };

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(6,182,212,0.15))' }}>
        <h2>Pharmacy Inventory & Dispensing Portal</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Prescription processing, atomic stock deduction & expiry validation</p>
      </div>

      <div className="glass-card">
        <h3>Incoming Prescription Queue</h3>
        <table>
          <thead>
            <tr><th>Rx #</th><th>Patient</th><th>Doctor</th><th>Medicine</th><th>Prescribed Qty</th><th>Available Stock</th><th>Expiry Date</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {prescriptions.map(p => (
              <tr key={p.id}>
                <td><span className="badge badge-info">{p.rxNum}</span></td>
                <td><strong>{p.patient}</strong></td>
                <td>{p.doctor}</td>
                <td>{p.med}</td>
                <td>{p.qty} tabs</td>
                <td><span style={{ color: '#34d399', fontWeight: 600 }}>{p.stock} units</span></td>
                <td>{p.expiry}</td>
                <td><span className={`badge ${p.status === 'DISPENSED' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span></td>
                <td>
                  {p.status === 'PENDING' && (
                    <button className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => handleDispense(p.id)}>
                      Dispense Medicine
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
