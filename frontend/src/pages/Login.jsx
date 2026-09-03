import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, CheckCircle, ShieldCheck, UserCheck } from 'lucide-react';
import Modal from '../components/common/Modal';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('admin@hms.com');
  const [password, setPassword] = useState('admin123');
  const [role, setRole] = useState('ADMIN');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  const navigate = useNavigate();

  // Instant login helper for any role
  const performLogin = (targetRole, userEmail, userName, targetPath) => {
    const userData = {
      token: `jwt-${targetRole.toLowerCase()}-token-${Date.now()}`,
      role: targetRole,
      name: userName,
      email: userEmail
    };

    localStorage.setItem('userToken', userData.token);
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('userName', userData.name);

    if (onLoginSuccess) {
      onLoginSuccess(userData);
    }

    navigate(targetPath);
  };

  const handleQuickRoleLogin = (selectedRole, defaultEmail, name, path) => {
    performLogin(selectedRole, defaultEmail, name, path);
  };

  const handleLoginSubmit = (e) => {
    if (e) e.preventDefault();
    setErrorMsg('');

    if (!email) {
      setErrorMsg('Please enter your email or username.');
      return;
    }

    let targetRole = role;
    let userName = 'Hospital User';
    let targetPath = '/admin/dashboard';

    const em = email.toLowerCase();

    if (em.includes('admin') || role === 'ADMIN') {
      targetRole = 'ADMIN';
      userName = 'System Administrator';
      targetPath = '/admin/dashboard';
    } else if (em.includes('doctor') || role === 'DOCTOR') {
      targetRole = 'DOCTOR';
      userName = 'Dr. John Doe (Cardiology)';
      targetPath = '/doctor-portal';
    } else if (em.includes('patient') || role === 'PATIENT') {
      targetRole = 'PATIENT';
      userName = 'Peter Parker (PAT-1001)';
      targetPath = '/patient-portal';
    } else if (em.includes('lab') || role === 'LAB_TECHNICIAN') {
      targetRole = 'LAB_TECHNICIAN';
      userName = 'Alex Mercer (Lab Tech)';
      targetPath = '/lab-portal';
    } else if (em.includes('pharmacy') || role === 'PHARMACIST') {
      targetRole = 'PHARMACIST';
      userName = 'Sarah Jenkins (Pharmacist)';
      targetPath = '/pharmacy-portal';
    } else if (em.includes('billing') || role === 'BILLING_STAFF') {
      targetRole = 'BILLING_STAFF';
      userName = 'Robert Vance (Billing Officer)';
      targetPath = '/billing-portal';
    } else if (em.includes('bed') || role === 'BED_MANAGER') {
      targetRole = 'BED_MANAGER';
      userName = 'Elena Rostova (Ward Manager)';
      targetPath = '/bed-portal';
    }

    performLogin(targetRole, email, userName, targetPath);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSuccess('If your account is registered, a password reset link has been dispatched to your email address.');
  };

  const roleButtons = [
    { r: 'ADMIN', label: 'Administrator', email: 'admin@hms.com', name: 'System Administrator', path: '/admin/dashboard' },
    { r: 'DOCTOR', label: 'Doctor 360°', email: 'doctor@hms.com', name: 'Dr. John Doe', path: '/doctor-portal' },
    { r: 'PATIENT', label: 'Patient Portal', email: 'patient@hms.com', name: 'Peter Parker', path: '/patient-portal' },
    { r: 'LAB_TECHNICIAN', label: 'Lab Tech', email: 'lab@hms.com', name: 'Alex Mercer', path: '/lab-portal' },
    { r: 'PHARMACIST', label: 'Pharmacist', email: 'pharmacy@hms.com', name: 'Sarah Jenkins', path: '/pharmacy-portal' },
    { r: 'BILLING_STAFF', label: 'Billing Officer', email: 'billing@hms.com', name: 'Robert Vance', path: '/billing-portal' },
    { r: 'BED_MANAGER', label: 'Bed Manager', email: 'bed@hms.com', name: 'Elena Rostova', path: '/bed-portal' }
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Left Panel - Hospital SaaS Branding */}
      <div style={{
        flex: 1.1,
        background: 'linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,41,59,0.95))',
        borderRight: '1px solid var(--border-color)',
        padding: '50px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }} className="desktop-only">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '10px', background: 'rgba(6,182,212,0.15)', borderRadius: '12px', border: '1px solid rgba(6,182,212,0.3)' }}>
            <HeartPulse size={36} color="#06b6d4" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.5px' }}>
              St. Jude Health System
            </h1>
            <span style={{ fontSize: '0.85rem', color: '#06b6d4', fontWeight: 600 }}>Integrated Hospital Operations Portal</span>
          </div>
        </div>

        <div style={{ margin: 'auto 0' }}>
          <span className="badge badge-info" style={{ marginBottom: '16px', display: 'inline-block' }}>ENTERPRISE HEALTHCARE PLATFORM</span>
          <h2 style={{ fontSize: '2.2rem', lineHeight: 1.25, fontWeight: 700, marginBottom: '16px', color: '#f8fafc' }}>
            Unified Clinical & Patient Operations Portal
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: '480px' }}>
            Access electronic health records, doctor consultations, laboratory diagnostics, pharmacy inventory, and billing services in one secure portal.
          </p>

          <div style={{ marginTop: '28px' }}>
            <span style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700, display: 'block', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              ⚡ One-Click Instant Role Sign In:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {roleButtons.map(item => (
                <button
                  key={item.r}
                  type="button"
                  onClick={() => handleQuickRoleLogin(item.r, item.email, item.name, item.path)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: role === item.r ? 'linear-gradient(135deg, rgba(6,182,212,0.25), rgba(59,130,246,0.25))' : 'rgba(255,255,255,0.04)',
                    border: role === item.r ? '1px solid #06b6d4' : '1px solid var(--border-color)',
                    color: '#f8fafc',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    transition: 'all 0.2s'
                  }}
                >
                  ➔ {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.8rem' }}>
          <span>© 2026 St. Jude Medical Center</span>
          <span>HIPAA & GDPR Compliant</span>
        </div>
      </div>

      {/* Right Panel - Form Sign In */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ marginBottom: '28px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Hospital Sign In</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '6px' }}>
              Enter credentials or select a role to access your portal
            </p>
          </div>

          {errorMsg && (
            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '0.85rem' }}>
              <AlertCircle size={18} /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleLoginSubmit}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Hospital Role Portal</label>
              <select
                value={role}
                onChange={(e) => {
                  const selectedRole = e.target.value;
                  setRole(selectedRole);
                  const matched = roleButtons.find(b => b.r === selectedRole);
                  if (matched) setEmail(matched.email);
                }}
                style={{ marginTop: '6px' }}
              >
                <option value="ADMIN">Administrator (/admin/dashboard)</option>
                <option value="DOCTOR">Attending Physician (/doctor-portal)</option>
                <option value="PATIENT">Patient Account (/patient-portal)</option>
                <option value="LAB_TECHNICIAN">Laboratory Technician (/lab-portal)</option>
                <option value="PHARMACIST">Hospital Pharmacist (/pharmacy-portal)</option>
                <option value="BILLING_STAFF">Billing & Accounts (/billing-portal)</option>
                <option value="BED_MANAGER">Ward & Bed Manager (/bed-portal)</option>
              </select>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email or Username</label>
              <div style={{ position: 'relative', marginTop: '6px' }}>
                <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  required
                  placeholder="name@hms.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ paddingLeft: '38px' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Password</label>
                <button type="button" onClick={() => setShowForgotModal(true)} style={{ background: 'none', border: 'none', color: '#06b6d4', fontSize: '0.8rem', cursor: 'pointer' }}>
                  Forgot password?
                </button>
              </div>
              <div style={{ position: 'relative', marginTop: '6px' }}>
                <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingLeft: '38px', paddingRight: '38px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#94a3b8', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{ width: 'auto', marginTop: 0 }}
                />
                Keep me signed in
              </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }}>
              Sign In to Hospital Workspace <ArrowRight size={18} />
            </button>
          </form>

          {/* Quick Buttons for Mobile Users */}
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '10px', fontWeight: 600 }}>
              QUICK SIGN IN ROLE PORTALS:
            </span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
              {roleButtons.map(item => (
                <button
                  key={item.r}
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => handleQuickRoleLogin(item.r, item.email, item.name, item.path)}
                  style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal isOpen={showForgotModal} onClose={() => { setShowForgotModal(false); setForgotSuccess(''); }} title="Reset Password">
        {forgotSuccess ? (
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <CheckCircle size={48} color="#10b981" style={{ margin: '0 auto 12px' }} />
            <p style={{ fontSize: '0.9rem', color: '#e2e8f0' }}>{forgotSuccess}</p>
          </div>
        ) : (
          <form onSubmit={handleForgotSubmit}>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '16px' }}>
              Enter your registered staff email address to receive password reset instructions.
            </p>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email Address</label>
              <input
                type="email"
                required
                placeholder="staff@hms.com"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Send Reset Token
            </button>
          </form>
        )}
      </Modal>
    </div>
  );
}
