import React from 'react';
import DataTable from '../../components/common/DataTable';

export default function AuditLogsPage() {
  const logs = [
    { id: 1, time: '2026-08-31 09:30:12', user: 'admin@hms.com', role: 'ADMIN', action: 'CREATE_USER', resource: 'Users', ip: '127.0.0.1', result: 'SUCCESS' },
    { id: 2, time: '2026-08-31 08:45:00', user: 'doctor@hms.com', role: 'DOCTOR', action: 'CREATE_RECORD', resource: 'MedicalRecords', ip: '127.0.0.1', result: 'SUCCESS' },
    { id: 3, time: '2026-08-31 08:15:22', user: 'pharmacy@hms.com', role: 'PHARMACIST', action: 'DISPENSE_MEDICINE', resource: 'Pharmacy', ip: '127.0.0.1', result: 'SUCCESS' },
  ];

  const columns = [
    { label: 'Timestamp', key: 'time' },
    { label: 'Username', key: 'user', render: l => <strong>{l.user}</strong> },
    { label: 'Role', key: 'role', render: l => <span className="badge badge-info">{l.role}</span> },
    { label: 'Action', key: 'action' },
    { label: 'Resource', key: 'resource' },
    { label: 'Result', key: 'result', render: l => <span className="badge badge-success">{l.result}</span> }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Security Audit Trail Logs</h1>
        <p style={{ color: '#94a3b8' }}>Immutable telemetric logging for enterprise compliance</p>
      </div>

      <div className="glass-card">
        <DataTable columns={columns} data={logs} searchPlaceholder="Search audit logs..." />
      </div>
    </div>
  );
}
