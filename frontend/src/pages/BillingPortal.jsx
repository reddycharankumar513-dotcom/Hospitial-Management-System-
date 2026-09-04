import React, { useState } from 'react';

export default function BillingPortal() {
  const [invoices, setInvoices] = useState([
    { id: 1, invNum: 'INV-9001', patient: 'Peter Parker', items: 'Consultation + Lab Test + Medicines', total: '$215.00', status: 'UNPAID', method: '-' },
    { id: 2, invNum: 'INV-9002', patient: 'Tony Stark', items: 'Cardiac Consultation + ECG', total: '$180.00', status: 'PAID', method: 'CREDIT_CARD' }
  ]);

  const [selectedPayMethod, setSelectedPayMethod] = useState('UPI');

  const handleSettlePayment = (id) => {
    setInvoices(invoices.map(inv => inv.id === id ? { ...inv, status: 'PAID', method: selectedPayMethod } : inv));
    alert(`Payment settled via ${selectedPayMethod}. Receipt issued.`);
  };

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '20px' }}>
        <h2>Billing & Invoices Portal</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>Logged in as: Robert Vance (Billing Officer)</p>
      </div>

      <div className="glass-card">
        <h3>Hospital Invoices & Payments</h3>
        <table>
          <thead>
            <tr><th>Invoice #</th><th>Patient</th><th>Billed Items</th><th>Total Amount</th><th>Status</th><th>Payment Method</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id}>
                <td><span className="badge badge-info">{inv.invNum}</span></td>
                <td><strong>{inv.patient}</strong></td>
                <td>{inv.items}</td>
                <td><strong>{inv.total}</strong></td>
                <td><span className={`badge ${inv.status === 'PAID' ? 'badge-success' : 'badge-warning'}`}>{inv.status}</span></td>
                <td>{inv.method}</td>
                <td>
                  {inv.status === 'UNPAID' && (
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <select value={selectedPayMethod} onChange={e => setSelectedPayMethod(e.target.value)} style={{ padding: '2px 6px', fontSize: '0.75rem', width: 'auto', marginTop: 0 }}>
                        <option value="UPI">UPI</option>
                        <option value="CARD">Card</option>
                        <option value="CASH">Cash</option>
                      </select>
                      <button className="btn btn-primary" style={{ padding: '2px 8px', fontSize: '0.75rem' }} onClick={() => handleSettlePayment(inv.id)}>
                        Settle Payment
                      </button>
                    </div>
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
