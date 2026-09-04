import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UserManagement from './admin/UserManagement';
import PatientManagement from './admin/PatientManagement';
import DoctorManagement from './admin/DoctorManagement';
import AppointmentManagement from './admin/AppointmentManagement';
import BedManagement from './admin/BedManagement';
import LabManagement from './admin/LabManagement';
import PharmacyManagement from './admin/PharmacyManagement';
import BillingManagement from './admin/BillingManagement';
import AuditLogsPage from './admin/AuditLogsPage';

export default function AdminDashboard() {
  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '20px' }}>
        <h2>Hospital Administrator Operations Center</h2>
        <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>Logged in as: System Administrator</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '14px', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
          <Link to="/admin/dashboard" className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>Overview</Link>
          <Link to="/admin/dashboard/users" className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>Users</Link>
          <Link to="/admin/dashboard/patients" className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>Patients</Link>
          <Link to="/admin/dashboard/doctors" className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>Doctors</Link>
          <Link to="/admin/dashboard/appointments" className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>Appointments</Link>
          <Link to="/admin/dashboard/beds" className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>Beds</Link>
          <Link to="/admin/dashboard/lab" className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>Laboratory</Link>
          <Link to="/admin/dashboard/pharmacy" className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>Pharmacy</Link>
          <Link to="/admin/dashboard/billing" className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>Billing</Link>
          <Link to="/admin/dashboard/audit" className="btn btn-secondary" style={{ fontSize: '0.78rem', padding: '4px 10px' }}>Audit Logs</Link>
        </div>
      </div>

      <Routes>
        <Route path="/" element={
          <div className="grid-cols-4">
            <div className="glass-card">
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>TOTAL PATIENTS</span>
              <h2 style={{ marginTop: '4px' }}>1,248</h2>
            </div>
            <div className="glass-card">
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>ACTIVE DOCTORS</span>
              <h2 style={{ marginTop: '4px' }}>14</h2>
            </div>
            <div className="glass-card">
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>TODAY'S APPOINTMENTS</span>
              <h2 style={{ marginTop: '4px' }}>24</h2>
            </div>
            <div className="glass-card">
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>AVAILABLE BEDS</span>
              <h2 style={{ marginTop: '4px' }}>18 / 24</h2>
            </div>
          </div>
        } />
        <Route path="users" element={<UserManagement />} />
        <Route path="patients" element={<PatientManagement />} />
        <Route path="doctors" element={<DoctorManagement />} />
        <Route path="appointments" element={<AppointmentManagement />} />
        <Route path="beds" element={<BedManagement />} />
        <Route path="lab" element={<LabManagement />} />
        <Route path="pharmacy" element={<PharmacyManagement />} />
        <Route path="billing" element={<BillingManagement />} />
        <Route path="audit" element={<AuditLogsPage />} />
      </Routes>
    </div>
  );
}
