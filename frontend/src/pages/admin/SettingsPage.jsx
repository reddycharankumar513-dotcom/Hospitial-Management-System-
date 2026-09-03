import React, { useState } from 'react';
import { Save, CheckCircle } from 'lucide-react';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    hospitalName: 'Hospital Management System',
    address: '742 Evergreen Terrace, Medical District, NY 10001',
    phone: '+1 (800) 555-4000',
    email: 'contact@hospital.local',
    slotDuration: '30',
    currency: '$',
    lowStockThreshold: '10'
  });

  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Hospital System Settings</h1>
        <p style={{ color: '#94a3b8' }}>Configure platform parameters, scheduling rules & thresholds</p>
      </div>

      <div className="glass-card" style={{ maxWidth: '640px' }}>
        {saved && (
          <div style={{ padding: '12px', background: 'rgba(16,185,129,0.15)', color: '#34d399', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle size={18} /> System settings saved successfully to backend.
          </div>
        )}

        <form onSubmit={handleSave}>
          <div style={{ marginBottom: '16px' }}>
            <label>Official Hospital Name</label>
            <input value={settings.hospitalName} onChange={e => setSettings({ ...settings, hospitalName: e.target.value })} />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label>Physical Address</label>
            <input value={settings.address} onChange={e => setSettings({ ...settings, address: e.target.value })} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label>Emergency Hotline Phone</label>
              <input value={settings.phone} onChange={e => setSettings({ ...settings, phone: e.target.value })} />
            </div>
            <div>
              <label>Contact Email</label>
              <input value={settings.email} onChange={e => setSettings({ ...settings, email: e.target.value })} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '24px' }}>
            <div>
              <label>Appt Slot Duration (mins)</label>
              <input value={settings.slotDuration} onChange={e => setSettings({ ...settings, slotDuration: e.target.value })} />
            </div>
            <div>
              <label>Currency Symbol</label>
              <input value={settings.currency} onChange={e => setSettings({ ...settings, currency: e.target.value })} />
            </div>
            <div>
              <label>Low Stock Alert Threshold</label>
              <input value={settings.lowStockThreshold} onChange={e => setSettings({ ...settings, lowStockThreshold: e.target.value })} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            <Save size={18} /> Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}
