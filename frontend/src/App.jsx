import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import Login from './pages/Login';
import PatientPortal from './pages/PatientPortal';
import DoctorPortal from './pages/DoctorPortal';
import LabPortal from './pages/LabPortal';
import PharmacyPortal from './pages/PharmacyPortal';
import BillingPortal from './pages/BillingPortal';
import BedPortal from './pages/BedPortal';

import AdminLayout from './components/layout/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/admin/UserManagement';
import RoleManagement from './pages/admin/RoleManagement';
import PatientManagement from './pages/admin/PatientManagement';
import DoctorManagement from './pages/admin/DoctorManagement';
import AppointmentManagement from './pages/admin/AppointmentManagement';
import BedManagement from './pages/admin/BedManagement';
import LabManagement from './pages/admin/LabManagement';
import PharmacyManagement from './pages/admin/PharmacyManagement';
import BillingManagement from './pages/admin/BillingManagement';
import ReportsPage from './pages/admin/ReportsPage';
import AuditLogsPage from './pages/admin/AuditLogsPage';
import SettingsPage from './pages/admin/SettingsPage';
import AdminProfile from './pages/admin/AdminProfile';

export default function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [activeRole, setActiveRole] = useState(localStorage.getItem('role') || 'ADMIN');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const roles = [
    { name: 'ADMIN', path: '/admin/dashboard' },
    { name: 'PATIENT', path: '/patient-portal' },
    { name: 'DOCTOR (360°)', path: '/doctor-portal' },
    { name: 'LAB TECH', path: '/lab-portal' },
    { name: 'PHARMACIST', path: '/pharmacy-portal' },
    { name: 'BILLING', path: '/billing-portal' },
    { name: 'BED MANAGER', path: '/bed-portal' }
  ];

  return (
    <BrowserRouter>
      {/* Top Header Role Switcher Bar */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid var(--border-color)',
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1000,
        position: 'sticky',
        top: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <strong style={{ fontSize: '0.8rem', color: '#06b6d4', letterSpacing: '0.5px' }}>ROLE SWITCHER WORKSPACE:</strong>
          <div style={{ display: 'flex', gap: '6px' }}>
            {roles.map(r => (
              <Link
                key={r.name}
                to={r.path}
                onClick={() => { setActiveRole(r.name); localStorage.setItem('role', r.name); }}
                className="btn"
                style={{
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  borderRadius: '6px',
                  background: activeRole === r.name ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'rgba(255,255,255,0.05)',
                  color: activeRole === r.name ? '#fff' : '#94a3b8',
                  textDecoration: 'none'
                }}
              >
                {r.name}
              </Link>
            ))}
          </div>
        </div>

        <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>ACTIVE: {activeRole}</span>
      </div>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/patient-portal" element={<div style={{ padding: '24px 40px' }}><PatientPortal /></div>} />
        <Route path="/doctor-portal" element={<div style={{ padding: '24px 40px' }}><DoctorPortal /></div>} />
        <Route path="/lab-portal" element={<div style={{ padding: '24px 40px' }}><LabPortal /></div>} />
        <Route path="/pharmacy-portal" element={<div style={{ padding: '24px 40px' }}><PharmacyPortal /></div>} />
        <Route path="/billing-portal" element={<div style={{ padding: '24px 40px' }}><BillingPortal /></div>} />
        <Route path="/bed-portal" element={<div style={{ padding: '24px 40px' }}><BedPortal /></div>} />

        {/* Admin Operations Center Routes */}
        <Route path="/admin/*" element={
          <AdminLayout theme={theme} toggleTheme={toggleTheme}>
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="roles" element={<RoleManagement />} />
              <Route path="patients" element={<PatientManagement />} />
              <Route path="doctors" element={<DoctorManagement />} />
              <Route path="appointments" element={<AppointmentManagement />} />
              <Route path="beds" element={<BedManagement />} />
              <Route path="laboratory" element={<LabManagement />} />
              <Route path="pharmacy" element={<PharmacyManagement />} />
              <Route path="billing" element={<BillingManagement />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="audit-logs" element={<AuditLogsPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="*" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </AdminLayout>
        } />

        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
