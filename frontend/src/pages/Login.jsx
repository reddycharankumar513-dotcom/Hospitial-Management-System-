import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, Eye, EyeOff, Lock, Mail, ShieldCheck, ArrowRight, AlertCircle, CheckCircle, UserCheck } from 'lucide-react';
import Modal from '../components/common/Modal';

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('admin@hms.com');
  const [password, setPassword] = useState('admin123');
  const [role, setRole] = useState('ADMIN');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  const navigate = useNavigate();

  const handleRoleQuickSelect = (r, defaultEmail) => {
    setRole(r);
    setEmail(defaultEmail);
    setPassword('password123');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both your email/username and password.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Determine user details based on selected role or email pattern
      let targetRole = role;
      let userName = 'Hospital User';

      if (email.includes('admin') || role === 'ADMIN') {
        targetRole = 'ADMIN';
        userName = 'System Administrator';
      } else if (email.includes('doctor') || role === 'DOCTOR') {
        targetRole = 'DOCTOR';
        userName = 'Dr. John Doe (Cardiology)';
      } else if (email.includes('patient') || role === 'PATIENT') {
        targetRole = 'PATIENT';
        userName = 'Peter Parker';
      } else if (email.includes('lab') || role === 'LAB_TECHNICIAN') {
        targetRole = 'LAB_TECHNICIAN';
        userName = 'Alex Mercer (Lab Tech)';
      } else if (email.includes('pharmacy') || role === 'PHARMACIST') {
        targetRole = 'PHARMACIST';
        userName = 'Sarah Jenkins (Chief Pharmacist)';
      } else if (email.includes('billing') || role === 'BILLING_STAFF') {
        targetRole = 'BILLING_STAFF';
        userName = 'Robert Vance (Billing Officer)';
      } else if (email.includes('bed') || role === 'BED_MANAGER') {
        targetRole = 'BED_MANAGER';
        userName = 'Elena Rostova (Ward Manager)';
      }

      const userData = {
        token: `jwt-${targetRole.toLowerCase()}-token-${Date.now()}`,
        role: targetRole,
        name: userName,
        email: email
      };

      localStorage.setItem('userToken', userData.token);
      localStorage.setItem('userRole', userData.role);
      localStorage.setItem('userName', userData.name);

      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }

      // Direct redirection to the exact role portal workspace
      switch (targetRole) {
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        case 'DOCTOR':
          navigate('/doctor-portal');
          break;
        case 'PATIENT':
          navigate('/patient-portal');
          break;
        case 'LAB_TECHNICIAN':
          navigate('/lab-portal');
          break;
        case 'PHARMACIST':
          navigate('/pharmacy-portal');
          break;
        case 'BILLING_STAFF':
          navigate('/billing-portal');
          break;
        case 'BED_MANAGER':
          navigate('/bed-portal');
          break;
        default:
          navigate('/admin/dashboard');
      }
    }, 600);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSuccess('If your account is registered, a password reset link has been dispatched to your email address.');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Left Panel - Hospital SaaS Branding */}
      <div style={{
        flex: 1.1,
        background: 'linear-gradient(135deg, rgba(15,23,42,0.98), rgba(30,41,59,0.95))',
        borderRight: '1px solid var(--border-color)',
        padding: '60px',
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
            <span style={{ fontSize: '0.85rem', color: '#06b6d4', fontWeight: 600 }}>Integrated Hospital Operations & Care Portal</span>
          </div>
        </div>

        <div style={{ margin: 'auto 0' }}>
          <span className="badge badge-info" style={{ marginBottom: '16px', display: 'inline-block' }}>ENTERPRISE HEALTHCARE PLATFORM</span>
          <h2 style={{ fontSize: '2.4rem', lineHeight: 1.25, fontWeight: 700, marginBottom: '20px', color: '#f8fafc' }}>
            Unified Clinical & Patient Operations Management
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '500px' }}>
            Access electronic health records, doctor consultations, laboratory diagnostics, pharmacy inventory, and billing services in one secure portal.
          </p>

          {/* Quick Role Selector Cards for Humanized Testing */}
          <div style={{ marginTop: '32px' }}>
            <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600, display: 'block', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Select Role for Instant Sign In:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {[
                { r: 'ADMIN', label: 'Administrator', email: 'admin@hms.com' },
                { r: 'DOCTOR', label: 'Physician / Doctor', email: 'doctor@hms.com' },
                { r: 'PATIENT', label: 'Patient Portal', email: 'patient@hms.com' },
                { r: 'LAB_TECHNICIAN', label: 'Lab Technician', email: 'lab@hms.com' },
                { r: 'PHARMACIST', label: 'Pharmacist', email: 'pharmacy@hms.com' },
                { r: 'BILLING_STAFF', label: 'Billing Staff', email: 'billing@hms.com' }
              ].map(item => (
                <button
                  key={item.r}
                  type="button"
                  onClick={() => handleRoleQuickSelect(item.r, item.email)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '8px',
                    background: role === item.r ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.03)',
                    border: role === item.r ? '1px solid #06b6d4' : '1px solid var(--border-color)',
                    color: role === item.r ? '#38bdf8' : '#cbd5e1',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 600
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.8rem' }}>
          <span>© 2026 St. Jude Medical Center</span>
          <span>HIPAA & GDPR Compliant Security</span>
        </div>
      </div>

      {/* Right Panel - Sign In Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700, color: 'var(--text-primary)' }}>Hospital System Sign In</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '6px' }}>
              Enter your credentials to access your hospital workspace
            </p>
          </div>

          {errorMsg && (
            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '0.85rem' }}>
              <AlertCircle size={18} /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Hospital Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ marginTop: '6px' }}
              >
                <option value="ADMIN">Administrator</option>
                <option value="DOCTOR">Attending Physician / Doctor</option>
                <option value="PATIENT">Patient Account</option>
                <option value="LAB_TECHNICIAN">Laboratory Technician</option>
                <option value="PHARMACIST">Hospital Pharmacist</option>
                <option value="BILLING_STAFF">Billing & Accounts Staff</option>
                <option value="BED_MANAGER">Ward & Bed Manager</option>
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

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }} disabled={loading}>
              {loading ? 'Verifying Credentials...' : <>Sign In to Hospital Portal <ArrowRight size={18} /></>}
            </button>
          </form>
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
