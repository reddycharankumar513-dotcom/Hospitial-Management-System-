import React from 'react';
import DataTable from '../../components/common/DataTable';

export default function PharmacyManagement() {
  const meds = [
    { id: 1, code: 'MED-7001', name: 'Amolodipine 5mg', cat: 'Cardiovascular', qty: 100, price: '$15.00', status: 'IN_STOCK' },
    { id: 2, code: 'MED-7002', name: 'Paracetamol 500mg', cat: 'Analgesics', qty: 250, price: '$5.00', status: 'IN_STOCK' },
    { id: 3, code: 'MED-7003', name: 'Amoxicillin 500mg', cat: 'Antibiotics', qty: 8, price: '$25.00', status: 'LOW_STOCK' },
  ];

  const columns = [
    { label: 'Code', key: 'code', render: m => <span className="badge badge-info">{m.code}</span> },
    { label: 'Medicine Name', key: 'name', render: m => <strong>{m.name}</strong> },
    { label: 'Category', key: 'cat' },
    { label: 'Stock Quantity', key: 'qty', render: m => `${m.qty} units` },
    { label: 'Price', key: 'price' },
    { label: 'Status', key: 'status', render: m => <span className={`badge ${m.status === 'IN_STOCK' ? 'badge-success' : 'badge-danger'}`}>{m.status}</span> }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Pharmacy Inventory & Dispensing</h1>
        <p style={{ color: '#94a3b8' }}>Atomic stock deduction & low-stock notifications</p>
      </div>

      <div className="glass-card">
        <DataTable columns={columns} data={meds} />
      </div>
    </div>
  );
}
