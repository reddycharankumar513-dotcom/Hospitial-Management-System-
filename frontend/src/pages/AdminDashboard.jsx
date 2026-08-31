import React, { useState } from 'react';
import { Users, UserCheck, Calendar, AlertTriangle, BedDouble, TestTube, Receipt, Pill, Server, TrendingUp, Activity, Bell } from 'lucide-react';

export default function AdminDashboard() {
  const [stats] = useState({
    totalPatients: 1240,
    activeDoctors: 18,
    todayAppointments: 42,
    emergencyCases: 3,
    availableBeds: 14,
    pendingLabTests: 8,
    pendingBills: 5,
    lowStockMedicines: 4
  });

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Smart Hospital Operations Center</h1>
          <p style={{ color: '#94a3b8' }}>Real-time telemetry, analytics & microservices monitoring</p>
        </div>
        <div className="badge badge-success" style={{ padding: '8px 14px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Activity size={14} /> LIVE PIPELINE ACTIVE
        </div>
      </div>

      {/* 8 Real-time KPI Cards */}
      <div className="grid-cols-4" style={{ marginBottom: '32px' }}>
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>TOTAL PATIENTS</span>
            <Users color="#06b6d4" size={22} />
          </div>
          <h2 style={{ fontSize: '2.2rem', marginTop: '10px' }}>{stats.totalPatients.toLocaleString()}</h2>
          <span className="badge badge-success" style={{ marginTop: '8px', display: 'inline-block' }}>+12% this month</span>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>ACTIVE DOCTORS</span>
            <UserCheck color="#3b82f6" size={22} />
          </div>
          <h2 style={{ fontSize: '2.2rem', marginTop: '10px' }}>{stats.activeDoctors}</h2>
          <span className="badge badge-info" style={{ marginTop: '8px', display: 'inline-block' }}>100% On Schedule</span>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>TODAY'S APPOINTMENTS</span>
            <Calendar color="#8b5cf6" size={22} />
          </div>
          <h2 style={{ fontSize: '2.2rem', marginTop: '10px' }}>{stats.todayAppointments}</h2>
          <span className="badge badge-warning" style={{ marginTop: '8px', display: 'inline-block' }}>12 In Progress</span>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>EMERGENCY CASES</span>
            <AlertTriangle color="#ef4444" size={22} />
          </div>
          <h2 style={{ fontSize: '2.2rem', marginTop: '10px' }}>{stats.emergencyCases}</h2>
          <span className="badge badge-danger" style={{ marginTop: '8px', display: 'inline-block' }}>Critical Triage Priority</span>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>AVAILABLE BEDS</span>
            <BedDouble color="#10b981" size={22} />
          </div>
          <h2 style={{ fontSize: '2.2rem', marginTop: '10px' }}>{stats.availableBeds}</h2>
          <span className="badge badge-success" style={{ marginTop: '8px', display: 'inline-block' }}>ICU & Wards</span>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>PENDING LAB TESTS</span>
            <TestTube color="#f59e0b" size={22} />
          </div>
          <h2 style={{ fontSize: '2.2rem', marginTop: '10px' }}>{stats.pendingLabTests}</h2>
          <span className="badge badge-warning" style={{ marginTop: '8px', display: 'inline-block' }}>Processing</span>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>PENDING BILLS</span>
            <Receipt color="#38bdf8" size={22} />
          </div>
          <h2 style={{ fontSize: '2.2rem', marginTop: '10px' }}>{stats.pendingBills}</h2>
          <span className="badge badge-info" style={{ marginTop: '8px', display: 'inline-block' }}>$4,250 Outstanding</span>
        </div>

        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>LOW STOCK MEDICINES</span>
            <Pill color="#ec4899" size={22} />
          </div>
          <h2 style={{ fontSize: '2.2rem', marginTop: '10px' }}>{stats.lowStockMedicines}</h2>
          <span className="badge badge-danger" style={{ marginTop: '8px', display: 'inline-block' }}>Reorder Required</span>
        </div>
      </div>

      {/* Interactive SVG Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3>Patient Registration & Consultation Trend</h3>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Weekly volume analysis across hospital departments</p>
            </div>
            <span className="badge badge-info">THIS WEEK</span>
          </div>

          <div style={{ height: '220px', display: 'flex', alignItems: 'flex-end', gap: '24px', padding: '10px 20px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
            {[
              { day: 'Mon', count: 65, height: '65%' },
              { day: 'Tue', count: 85, height: '85%' },
              { day: 'Wed', count: 45, height: '45%' },
              { day: 'Thu', count: 95, height: '95%' },
              { day: 'Fri', count: 110, height: '100%' },
              { day: 'Sat', count: 70, height: '70%' },
              { day: 'Sun', count: 40, height: '40%' },
            ].map((bar) => (
              <div key={bar.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', color: '#06b6d4', fontWeight: 600 }}>{bar.count}</span>
                <div style={{ width: '100%', height: bar.height, background: 'linear-gradient(180deg, #06b6d4, #3b82f6)', borderRadius: '6px 6px 0 0' }}></div>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{bar.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Utilization Breakdown */}
        <div className="glass-card">
          <h3>Department Utilization</h3>
          <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '16px' }}>Active caseload distribution</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {[
              { dept: 'Cardiology', pct: 85, color: '#06b6d4' },
              { dept: 'General Medicine', pct: 92, color: '#3b82f6' },
              { dept: 'Orthopedics', pct: 60, color: '#10b981' },
              { dept: 'Pediatrics', pct: 45, color: '#f59e0b' },
              { dept: 'Emergency', pct: 98, color: '#ef4444' },
            ].map(d => (
              <div key={d.dept}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px' }}>
                  <span>{d.dept}</span>
                  <span style={{ color: d.color, fontWeight: 600 }}>{d.pct}%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px' }}>
                  <div style={{ width: `${d.pct}%`, height: '100%', background: d.color, borderRadius: '3px' }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
