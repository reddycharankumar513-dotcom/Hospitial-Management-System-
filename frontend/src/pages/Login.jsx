import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, Eye, EyeOff, Lock, Mail, ShieldCheck, Activity, AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';
import Modal from '../components/common/Modal';

export default function Login() {
  const [email, setEmail] = useState('admin@hms.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState('');

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      if (email === 'admin@hms.com' || email === 'admin@hospital.local') {
        localStorage.setItem('token', 'mock-jwt-admin-token');
        localStorage.setItem('role', 'ADMIN');
        navigate('/admin/dashboard');
      } else if (email.includes('doctor')) {
        localStorage.setItem('token', 'mock-jwt-doctor-token');
        localStorage.setItem('role', 'DOCTOR');
        navigate('/admin/dashboard');
      } else {
        localStorage.setItem('token', 'mock-jwt-patient-token');
        localStorage.setItem('role', 'PATIENT');
        navigate('/admin/dashboard');
      }
    }, 800);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSuccess('If your email is registered in the system, a secure password reset token has been dispatched.');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Left Panel - Healthcare Branding & Telemetry Illustration */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(59, 130, 246, 0.2))',
        borderRight: '1px solid var(--border-color)',
        padding: '60px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }} className="desktop-only">
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <HeartPulse size={40} color="#06b6d4" />
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, background: 'linear-gradient(90deg, #06b6d4, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              HMS PROJECT
            </h1>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', letterSpacing: '1px' }}>SMART HOSPITAL OPERATIONS CENTER</span>
          </div>
        </div>

        <div style={{ margin: 'auto 0' }}>
          <div className="badge badge-info" style={{ marginBottom: '16px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={14} /> 24/7 Enterprise Clinical Telemetry
          </div>
          <h2 style={{ fontSize: '2.5rem', lineHeight: 1.2, fontWeight: 700, marginBottom: '20px' }}>
            Intelligent Healthcare & Microservices Platform
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6, maxWidth: '480px' }}>
            Streamlined patient management, automated emergency triage, real-time bed mapping, and Kafka event streaming for enterprise hospital operations.
          </p>

          <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}>
              <ShieldCheck size={20} color="#10b981" />
              <span>JWT Authentication & Role-Based Access Control</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}>
              <ShieldCheck size={20} color="#10b981" />
              <span>Apache Kafka Event-Driven Data Pipeline Integration</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#e2e8f0' }}>
              <ShieldCheck size={20} color="#10b981" />
              <span>Redis Distributed Caching & Atomically Deducted Inventory</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontSize: '0.8rem' }}>
          <span>© 2026 HMS Operations Platform</span>
          <span>v2.0.0 Production Release</span>
        </div>
      </div>

      {/* Right Panel - Two-Panel Login Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px' }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Welcome Back</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '6px' }}>
              Sign in with your hospital staff or administrator credentials
            </p>
          </div>

          {errorMsg && (
            <div style={{ padding: '12px', borderRadius: '8px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', fontSize: '0.85rem' }}>
              <AlertCircle size={18} /> {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '18px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Email or Username</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-30%)' }} />
                <input
                  type="email"
                  required
                  placeholder="admin@hms.com"
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
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-30%)' }} />
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
                  style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-30%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
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
                Remember me on this session
              </label>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px' }} disabled={loading}>
              {loading ? 'Authenticating...' : <>Sign In <ArrowRight size={18} /></>}
            </button>
          </form>

          <div style={{ marginTop: '32px', padding: '16px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.78rem', color: '#94a3b8', display: 'block', marginBottom: '6px', fontWeight: 600 }}>DEMO CREDENTIALS:</span>
            <div style={{ fontSize: '0.75rem', color: '#e2e8f0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span>ADMIN: <strong>admin@hms.com</strong> / <strong>admin123</strong></span>
              <span>DOCTOR: <strong>doctor@hms.com</strong> / <strong>doctor123</strong></span>
              <span>PATIENT: <strong>patient@hms.com</strong> / <strong>patient123</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal isOpen={showForgotModal} onClose={() => { setShowForgotModal(false); setForgotSuccess(''); }} title="Reset Your Password">
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
