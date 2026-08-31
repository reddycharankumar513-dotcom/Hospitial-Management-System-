import React from 'react';
import { Download, FileText } from 'lucide-react';

export default function ReportsPage() {
  const reports = [
    { title: 'Patient Registration & Demographic Report', cat: 'Patients', freq: 'Monthly' },
    { title: 'Doctor Utilization & Consultation Summary', cat: 'Doctors', freq: 'Weekly' },
    { title: 'Hospital Revenue & Payment Settlement Report', cat: 'Billing', freq: 'Monthly' },
    { title: 'Ward Bed Occupancy Rate Analysis', cat: 'Beds', freq: 'Daily' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Hospital Reporting & Analytics Module</h1>
        <p style={{ color: '#94a3b8' }}>Exportable operational and financial telemetry</p>
      </div>

      <div className="glass-card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {reports.map(r => (
            <div key={r.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileText color="#06b6d4" />
                <div>
                  <strong>{r.title}</strong>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Category: {r.cat} | Frequency: {r.freq}</p>
                </div>
              </div>
              <button className="btn btn-primary" style={{ padding: '6px 14px', fontSize: '0.78rem' }} onClick={() => alert(`Exporting ${r.title} as CSV...`)}>
                <Download size={14} /> Export CSV
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
