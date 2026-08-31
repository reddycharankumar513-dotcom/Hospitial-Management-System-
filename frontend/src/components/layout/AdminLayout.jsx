import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HeartPulse, LayoutDashboard, Users, UserCheck, Calendar, BedDouble,
  TestTube, Pill, Receipt, Shield, FileText, Activity, Settings, User,
  LogOut, Sun, Moon, Search, Bell, Menu, X
} from 'lucide-react';
import NotificationCenter from '../common/NotificationCenter';

export default function AdminLayout({ children, theme, toggleTheme }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'User Management', path: '/admin/users', icon: Users },
    { label: 'Role Matrix', path: '/admin/roles', icon: Shield },
    { label: 'Patients', path: '/admin/patients', icon: UserCheck },
    { label: 'Doctors', path: '/admin/doctors', icon: Activity },
    { label: 'Appointments', path: '/admin/appointments', icon: Calendar },
    { label: 'Visual Bed Map', path: '/admin/beds', icon: BedDouble },
    { label: 'Laboratory', path: '/admin/laboratory', icon: TestTube },
    { label: 'Pharmacy', path: '/admin/pharmacy', icon: Pill },
    { label: 'Billing & Invoices', path: '/admin/billing', icon: Receipt },
    { label: 'Reports & Analytics', path: '/admin/reports', icon: FileText },
    { label: 'Audit Logs', path: '/admin/audit-logs', icon: Activity },
    { label: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Sidebar */}
      <aside style={{
        width: collapsed ? '80px' : '260px',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-color)',
        transition: 'width 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
        position: 'sticky',
        top: 0,
        height: '100vh',
        zIndex: 100
      }}>
        <div style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)' }}>
          {!collapsed && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <HeartPulse size={28} color="#06b6d4" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, background: 'linear-gradient(90deg, #06b6d4, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                HMS PROJECT
              </h2>
            </div>
          )}
          {collapsed && <HeartPulse size={28} color="#06b6d4" style={{ margin: '0 auto' }} />}
          <button onClick={() => setCollapsed(!collapsed)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav style={{ flex: 1, padding: '16px 10px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  color: active ? '#ffffff' : 'var(--text-secondary)',
                  background: active ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'transparent',
                  textDecoration: 'none',
                  fontWeight: active ? 600 : 500,
                  fontSize: '0.875rem'
                }}
              >
                <Icon size={18} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid var(--border-color)' }}>
          <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', cursor: 'pointer' }}>
            <LogOut size={18} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Top Navbar */}
        <header style={{
          height: '64px',
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 32px',
          position: 'sticky',
          top: 0,
          zIndex: 90
        }}>
          <div style={{ position: 'relative', width: '360px' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-30%)' }} />
            <input placeholder="Global search patients, doctors, lab orders, bills..." style={{ paddingLeft: '38px', marginTop: 0 }} />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', position: 'relative' }}>
            <button onClick={toggleTheme} className="btn btn-secondary" style={{ padding: '8px' }}>
              {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#06b6d4" />}
            </button>

            <button onClick={() => setShowNotifications(!showNotifications)} className="btn btn-secondary" style={{ padding: '8px', position: 'relative' }}>
              <Bell size={18} color="#06b6d4" />
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#ef4444', color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '10px', fontWeight: 'bold' }}>2</span>
            </button>

            <NotificationCenter isOpen={showNotifications} onClose={() => setShowNotifications(false)} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setShowProfileMenu(!showProfileMenu)}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                AD
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>System Admin</span>
                <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>admin@hms.com</span>
              </div>
            </div>
          </div>
        </header>

        <main style={{ padding: '32px 40px', flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
