import React, { useState } from 'react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import { UserPlus, Edit2, ShieldAlert, Key, Trash2 } from 'lucide-react';

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, email: 'admin@hms.com', firstName: 'System', lastName: 'Admin', role: 'ADMIN', active: true, lastLogin: '10 mins ago' },
    { id: 2, email: 'doctor@hms.com', firstName: 'John', lastName: 'Doe', role: 'DOCTOR', active: true, lastLogin: '1 hr ago' },
    { id: 3, email: 'nurse@hms.com', firstName: 'Mary', lastName: 'Jane', role: 'NURSE', active: true, lastLogin: '3 hrs ago' },
    { id: 4, email: 'lab@hms.com', firstName: 'Alex', lastName: 'Mercer', role: 'LAB_TECHNICIAN', active: true, lastLogin: 'Yesterday' },
    { id: 5, email: 'pharmacy@hms.com', firstName: 'Bruce', lastName: 'Wayne', role: 'PHARMACIST', active: true, lastLogin: '2 days ago' },
    { id: 6, email: 'billing@hms.com', firstName: 'Clark', lastName: 'Kent', role: 'BILLING_STAFF', active: false, lastLogin: '5 days ago' },
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newUser, setNewUser] = useState({ email: '', firstName: '', lastName: '', role: 'DOCTOR', password: '' });

  const handleCreateUser = (e) => {
    e.preventDefault();
    const created = { id: Date.now(), ...newUser, active: true, lastLogin: 'Just now' };
    setUsers([...users, created]);
    setIsCreateOpen(false);
  };

  const columns = [
    { label: 'User Name', key: 'firstName', render: u => <strong>{u.firstName} {u.lastName}</strong> },
    { label: 'Email', key: 'email' },
    { label: 'Role', key: 'role', render: u => <span className="badge badge-info">{u.role}</span> },
    { label: 'Status', key: 'active', render: u => <span className={`badge ${u.active ? 'badge-success' : 'badge-danger'}`}>{u.active ? 'ACTIVE' : 'DEACTIVATED'}</span> },
    { label: 'Last Login', key: 'lastLogin' },
    {
      label: 'Actions', key: 'actions', render: u => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="btn btn-secondary" style={{ padding: '4px 8px' }} onClick={() => alert(`Reset password sent to ${u.email}`)}><Key size={14} /></button>
          <button className="btn btn-secondary" style={{ padding: '4px 8px' }} onClick={() => {
            setUsers(users.map(user => user.id === u.id ? { ...user, active: !user.active } : user));
          }}><ShieldAlert size={14} color={u.active ? '#ef4444' : '#10b981'} /></button>
        </div>
      )
    }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>User Directory & Role Administration</h1>
        <p style={{ color: '#94a3b8' }}>Create hospital staff accounts, manage credentials & permissions</p>
      </div>

      <div className="glass-card">
        <DataTable
          columns={columns}
          data={users}
          actions={
            <button className="btn btn-primary" onClick={() => setIsCreateOpen(true)}>
              <UserPlus size={16} /> Create New User Account
            </button>
          }
        />
      </div>

      <Modal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Create Hospital Staff Account">
        <form onSubmit={handleCreateUser}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <label>First Name</label>
              <input required value={newUser.firstName} onChange={e => setNewUser({ ...newUser, firstName: e.target.value })} />
            </div>
            <div>
              <label>Last Name</label>
              <input required value={newUser.lastName} onChange={e => setNewUser({ ...newUser, lastName: e.target.value })} />
            </div>
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label>Email Address</label>
            <input type="email" required value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label>Staff Role</label>
            <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
              <option value="ADMIN">ADMIN</option>
              <option value="DOCTOR">DOCTOR</option>
              <option value="NURSE">NURSE</option>
              <option value="LAB_TECHNICIAN">LAB TECHNICIAN</option>
              <option value="PHARMACIST">PHARMACIST</option>
              <option value="BILLING_STAFF">BILLING STAFF</option>
              <option value="PATIENT">PATIENT</option>
            </select>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Temporary Password</label>
            <input type="password" required value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Create Account
          </button>
        </form>
      </Modal>
    </div>
  );
}
