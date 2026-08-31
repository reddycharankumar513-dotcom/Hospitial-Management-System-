import React from 'react';
import DataTable from '../../components/common/DataTable';

export default function LabManagement() {
  const orders = [
    { id: 1, orderNum: 'LAB-8001', patient: 'Peter Parker', test: 'Complete Blood Count (CBC)', priority: 'URGENT', status: 'ORDERED' }
  ];

  const columns = [
    { label: 'Order #', key: 'orderNum', render: l => <span className="badge badge-info">{l.orderNum}</span> },
    { label: 'Patient Name', key: 'patient' },
    { label: 'Test Name', key: 'test' },
    { label: 'Priority', key: 'priority', render: l => <span className="badge badge-danger">{l.priority}</span> },
    { label: 'Status', key: 'status', render: l => <span className="badge badge-warning">{l.status}</span> }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Laboratory Orders & Kafka Stream Status</h1>
        <p style={{ color: '#94a3b8' }}>Test result entry & notification triggers</p>
      </div>

      <div className="glass-card">
        <DataTable columns={columns} data={orders} />
      </div>
    </div>
  );
}
