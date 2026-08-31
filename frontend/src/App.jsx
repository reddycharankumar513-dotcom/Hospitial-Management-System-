import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
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

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
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

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
