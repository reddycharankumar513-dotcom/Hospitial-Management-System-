import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

export default function DoctorPortal() {
  const [queue] = useState([
    { id: 1, apptNum: 'APT-1001', patient: 'Peter Parker', patientNum: 'PAT-1001', age: 26, gender: 'Male', blood: 'O+', time: '09:00 AM', status: 'IN_QUEUE' },
    { id: 2, apptNum: 'APT-1002', patient: 'Tony Stark', patientNum: 'PAT-1002', age: 51, gender: 'Male', blood: 'A+', time: '10:30 AM', status: 'IN_QUEUE' }
  ]);

  const [activePatient, setActivePatient] = useState(queue[0]);
  const [p360Tab, setP360Tab] = useState('CONSULTATION');

  // Form State
  const [symptoms, setSymptoms] = useState('Chest tightness, mild fatigue');
  const [observations, setObservations] = useState('BP 130/85 mmHg, Normal S1 S2 heart sounds');
  const [diagnosis, setDiagnosis] = useState('Mild Essential Hypertension');
  const [treatment, setTreatment] = useState('Low sodium diet, regular exercise');
  const [followUp, setFollowUp] = useState('2026-09-28');

  const [medName, setMedName] = useState('Amolodipine 5mg');
  const [dosage, setDosage] = useState('1 tablet daily');
  const [duration, setDuration] = useState('30 days');

  const [labTest, setLabTest] = useState('Complete Blood Count (CBC)');
  const [consultCompleted, setConsultCompleted] = useState(false);

  const handleCompleteConsultation = () => {
    setConsultCompleted(true);
    alert("Consultation Completed! Prescription & Lab Recommendations dispatched.");
  };

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge-info">DOCTOR CLINICAL WORKSPACE</span>
            <h2>Dr. Ravi Kumar (Cardiology Specialist)</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>Attending Queue: {queue.length} Patients Scheduled Today</p>
          </div>
          <span className="badge badge-success">ON DUTY</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '20px' }}>
        {/* Queue List */}
        <div className="glass-card">
          <h3>Today's Patient Queue</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
            {queue.map(p => (
              <div
                key={p.id}
                onClick={() => { setActivePatient(p); setConsultCompleted(false); }}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: activePatient.id === p.id ? 'rgba(37, 99, 235, 0.12)' : 'var(--bg-surface)',
                  border: activePatient.id === p.id ? '1px solid var(--color-primary)' : '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{p.patient}</strong>
                  <span style={{ fontSize: '0.75rem', color: '#0284c7' }}>{p.time}</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '4px' }}>{p.patientNum} | {p.age} yrs / {p.gender}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Patient 360 Workspace */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '14px' }}>
            <div>
              <span className="badge badge-info">PATIENT 360° CLINICAL WORKSPACE</span>
              <h2 style={{ marginTop: '4px' }}>{activePatient.patient} ({activePatient.patientNum})</h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Age: {activePatient.age} | Gender: {activePatient.gender} | Blood: {activePatient.blood}</p>
            </div>

            {consultCompleted ? (
              <span className="badge badge-success">CONSULTATION COMPLETED</span>
            ) : (
              <button className="btn btn-primary" onClick={handleCompleteConsultation}>
                <CheckCircle size={16} /> Complete Consultation
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {['CONSULTATION', 'PRESCRIPTION', 'LAB_RECOMMENDATION', 'LAB_REPORTS', 'VISIT_HISTORY'].map(tab => (
              <button
                key={tab}
                className="btn"
                onClick={() => setP360Tab(tab)}
                style={{
                  fontSize: '0.75rem',
                  padding: '5px 10px',
                  background: p360Tab === tab ? 'var(--color-primary)' : 'var(--bg-surface)',
                  color: p360Tab === tab ? '#fff' : '#94a3b8',
                  border: '1px solid var(--border-color)'
                }}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>

          {p360Tab === 'CONSULTATION' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label>Presenting Symptoms</label>
                <textarea rows={2} value={symptoms} onChange={e => setSymptoms(e.target.value)} />
              </div>
              <div>
                <label>Clinical Observations & Vitals</label>
                <textarea rows={2} value={observations} onChange={e => setObservations(e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label>Diagnosis</label>
                  <input value={diagnosis} onChange={e => setDiagnosis(e.target.value)} />
                </div>
                <div>
                  <label>Follow-Up Date</label>
                  <input type="date" value={followUp} onChange={e => setFollowUp(e.target.value)} />
                </div>
              </div>
              <div>
                <label>Treatment Plan Notes</label>
                <textarea rows={2} value={treatment} onChange={e => setTreatment(e.target.value)} />
              </div>
            </div>
          )}

          {p360Tab === 'PRESCRIPTION' && (
            <div>
              <h3>Create Prescription</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', marginTop: '12px' }}>
                <div>
                  <label>Medicine</label>
                  <input value={medName} onChange={e => setMedName(e.target.value)} />
                </div>
                <div>
                  <label>Dosage</label>
                  <input value={dosage} onChange={e => setDosage(e.target.value)} />
                </div>
                <div>
                  <label>Duration</label>
                  <input value={duration} onChange={e => setDuration(e.target.value)} />
                </div>
              </div>
              <div style={{ marginTop: '14px', padding: '10px', background: 'rgba(22, 163, 74, 0.1)', borderRadius: '6px', border: '1px solid #16a34a', color: '#4ade80', fontSize: '0.85rem' }}>
                Prescription ready: <strong>{medName}</strong> - {dosage} ({duration})
              </div>
            </div>
          )}

          {p360Tab === 'LAB_RECOMMENDATION' && (
            <div>
              <h3>Recommend Laboratory Tests</h3>
              <div style={{ marginTop: '12px' }}>
                <label>Select Test</label>
                <select value={labTest} onChange={e => setLabTest(e.target.value)}>
                  <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC)</option>
                  <option value="Lipid Profile">Lipid Profile</option>
                  <option value="Liver Function Test (LFT)">Liver Function Test (LFT)</option>
                  <option value="Kidney Function Test (KFT)">Kidney Function Test (KFT)</option>
                </select>
              </div>
              <div style={{ marginTop: '14px', padding: '10px', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '6px', border: '1px solid #2563eb', color: '#38bdf8', fontSize: '0.85rem' }}>
                Order queued for Lab Technician: <strong>{labTest}</strong>
              </div>
            </div>
          )}

          {p360Tab === 'LAB_REPORTS' && (
            <div>
              <h3>Laboratory Test Reports Review</h3>
              <div style={{ padding: '14px', background: 'var(--bg-surface)', borderRadius: '8px', marginTop: '12px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <strong>CBC Blood Test Report</strong>
                  <span className="badge badge-success">COMPLETED</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Verified by Lab Technician</p>
                <div style={{ marginTop: '8px', padding: '8px', background: 'var(--bg-primary)', borderRadius: '4px', fontSize: '0.82rem', color: '#4ade80' }}>
                  Hemoglobin: 14.5 g/dL | WBC: 7,200 /mcL (Normal)
                </div>
              </div>
            </div>
          )}

          {p360Tab === 'VISIT_HISTORY' && (
            <div>
              <h3>Previous Medical Record Visits</h3>
              <div style={{ marginTop: '12px', padding: '12px', background: 'var(--bg-surface)', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>2026-08-20 — Routine Cardiac Checkup</span>
                <strong style={{ display: 'block', marginTop: '2px' }}>Mild Essential Hypertension</strong>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>Prescription: Amolodipine 5mg</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
