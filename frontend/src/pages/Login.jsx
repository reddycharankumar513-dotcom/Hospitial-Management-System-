import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, CheckCircle, UserPlus, Shield, User, Stethoscope, TestTube, Pill, CreditCard, BedDouble, Key } from 'lucide-react';
import Modal from '../components/common/Modal';

export default function Login({ onLoginSuccess }) {
  const [activeModalRole, setActiveModalRole] = useState(null); // null or role object
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Patient Registration Form State
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

  // Role Configuration Roster
  const rolesList = [
    { id: 'ADMIN', title: 'Administrator Login', desc: 'System configuration, user management & audit logs', icon: Shield, color: '#3b82f6', defaultEmail: 'admin@hms.com', defaultName: 'System Administrator', path: '/admin/dashboard' },
    { id: 'DOCTOR', title: 'Doctor / Physician Login', desc: 'Patient queue, clinical consultation & Patient 360°', icon: Stethoscope, color: '#06b6d4', defaultEmail: 'doctor@hms.com', defaultName: 'Dr. John Doe (Cardiology)', path: '/doctor-portal' },
    { id: 'PATIENT', title: 'Patient Portal Login & Register', desc: 'Book appointments, view lab reports & pay bills', icon: User, color: '#10b981', defaultEmail: 'patient@hms.com', defaultName: 'Peter Parker (PAT-1001)', path: '/patient-portal' },
    { id: 'LAB_TECHNICIAN', title: 'Lab Technician Login', desc: 'Sample collection, result entry & Kafka events', icon: TestTube, color: '#f59e0b', defaultEmail: 'lab@hms.com', defaultName: 'Alex Mercer (Lab Tech)', path: '/lab-portal' },
    { id: 'PHARMACIST', title: 'Pharmacist Login', desc: 'Prescriptions queue & atomic inventory deduction', icon: Pill, color: '#ec4899', defaultEmail: 'pharmacy@hms.com', defaultName: 'Sarah Jenkins (Pharmacist)', path: '/pharmacy-portal' },
    { id: 'BILLING_STAFF', title: 'Billing Staff Login', desc: 'Invoices & multi-channel payment settlement', icon: CreditCard, color: '#8b5cf6', defaultEmail: 'billing@hms.com', defaultName: 'Robert Vance (Billing Officer)', path: '/billing-portal' },
    { id: 'BED_MANAGER', title: 'Ward & Bed Manager Login', desc: 'Hospital ward bed grid, admissions & discharges', icon: BedDouble, color: '#6366f1', defaultEmail: 'bed@hms.com', defaultName: 'Elena Rostova (Ward Manager)', path: '/bed-portal' }
  ];

  const handleOpenRoleModal = (roleObj, registerMode = false) => {
    setActiveModalRole(roleObj);
    setIsRegisterMode(registerMode);
    setEmail(roleObj.defaultEmail);
    setPassword('password123');
    setErrorMsg('');
    setRegSuccessMsg('');
  };

  const handleExecuteLogin = (roleObj, userEmail) => {
    setLoading(true);
    setErrorMsg('');

    setTimeout(() => {
      setLoading(false);
      const userData = {
        token: `jwt-${roleObj.id.toLowerCase()}-token-${Date.now()}`,
        role: roleObj.id,
        name: roleObj.defaultName,
        email: userEmail || roleObj.defaultEmail
      };

      localStorage.setItem('userToken', userData.token);
      localStorage.setItem('userRole', userData.role);
      localStorage.setItem('userName', userData.name);

      if (onLoginSuccess) {
        onLoginSuccess(userData);
      }

      setActiveModalRole(null);
      navigate(roleObj.path);
    }, 300);
  };

  const handleFormLoginSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your email or username.');
      return;
    }
    handleExecuteLogin(activeModalRole, email);
  };

  const handlePatientRegisterSubmit = (e) => {
    e.preventDefault();
    setRegSuccessMsg(`Account created for ${regData.fullName}! Redirecting to Patient Portal...`);
    setTimeout(() => {
      handleExecuteLogin(rolesList[2], regData.email || 'patient@hms.com');
    }, 1000);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSuccess('A password reset token has been dispatched to your email address.');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Branding Header */}
      <header style={{
        background: 'rgba(15, 23, 42, 0.95)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '8px', background: 'rgba(6,182,212,0.15)', borderRadius: '10px', border: '1px solid rgba(6,182,212,0.3)' }}>
            <HeartPulse size={28} color="#06b6d4" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.3px' }}>
              St. Jude Health System
            </h1>
            <span style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 600 }}>Integrated Hospital Access Portal</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            className="btn btn-primary"
            onClick={() => handleOpenRoleModal(rolesList[2], true)}
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <UserPlus size={16} /> New Patient Registration
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div style={{ flex: 1, padding: '40px 24px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        {/* Welcome Header */}
        <div className="glass-card" style={{ marginBottom: '32px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(59,130,246,0.15))' }}>
          <h2 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '8px', color: '#f8fafc' }}>
            Hospital Role Access & Sign In Portal
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '680px', margin: '0 auto', lineHeight: 1.5 }}>
            Select your account type below to Sign In or Register a new Patient Account to access clinical workflows, consultations, prescriptions, laboratory reports, and billing.
          </p>
        </div>

        {/* 7 Dedicated Role Access Cards Grid */}
        <h3 style={{ fontSize: '1.15rem', marginBottom: '18px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Key size={18} color="#06b6d4" /> Select Your Hospital Account Role to Sign In:
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {rolesList.map(roleObj => {
            const IconComponent = roleObj.icon;
            return (
              <div
                key={roleObj.id}
                style={{
                  padding: '24px',
                  borderRadius: '14px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.2s',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                    <div style={{ padding: '10px', borderRadius: '10px', background: `${roleObj.color}22`, border: `1px solid ${roleObj.color}44` }}>
                      <IconComponent size={26} color={roleObj.color} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '1.05rem', color: '#f8fafc', fontWeight: 700 }}>{roleObj.title}</h4>
                      <span className="badge badge-info" style={{ fontSize: '0.68rem', marginTop: '2px' }}>{roleObj.id}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: '20px' }}>
                    {roleObj.desc}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleOpenRoleModal(roleObj, false)}
                    style={{ flex: 1, justifyContent: 'center', padding: '10px', fontSize: '0.85rem', background: `linear-gradient(135deg, ${roleObj.color}, #3b82f6)` }}
                  >
                    Sign In <ArrowRight size={16} />
                  </button>

                  {roleObj.id === 'PATIENT' && (
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleOpenRoleModal(roleObj, true)}
                      style={{ padding: '10px', fontSize: '0.85rem' }}
                    >
                      Register
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Role Sign In / Register Interactive Modal */}
      {activeModalRole && (
        <Modal
          isOpen={!!activeModalRole}
          onClose={() => setActiveModalRole(null)}
          title={isRegisterMode ? 'New Patient Account Registration' : `Sign In: ${activeModalRole.title}`}
        >
          {isRegisterMode ? (
            /* Patient Registration Form */
            <form onSubmit={handlePatientRegisterSubmit}>
              {regSuccessMsg && (
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', color: '#34d399', marginBottom: '16px', fontSize: '0.85rem' }}>
                  <CheckCircle size={16} /> {regSuccessMsg}
                </div>
              )}

              <div style={{ marginBottom: '14px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Full Name</label>
                <input required placeholder="Peter Parker" value={regData.fullName} onChange={e => setRegData({ ...regData, fullName: e.target.value })} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email Address</label>
                  <input type="email" required placeholder="patient@hms.com" value={regData.email} onChange={e => setRegData({ ...regData, email: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Contact Phone</label>
                  <input required placeholder="+1 555-0199" value={regData.phone} onChange={e => setRegData({ ...regData, phone: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Date of Birth</label>
                  <input type="date" value={regData.dob} onChange={e => setRegData({ ...regData, dob: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Gender</label>
                  <select value={regData.gender} onChange={e => setRegData({ ...regData, gender: e.target.value })}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Create Password</label>
                <input type="password" required placeholder="••••••••" value={regData.password} onChange={e => setRegData({ ...regData, password: e.target.value })} />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                Create Account & Sign In to Patient Portal
              </button>
            </form>
          ) : (
            /* Role Sign In Form */
            <form onSubmit={handleFormLoginSubmit}>
              {errorMsg && (
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', marginBottom: '16px', fontSize: '0.85rem' }}>
                  <AlertCircle size={16} /> {errorMsg}
                </div>
              )}

              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email Address or Username</label>
                <div style={{ position: 'relative', marginTop: '6px' }}>
                  <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ paddingLeft: '38px' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Password</label>
                  <button type="button" onClick={() => setShowForgotModal(true)} style={{ background: 'none', border: 'none', color: '#06b6d4', fontSize: '0.8rem', cursor: 'pointer' }}>
                    Forgot password?
                  </button>
                </div>
                <div style={{ position: 'relative', marginTop: '6px' }}>
                  <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
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

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }} disabled={loading}>
                {loading ? 'Authenticating...' : `Enter ${activeModalRole.title}`}
              </button>
            </form>
          )}
        </Modal>
      )}

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
              Enter your registered email address to receive password reset instructions.
            </p>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email Address</label>
              <input
                type="email"
                required
                placeholder="user@hms.com"
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
