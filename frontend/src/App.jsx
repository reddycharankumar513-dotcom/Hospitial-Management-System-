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

  // 1. Shared Doctors State Across All Components
  const [doctors, setDoctors] = useState([
    { id: 1, docNum: 'DOC-2001', name: 'Dr. John Doe', spec: 'Interventional Cardiology', dept: 'Cardiology', qual: 'MD, FACC', exp: '15 yrs', fee: '$150.00', status: 'AVAILABLE', phone: '9876543001' },
    { id: 2, docNum: 'DOC-2002', name: 'Dr. Robert Chen', spec: 'Electrophysiology', dept: 'Cardiology', qual: 'MD, FESC', exp: '12 yrs', fee: '$160.00', status: 'AVAILABLE', phone: '9876543002' },
    { id: 3, docNum: 'DOC-2003', name: 'Dr. Emily Watson', spec: 'Pediatric Cardiology', dept: 'Cardiology', qual: 'MD, DCH', exp: '10 yrs', fee: '$140.00', status: 'AVAILABLE', phone: '9876543003' },
    { id: 4, docNum: 'DOC-2004', name: 'Dr. Alan Grant', spec: 'Clinical Neurology', dept: 'Neurology', qual: 'MD, DM Neurology', exp: '18 yrs', fee: '$180.00', status: 'AVAILABLE', phone: '9876543004' },
    { id: 5, docNum: 'DOC-2005', name: 'Dr. Sophia Martinez', spec: 'Stroke & Neuro-Critical Care', dept: 'Neurology', qual: 'MD, FINR', exp: '14 yrs', fee: '$175.00', status: 'AVAILABLE', phone: '9876543005' },
    { id: 6, docNum: 'DOC-2006', name: 'Dr. Marcus Vance', spec: 'Trauma & Joint Replacement', dept: 'Orthopedics', qual: 'MS Ortho', exp: '16 yrs', fee: '$150.00', status: 'AVAILABLE', phone: '9876543006' },
    { id: 7, docNum: 'DOC-2007', name: 'Dr. Olivia Taylor', spec: 'Sports Medicine', dept: 'Orthopedics', qual: 'MS Ortho', exp: '9 yrs', fee: '$135.00', status: 'AVAILABLE', phone: '9876543007' },
    { id: 8, docNum: 'DOC-2008', name: 'Dr. David Miller', spec: 'General Pediatrics', dept: 'Pediatrics', qual: 'MD Pediatrics', exp: '11 yrs', fee: '$120.00', status: 'AVAILABLE', phone: '9876543008' },
    { id: 9, docNum: 'DOC-2009', name: 'Dr. Sarah Connor', spec: 'Internal Medicine', dept: 'General Medicine', qual: 'MBBS, MD', exp: '14 yrs', fee: '$100.00', status: 'AVAILABLE', phone: '9876543009' }
  ]);

  // 2. Shared Appointments State
  const [appointments, setAppointments] = useState([
    { id: 1, apptNum: 'APT-1001', patient: 'Peter Parker', doctor: 'Dr. John Doe (Interventional Cardiology)', date: '2026-09-01', time: '09:00 AM', status: 'CONFIRMED' },
    { id: 2, apptNum: 'APT-1002', patient: 'Tony Stark', doctor: 'Dr. Sarah Connor (Internal Medicine)', date: '2026-09-01', time: '10:30 AM', status: 'BOOKED' }
  ]);

  // 3. Shared Medicines Inventory State
  const [medicines, setMedicines] = useState([
    { id: 1, code: 'MED-7001', name: 'Amolodipine 5mg', cat: 'Cardiovascular', batch: 'BAT-2026-A1', qty: 100, price: '$15.00', status: 'IN_STOCK' },
    { id: 2, code: 'MED-7002', name: 'Atorvastatin 20mg', cat: 'Cardiovascular', batch: 'BAT-2026-A2', qty: 95, price: '$22.00', status: 'IN_STOCK' },
    { id: 3, code: 'MED-7006', name: 'Amoxicillin 500mg', cat: 'Antibiotics', batch: 'BAT-2026-B1', qty: 8, price: '$25.00', status: 'LOW_STOCK' },
    { id: 4, code: 'MED-7010', name: 'Paracetamol 500mg', cat: 'Analgesics', batch: 'BAT-2026-C1', qty: 300, price: '$5.00', status: 'IN_STOCK' }
  ]);

  // 4. Shared Ward Beds State
  const [beds, setBeds] = useState([
    { id: 1, num: 'ICU-01', ward: 'Cardiac ICU', type: 'ICU', rate: '$1,500/day', status: 'OCCUPIED', patient: 'Peter Parker' },
    { id: 2, num: 'ICU-02', ward: 'Cardiac ICU', type: 'ICU', rate: '$1,500/day', status: 'AVAILABLE', patient: null },
    { id: 3, num: 'GEN-101', ward: 'General Ward A', type: 'GENERAL', rate: '$400/day', status: 'OCCUPIED', patient: 'Tony Stark' },
    { id: 4, num: 'GEN-102', ward: 'General Ward A', type: 'GENERAL', rate: '$400/day', status: 'AVAILABLE', patient: null }
  ]);

  // State Handlers
  const handleAddDoctor = (doc) => {
    setDoctors(prev => [...prev, doc]);
  };

  const handleAddAppointment = (appt) => {
    setAppointments(prev => [...prev, appt]);
  };

  const handleDispenseMedicine = (medName, qty) => {
    setMedicines(prev => prev.map(m => {
      if (m.name.toLowerCase().includes(medName.toLowerCase())) {
        const nextQty = Math.max(0, m.qty - qty);
        return { ...m, qty: nextQty, status: nextQty < 15 ? 'LOW_STOCK' : 'IN_STOCK' };
      }
      return m;
    }));
  };

  const handleAdmitBed = (bedId, patientName) => {
    setBeds(prev => prev.map(b => b.id === bedId ? { ...b, status: 'OCCUPIED', patient: patientName } : b));
  };

  const handleDischargeBed = (bedId) => {
    setBeds(prev => prev.map(b => b.id === bedId ? { ...b, status: 'AVAILABLE', patient: null } : b));
  };

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
          <strong style={{ fontSize: '0.8rem', color: '#06b6d4', letterSpacing: '0.5px' }}>DYNAMIC HMS WORKSPACE ({doctors.length} DOCTORS):</strong>
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
        <Route path="/patient-portal" element={<div style={{ padding: '24px 40px' }}><PatientPortal doctors={doctors} appointments={appointments} onAddAppointment={handleAddAppointment} /></div>} />
        <Route path="/doctor-portal" element={<div style={{ padding: '24px 40px' }}><DoctorPortal /></div>} />
        <Route path="/lab-portal" element={<div style={{ padding: '24px 40px' }}><LabPortal /></div>} />
        <Route path="/pharmacy-portal" element={<div style={{ padding: '24px 40px' }}><PharmacyPortal medicines={medicines} onDispenseMedicine={handleDispenseMedicine} /></div>} />
        <Route path="/billing-portal" element={<div style={{ padding: '24px 40px' }}><BillingPortal /></div>} />
        <Route path="/bed-portal" element={<div style={{ padding: '24px 40px' }}><BedPortal beds={beds} onAdmitBed={handleAdmitBed} onDischargeBed={handleDischargeBed} /></div>} />

        {/* Admin Operations Center Routes */}
        <Route path="/admin/*" element={
          <AdminLayout theme={theme} toggleTheme={toggleTheme}>
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="roles" element={<RoleManagement />} />
              <Route path="patients" element={<PatientManagement />} />
              <Route path="doctors" element={<DoctorManagement doctors={doctors} onAddDoctor={handleAddDoctor} />} />
              <Route path="appointments" element={<AppointmentManagement doctors={doctors} appointments={appointments} onAddAppointment={handleAddAppointment} />} />
              <Route path="beds" element={<BedManagement beds={beds} onAdmitBed={handleAdmitBed} onDischargeBed={handleDischargeBed} />} />
              <Route path="laboratory" element={<LabManagement />} />
              <Route path="pharmacy" element={<PharmacyManagement medicines={medicines} onDispenseMedicine={handleDispenseMedicine} />} />
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
