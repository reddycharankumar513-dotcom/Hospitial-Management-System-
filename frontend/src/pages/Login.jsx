import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/common/Modal';

export default function Login({ onLoginSuccess }) {
  const [activeRole, setActiveRole] = useState('ADMIN');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Sign In Form State
  const [email, setEmail] = useState('admin@hms.com');
  const [password, setPassword] = useState('password123');
  const [errorMsg, setErrorMsg] = useState('');

  // Register Form State
  const [regData, setRegData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '1998-05-15',
    gender: 'Male',
    password: ''
  });
  const [regSuccessMsg, setRegSuccessMsg] = useState('');

  // Forgot Password State
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  const navigate = useNavigate();

  const roleConfigs = [
    { id: 'ADMIN', title: 'Administrator', defaultEmail: 'admin@hms.com', name: 'System Administrator', path: '/admin/dashboard' },
    { id: 'DOCTOR', title: 'Doctor / Physician', defaultEmail: 'doctor@hms.com', name: 'Dr. Ravi Kumar', path: '/doctor-portal' },
    { id: 'PATIENT', title: 'Patient Account', defaultEmail: 'patient@hms.com', name: 'Peter Parker', path: '/patient-portal' },
    { id: 'LAB_TECHNICIAN', title: 'Lab Technician', defaultEmail: 'lab@hms.com', name: 'Alex Mercer', path: '/lab-portal' },
    { id: 'PHARMACIST', title: 'Pharmacist', defaultEmail: 'pharmacy@hms.com', name: 'Sarah Jenkins', path: '/pharmacy-portal' },
    { id: 'BILLING_STAFF', title: 'Billing Staff', defaultEmail: 'billing@hms.com', name: 'Robert Vance', path: '/billing-portal' },
    { id: 'BED_MANAGER', title: 'Bed Manager', defaultEmail: 'bed@hms.com', name: 'Elena Rostova', path: '/bed-portal' }
  ];

  const handleRoleTabClick = (roleId) => {
    setActiveRole(roleId);
    setIsRegisterMode(false);
    const matched = roleConfigs.find(r => r.id === roleId);
    if (matched) {
      setEmail(matched.defaultEmail);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email) {
      setErrorMsg('Please enter your email or username.');
      return;
    }

    const matched = roleConfigs.find(r => r.id === activeRole) || roleConfigs[0];
    const userData = {
      token: `jwt-${activeRole.toLowerCase()}-token-${Date.now()}`,
      role: activeRole,
      name: matched.name,
      email: email
    };

    localStorage.setItem('userToken', userData.token);
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('userName', userData.name);

    if (onLoginSuccess) {
      onLoginSuccess(userData);
    }

    navigate(matched.path);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegSuccessMsg(`Patient Account registered for ${regData.fullName}! You can now sign in.`);
    setEmail(regData.email);
    setTimeout(() => {
      setIsRegisterMode(false);
      setActiveRole('PATIENT');
    }, 1000);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSuccess('A password reset token has been sent to your email.');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Clean Top Navigation Bar */}
      <header style={{
        background: 'var(--bg-surface)',
        borderBottom: '1px solid var(--border-color)',
        padding: '14px 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#f8fafc' }}>
            Hospital Management System
          </h1>
          <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Enterprise Medical & Clinical Operations Portal</p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`btn ${!isRegisterMode ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setIsRegisterMode(false)}
            style={{ fontSize: '0.8rem' }}
          >
            Sign In
          </button>
          <button
            className={`btn ${isRegisterMode ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setIsRegisterMode(true); setActiveRole('PATIENT'); }}
            style={{ fontSize: '0.8rem' }}
          >
            New Patient Registration
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div style={{ flex: 1, padding: '36px 20px', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        {!isRegisterMode ? (
          /* Sign In Card */
          <div className="glass-card">
            <h2 style={{ fontSize: '1.3rem', marginBottom: '6px' }}>Hospital Staff & Patient Sign In</h2>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '20px' }}>
              Select your role tab below and click Sign In to enter your portal.
            </p>

            {/* Role Selection Tabs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px' }}>
              {roleConfigs.map(role => (
                <button
                  key={role.id}
                  type="button"
                  className="btn"
                  onClick={() => handleRoleTabClick(role.id)}
                  style={{
                    fontSize: '0.78rem',
                    padding: '6px 12px',
                    background: activeRole === role.id ? 'var(--color-primary)' : 'var(--bg-primary)',
                    color: activeRole === role.id ? '#ffffff' : '#94a3b8',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  {role.title}
                </button>
              ))}
            </div>

            {errorMsg && (
              <div style={{ padding: '10px', borderRadius: '6px', background: 'rgba(220, 38, 38, 0.15)', border: '1px solid rgba(220, 38, 38, 0.3)', color: '#f87171', marginBottom: '16px', fontSize: '0.82rem' }}>
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLoginSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label>Selected Portal Role</label>
                <input disabled value={roleConfigs.find(r => r.id === activeRole)?.title || activeRole} style={{ background: 'rgba(255,255,255,0.03)', color: '#94a3b8' }} />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label>Email Address or Username</label>
                <input
                  type="text"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label>Password</label>
                  <button type="button" onClick={() => setShowForgotModal(true)} style={{ background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.78rem', cursor: 'pointer' }}>
                    Forgot password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '0.9rem' }}>
                Sign In to {roleConfigs.find(r => r.id === activeRole)?.title} Workspace
              </button>
            </form>
          </div>
        ) : (
          /* Patient Registration Card */
          <div className="glass-card">
            <h2 style={{ fontSize: '1.3rem', marginBottom: '6px' }}>New Patient Registration</h2>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '20px' }}>
              Create your patient account to book appointments and view medical records.
            </p>

            {regSuccessMsg && (
              <div style={{ padding: '10px', borderRadius: '6px', background: 'rgba(22, 163, 74, 0.15)', border: '1px solid #16a34a', color: '#4ade80', marginBottom: '16px', fontSize: '0.82rem' }}>
                {regSuccessMsg}
              </div>
            )}

            <form onSubmit={handlePatientRegisterSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label>Full Patient Name</label>
                <input required placeholder="Peter Parker" value={regData.fullName} onChange={e => setRegData({ ...regData, fullName: e.target.value })} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label>Email Address</label>
                  <input type="email" required placeholder="patient@hms.com" value={regData.email} onChange={e => setRegData({ ...regData, email: e.target.value })} />
                </div>
                <div>
                  <label>Contact Phone</label>
                  <input required placeholder="+1 555-0199" value={regData.phone} onChange={e => setRegData({ ...regData, phone: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label>Date of Birth</label>
                  <input type="date" value={regData.dob} onChange={e => setRegData({ ...regData, dob: e.target.value })} />
                </div>
                <div>
                  <label>Gender</label>
                  <select value={regData.gender} onChange={e => setRegData({ ...regData, gender: e.target.value })}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label>Create Password</label>
                <input type="password" required placeholder="••••••••" value={regData.password} onChange={e => setRegData({ ...regData, password: e.target.value })} />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '10px' }}>
                Register Account & Sign In
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Forgot Password Modal */}
      <Modal isOpen={showForgotModal} onClose={() => { setShowForgotModal(false); setForgotSuccess(''); }} title="Reset Password">
        {forgotSuccess ? (
          <div style={{ padding: '12px', color: '#4ade80', fontSize: '0.85rem' }}>{forgotSuccess}</div>
        ) : (
          <form onSubmit={handleForgotSubmit}>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '14px' }}>
              Enter your registered email address to receive password reset instructions.
            </p>
            <div style={{ marginBottom: '16px' }}>
              <label>Email Address</label>
              <input type="email" required placeholder="user@hms.com" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Send Reset Link
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
