import React, { useState } from 'react';

export default function PharmacyPortal() {
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, rxId: 'RX-701', patient: 'Peter Parker', doctor: 'Dr. Ravi Kumar', med: 'Amolodipine 5mg', dose: '1 tab daily', dur: '30 days', qty: 30, status: 'PENDING' },
    { id: 2, rxId: 'RX-702', patient: 'Tony Stark', doctor: 'Dr. Priya Sharma', med: 'Atorvastatin 10mg', dose: '1 tab at night', dur: '30 days', qty: 30, status: 'DISPENSED' }
  ]);

  const [inventory, setInventory] = useState([
    { id: 1, name: 'Amolodipine 5mg', batch: 'BATCH-2026A', stock: 120, expiry: '2027-12-31', price: '$15.00' },
    { id: 2, name: 'Atorvastatin 10mg', batch: 'BATCH-2026B', stock: 85, expiry: '2027-10-15', price: '$22.00' },
    { id: 3, name: 'Paracetamol 500mg', batch: 'BATCH-2026C', stock: 250, expiry: '2028-05-20', price: '$5.00' }
  ]);

  const handleDispense = (rx) => {
    setPrescriptions(prescriptions.map(p => p.id === rx.id ? { ...p, status: 'DISPENSED' } : p));
    setInventory(inventory.map(i => i.name.toLowerCase().includes('amolodipine') ? { ...i, stock: i.stock - rx.qty } : i));
    alert(`Dispensed ${rx.med} for ${rx.patient}. Stock updated automatically.`);
  };

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '20px' }}>
        <h2>Hospital Pharmacy Portal</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>Logged in as: Sarah Jenkins (Pharmacist)</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div className="glass-card">
          <h3>Prescriptions Queue</h3>
          <table>
            <thead>
              <tr><th>Rx #</th><th>Patient</th><th>Medicine</th><th>Qty</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {prescriptions.map(p => (
                <tr key={p.id}>
                  <td><span className="badge badge-info">{p.rxId}</span></td>
                  <td><strong>{p.patient}</strong></td>
                  <td>{p.med}</td>
                  <td>{p.qty}</td>
                  <td><span className={`badge ${p.status === 'DISPENSED' ? 'badge-success' : 'badge-warning'}`}>{p.status}</span></td>
                  <td>
                    {p.status === 'PENDING' && (
                      <button className="btn btn-primary" style={{ padding: '2px 8px', fontSize: '0.75rem' }} onClick={() => handleDispense(p)}>
                        Dispense
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-card">
          <h3>Medicine Catalog & Inventory Stock</h3>
          <table>
            <thead>
              <tr><th>Medicine Name</th><th>Batch #</th><th>In Stock</th><th>Expiry</th><th>Price</th></tr>
            </thead>
            <tbody>
              {inventory.map(item => (
                <tr key={item.id}>
                  <td><strong>{item.name}</strong></td>
                  <td>{item.batch}</td>
                  <td><span className={`badge ${item.stock > 30 ? 'badge-success' : 'badge-danger'}`}>{item.stock} units</span></td>
                  <td>{item.expiry}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
