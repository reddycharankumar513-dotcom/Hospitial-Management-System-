import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, CheckCircle, UserPlus, Shield, User, Activity, Stethoscope, TestTube, Pill, CreditCard, BedDouble } from 'lucide-react';
import Modal from '../components/common/Modal';

export default function Login({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('SIGN_IN'); // 'SIGN_IN' or 'REGISTER'
  const [selectedRole, setSelectedRole] = useState('PATIENT');

  // Login Form State
  const [email, setEmail] = useState('patient@hms.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  // Register Patient Form State
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

  // Role Configuration List
  const rolePortals = [
    { id: 'ADMIN', title: 'Admin Login', desc: 'System management, users & audit logs', icon: Shield, color: '#3b82f6', defaultEmail: 'admin@hms.com', name: 'System Administrator', path: '/admin/dashboard' },
    { id: 'DOCTOR', title: 'Doctor Login', desc: 'Consultations, queue & Patient 360°', icon: Stethoscope, color: '#06b6d4', defaultEmail: 'doctor@hms.com', name: 'Dr. John Doe', path: '/doctor-portal' },
    { id: 'PATIENT', title: 'Patient Login / Register', desc: 'Appointments, lab reports & billing', icon: User, color: '#10b981', defaultEmail: 'patient@hms.com', name: 'Peter Parker', path: '/patient-portal' },
    { id: 'LAB_TECHNICIAN', title: 'Lab Technician Login', desc: 'Sample collection & test results', icon: TestTube, color: '#f59e0b', defaultEmail: 'lab@hms.com', name: 'Alex Mercer', path: '/lab-portal' },
    { id: 'PHARMACIST', title: 'Pharmacist Login', desc: 'Prescriptions & inventory stock', icon: Pill, color: '#ec4899', defaultEmail: 'pharmacy@hms.com', name: 'Sarah Jenkins', path: '/pharmacy-portal' },
    { id: 'BILLING_STAFF', title: 'Billing Staff Login', desc: 'Invoices & payment processing', icon: CreditCard, color: '#8b5cf6', defaultEmail: 'billing@hms.com', name: 'Robert Vance', path: '/billing-portal' },
    { id: 'BED_MANAGER', title: 'Bed Manager Login', desc: 'Ward bed allocation & admissions', icon: BedDouble, color: '#6366f1', defaultEmail: 'bed@hms.com', name: 'Elena Rostova', path: '/bed-portal' }
  ];

  const performLogin = (r, uEmail, uName, uPath) => {
    const userData = {
      token: `jwt-${r.toLowerCase()}-token-${Date.now()}`,
      role: r,
      name: uName,
      email: uEmail
    };

    localStorage.setItem('userToken', userData.token);
    localStorage.setItem('userRole', userData.role);
    localStorage.setItem('userName', userData.name);

    if (onLoginSuccess) {
      onLoginSuccess(userData);
    }

    navigate(uPath);
  };

  const handleRoleCardClick = (portal) => {
    setSelectedRole(portal.id);
    setEmail(portal.defaultEmail);
    performLogin(portal.id, portal.defaultEmail, portal.name, portal.path);
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email) {
      setErrorMsg('Please enter your email address or username.');
      return;
    }

    const matchedPortal = rolePortals.find(p => p.id === selectedRole) || rolePortals[2];
    performLogin(selectedRole, email, matchedPortal.name, matchedPortal.path);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegSuccessMsg(`Patient Account created successfully for ${regData.fullName}! You can now sign in.`);
    setEmail(regData.email);
    setTimeout(() => {
      setActiveTab('SIGN_IN');
      setSelectedRole('PATIENT');
    }, 1200);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSuccess('If your account is registered, a password reset link has been dispatched to your email address.');
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', flexDirection: 'column' }}>
      {/* Top Branding Header */}
      <header style={{
        background: 'rgba(15, 23, 42, 0.95)',
        borderBottom: '1px solid var(--border-color)',
        padding: '16px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ padding: '8px', background: 'rgba(6,182,212,0.15)', borderRadius: '10px', border: '1px solid rgba(6,182,212,0.3)' }}>
            <HeartPulse size={28} color="#06b6d4" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#f8fafc', letterSpacing: '-0.3px' }}>
              St. Jude Health System
            </h1>
            <span style={{ fontSize: '0.8rem', color: '#06b6d4', fontWeight: 600 }}>Enterprise Hospital Access Portal</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="btn"
            onClick={() => setActiveTab('SIGN_IN')}
            style={{
              padding: '6px 16px',
              fontSize: '0.85rem',
              background: activeTab === 'SIGN_IN' ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'SIGN_IN' ? '#fff' : '#94a3b8'
            }}
          >
            Hospital Sign In
          </button>
          <button
            className="btn"
            onClick={() => { setActiveTab('REGISTER'); setSelectedRole('PATIENT'); }}
            style={{
              padding: '6px 16px',
              fontSize: '0.85rem',
              background: activeTab === 'REGISTER' ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.05)',
              color: activeTab === 'REGISTER' ? '#fff' : '#94a3b8'
            }}
          >
            <UserPlus size={16} /> Patient Registration
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: '40px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        {/* Welcome Callout Banner */}
        <div className="glass-card" style={{ marginBottom: '32px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(59,130,246,0.15))' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '8px' }}>
            Welcome to Hospital Management Portal
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '640px', margin: '0 auto' }}>
            Please select your role below to Sign In or Register a new Patient Account to access clinical workflows, appointments, prescriptions, laboratory reports, and billing.
          </p>
        </div>

        {activeTab === 'SIGN_IN' && (
          <div>
            {/* Step 1: Select Role Access Portal Cards */}
            <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: '#e2e8f0' }}>
              Select Account Role to Login:
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px', marginBottom: '36px' }}>
              {rolePortals.map(portal => {
                const IconComp = portal.icon;
                const isSelected = selectedRole === portal.id;
                return (
                  <div
                    key={portal.id}
                    onClick={() => handleRoleCardClick(portal)}
                    style={{
                      padding: '20px',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      background: isSelected ? 'linear-gradient(135deg, rgba(6,182,212,0.18), rgba(59,130,246,0.18))' : 'rgba(255,255,255,0.03)',
                      border: isSelected ? `2px solid ${portal.color}` : '1px solid var(--border-color)',
                      transition: 'all 0.2s transform'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                      <div style={{ padding: '8px', borderRadius: '8px', background: `${portal.color}22` }}>
                        <IconComp size={24} color={portal.color} />
                      </div>
                      <strong style={{ fontSize: '1rem', color: '#f8fafc' }}>{portal.title}</strong>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.4 }}>{portal.desc}</p>
                    <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: portal.color, fontWeight: 600 }}>
                      <span>Click to Sign In as {portal.id.replace('_', ' ')}</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step 2: Sign In Credentials Form */}
            <div className="glass-card" style={{ maxWidth: '520px', margin: '0 auto' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                Sign In Credentials ({selectedRole.replace('_', ' ')})
              </h3>

              {errorMsg && (
                <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', marginBottom: '16px', fontSize: '0.85rem' }}>
                  <AlertCircle size={16} /> {errorMsg}
                </div>
              )}

              <form onSubmit={handleSignInSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email Address or Username</label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Password</label>
                    <button type="button" onClick={() => setShowForgotModal(true)} style={{ background: 'none', border: 'none', color: '#06b6d4', fontSize: '0.8rem', cursor: 'pointer' }}>
                      Forgot password?
                    </button>
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }}>
                  Sign In to {selectedRole.replace('_', ' ')} Workspace <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Patient Account Registration Tab */}
        {activeTab === 'REGISTER' && (
          <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '6px' }}>Patient Account Registration</h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '20px' }}>
              Create your patient profile to book appointments, view prescriptions, and access medical records.
            </p>

            {regSuccessMsg && (
              <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(16,185,129,0.15)', border: '1px solid #10b981', color: '#34d399', marginBottom: '20px', fontSize: '0.85rem' }}>
                <CheckCircle size={18} /> {regSuccessMsg}
              </div>
            )}

            <form onSubmit={handleRegisterSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label>Full Patient Name</label>
                <input required placeholder="Peter Parker" value={regData.fullName} onChange={e => setRegData({ ...regData, fullName: e.target.value })} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                <div>
                  <label>Email Address</label>
                  <input type="email" required placeholder="patient@hms.com" value={regData.email} onChange={e => setRegData({ ...regData, email: e.target.value })} />
                </div>
                <div>
                  <label>Contact Phone</label>
                  <input required placeholder="+1 555-0199" value={regData.phone} onChange={e => setRegData({ ...regData, phone: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
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
                <label>Account Password</label>
                <input type="password" required placeholder="••••••••" value={regData.password} onChange={e => setRegData({ ...regData, password: e.target.value })} />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: '0.95rem' }}>
                Create Patient Account & Sign In
              </button>
            </form>
          </div>
        )}
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
              Enter your registered staff or patient email address to receive password reset instructions.
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
