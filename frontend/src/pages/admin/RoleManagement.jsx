import React from 'react';
import { Shield, Check, X } from 'lucide-react';

export default function RoleManagement() {
  const roles = ['ADMIN', 'DOCTOR', 'NURSE', 'LAB_TECHNICIAN', 'PHARMACIST', 'BILLING_STAFF', 'PATIENT'];
  const resources = ['Patients', 'Doctors', 'Appointments', 'Medical Records', 'Laboratory', 'Pharmacy', 'Billing', 'Beds', 'Users', 'Reports'];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Role Permission Matrix</h1>
        <p style={{ color: '#94a3b8' }}>Access control rules enforced across microservices APIs</p>
      </div>

      <div className="glass-card">
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>Resource Domain</th>
                {roles.map(r => <th key={r} style={{ textAlign: 'center' }}>{r}</th>)}
              </tr>
            </thead>
            <tbody>
              {resources.map(res => (
                <tr key={res}>
                  <td><strong>{res}</strong></td>
                  {roles.map(r => {
                    const isAdmin = r === 'ADMIN';
                    const hasAccess = isAdmin || (r === 'DOCTOR' && ['Patients', 'Appointments', 'Medical Records', 'Laboratory'].includes(res))
                                               || (r === 'LAB_TECHNICIAN' && res === 'Laboratory')
                                               || (r === 'PHARMACIST' && res === 'Pharmacy')
                                               || (r === 'BILLING_STAFF' && res === 'Billing');
                    return (
                      <td key={r} style={{ textAlign: 'center' }}>
                        {hasAccess ? <Check size={18} color="#10b981" /> : <X size={18} color="#64748b" />}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
