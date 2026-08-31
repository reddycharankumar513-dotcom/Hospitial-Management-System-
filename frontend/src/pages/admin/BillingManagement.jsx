import React from 'react';
import DataTable from '../../components/common/DataTable';

export default function BillingManagement() {
  const bills = [
    { id: 1, inv: 'INV-9001', patient: 'Peter Parker', total: '$150.00', net: '$165.00', paid: '$0.00', status: 'GENERATED' }
  ];

  const columns = [
    { label: 'Invoice #', key: 'inv', render: b => <span className="badge badge-info">{b.inv}</span> },
    { label: 'Patient Name', key: 'patient' },
    { label: 'Total Amount', key: 'total' },
    { label: 'Net Payable', key: 'net' },
    { label: 'Paid', key: 'paid' },
    { label: 'Status', key: 'status', render: b => <span className="badge badge-warning">{b.status}</span> }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Billing Invoices & Revenue Settlement</h1>
        <p style={{ color: '#94a3b8' }}>Multi-channel payment recording & transaction logs</p>
      </div>

      <div className="glass-card">
        <DataTable columns={columns} data={bills} />
      </div>
    </div>
  );
}
