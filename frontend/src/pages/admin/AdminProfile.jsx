import React from 'react';
import { User, Shield, Mail, Phone, Lock } from 'lucide-react';

export default function AdminProfile() {
  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Administrator Profile</h1>
        <p style={{ color: '#94a3b8' }}>Manage system admin profile & security credentials</p>
      </div>

      <div className="glass-card" style={{ maxWidth: '540px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
            AD
          </div>
          <div>
            <h2>System Admin</h2>
            <span className="badge badge-info">ADMINISTRATOR</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div><span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>EMAIL</span><p><strong>admin@hms.com</strong></p></div>
          <div><span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>PHONE</span><p><strong>1234567890</strong></p></div>
          <div><span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>ACCOUNT STATUS</span><p><span className="badge badge-success">ACTIVE & VERIFIED</span></p></div>
        </div>
      </div>
    </div>
  );
}
