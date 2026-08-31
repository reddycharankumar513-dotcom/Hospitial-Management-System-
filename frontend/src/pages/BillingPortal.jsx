import React, { useState } from 'react';
import { Receipt, CheckCircle, CreditCard } from 'lucide-react';

export default function BillingPortal() {
  const [bills, setBills] = useState([
    { id: 1, inv: 'INV-9001', patient: 'Peter Parker', consult: '$150.00', lab: '$50.00', rx: '$15.00', total: '$215.00', method: 'UPI', status: 'GENERATED' }
  ]);

  const handleSettle = (id) => {
    setBills(bills.map(b => b.id === id ? { ...b, status: 'PAID' } : b));
    alert("Payment Settled! Generated PaymentCompleted Kafka Event -> Notification Service.");
  };

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(16,185,129,0.15))' }}>
        <h2>Billing & Multi-Channel Payment Settlement</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Automatic invoice generation integrating Consultation + Lab + Pharmacy</p>
      </div>

      <div className="glass-card">
        <h3>Hospital Invoices</h3>
        <table>
          <thead>
            <tr><th>Invoice #</th><th>Patient</th><th>Consultation</th><th>Lab Fee</th><th>Pharmacy Fee</th><th>Net Total</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {bills.map(b => (
              <tr key={b.id}>
                <td><span className="badge badge-info">{b.inv}</span></td>
                <td><strong>{b.patient}</strong></td>
                <td>{b.consult}</td>
                <td>{b.lab}</td>
                <td>{b.rx}</td>
                <td><strong style={{ fontSize: '1.05rem', color: '#06b6d4' }}>{b.total}</strong></td>
                <td><span className={`badge ${b.status === 'PAID' ? 'badge-success' : 'badge-warning'}`}>{b.status}</span></td>
                <td>
                  {b.status === 'GENERATED' && (
                    <button className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => handleSettle(b.id)}>
                      Settle Payment (Kafka Event)
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
