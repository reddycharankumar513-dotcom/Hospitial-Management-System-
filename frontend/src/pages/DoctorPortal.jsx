import React, { useState } from 'react';
import { Activity, UserCheck, FileText, Pill, TestTube, CheckCircle, Calendar, Clock, AlertCircle } from 'lucide-react';
import Modal from '../components/common/Modal';

export default function DoctorPortal() {
  const [queue] = useState([
    { id: 1, apptNum: 'APT-1001', patient: 'Peter Parker', patientNum: 'PAT-1001', age: 26, gender: 'Male', blood: 'O+', time: '09:00 AM', status: 'IN_QUEUE' },
    { id: 2, apptNum: 'APT-1002', patient: 'Tony Stark', patientNum: 'PAT-1002', age: 51, gender: 'Male', blood: 'A+', time: '10:30 AM', status: 'IN_QUEUE' }
  ]);

  const [activePatient, setActivePatient] = useState(queue[0]);
  const [p360Tab, setP360Tab] = useState('CONSULTATION');

  // Consultation Form State
  const [symptoms, setSymptoms] = useState('Chest tightness, mild fatigue');
  const [observations, setObservations] = useState('BP 130/85, Normal heart sounds S1 S2');
  const [diagnosis, setDiagnosis] = useState('Mild Essential Hypertension');
  const [treatment, setTreatment] = useState('Low sodium diet, regular aerobic exercise');
  const [followUp, setFollowUp] = useState('2026-09-28');

  // Prescription State
  const [medName, setMedName] = useState('Amolodipine 5mg');
  const [dosage, setDosage] = useState('1 tablet daily');
  const [duration, setDuration] = useState('30 days');

  // Lab Rec State
  const [labTest, setLabTest] = useState('Complete Blood Count (CBC)');

  const [consultCompleted, setConsultCompleted] = useState(false);

  const handleCompleteConsultation = () => {
    setConsultCompleted(true);
    alert("Consultation Completed! Prescription & Lab Recommendation dispatches Kafka events to Pharmacy, Lab, and Billing.");
  };

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(59,130,246,0.15))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge-info">DOCTOR CLINICAL WORKSPACE</span>
            <h2>Dr. John Doe (Cardiology Specialist)</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>Attending Queue: {queue.length} Patients Scheduled Today</p>
          </div>
          <div className="badge badge-success" style={{ padding: '8px 14px' }}>ONLINE & AVAILABLE</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '24px' }}>
        {/* Today's Queue Column */}
        <div className="glass-card">
          <h3>Today's Patient Queue</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
            {queue.map(p => (
              <div
                key={p.id}
                onClick={() => { setActivePatient(p); setConsultCompleted(false); }}
                style={{
                  padding: '12px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  background: activePatient.id === p.id ? 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(59,130,246,0.2))' : 'rgba(255,255,255,0.03)',
                  border: activePatient.id === p.id ? '1px solid #06b6d4' : '1px solid var(--border-color)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{p.patient}</strong>
                  <span style={{ fontSize: '0.75rem', color: '#06b6d4' }}>{p.time}</span>
                </div>
                <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '4px' }}>{p.patientNum} | {p.age} yrs / {p.gender}</p>
              </div>
            ))}
          </div>
        </div>

        {/* MANDATORY PATIENT 360° WORKSPACE */}
        <div className="glass-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px', marginBottom: '16px' }}>
            <div>
              <span className="badge badge-info">PATIENT 360° CLINICAL WORKSPACE</span>
              <h2 style={{ marginTop: '4px' }}>{activePatient.patient} ({activePatient.patientNum})</h2>
              <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Age: {activePatient.age} | Gender: {activePatient.gender} | Blood: {activePatient.blood}</p>
            </div>

            {consultCompleted ? (
              <span className="badge badge-success" style={{ padding: '8px 14px' }}>CONSULTATION COMPLETED</span>
            ) : (
              <button className="btn btn-primary" onClick={handleCompleteConsultation}>
                <CheckCircle size={16} /> Complete Consultation
              </button>
            )}
          </div>

          {/* 360° Tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
            {['CONSULTATION', 'PRESCRIPTION', 'LAB_RECOMMENDATION', 'LAB_REPORTS', 'VISIT_HISTORY'].map(tab => (
              <button
                key={tab}
                className="btn"
                onClick={() => setP360Tab(tab)}
                style={{
                  fontSize: '0.75rem',
                  padding: '6px 12px',
                  background: p360Tab === tab ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'var(--bg-surface)',
                  color: p360Tab === tab ? '#fff' : '#94a3b8',
                  border: '1px solid var(--border-color)'
                }}
              >
                {tab.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* TAB 1: CONSULTATION */}
          {p360Tab === 'CONSULTATION' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label>Presenting Symptoms</label>
                <textarea rows={2} value={symptoms} onChange={e => setSymptoms(e.target.value)} />
              </div>
              <div>
                <label>Clinical Observations & Vitals</label>
                <textarea rows={2} value={observations} onChange={e => setObservations(e.target.value)} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label>Diagnosis Notes</label>
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

          {/* TAB 2: PRESCRIPTION */}
          {p360Tab === 'PRESCRIPTION' && (
            <div>
              <h3>Create Prescription</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '12px', marginTop: '14px' }}>
                <div>
                  <label>Medicine Name</label>
                  <input value={medName} onChange={e => setMedName(e.target.value)} />
                </div>
                <div>
                  <label>Dosage & Frequency</label>
                  <input value={dosage} onChange={e => setDosage(e.target.value)} />
                </div>
                <div>
                  <label>Duration</label>
                  <input value={duration} onChange={e => setDuration(e.target.value)} />
                </div>
              </div>
              <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(16,185,129,0.1)', borderRadius: '8px', border: '1px solid #10b981', color: '#34d399', fontSize: '0.85rem' }}>
                Prescription ready: <strong>{medName}</strong> - {dosage} ({duration})
              </div>
            </div>
          )}

          {/* TAB 3: LAB RECOMMENDATION */}
          {p360Tab === 'LAB_RECOMMENDATION' && (
            <div>
              <h3>Recommend Laboratory Tests</h3>
              <div style={{ marginTop: '14px' }}>
                <label>Select Test</label>
                <select value={labTest} onChange={e => setLabTest(e.target.value)}>
                  <option value="Complete Blood Count (CBC)">Complete Blood Count (CBC)</option>
                  <option value="Lipid Profile">Lipid Profile</option>
                  <option value="Liver Function Test (LFT)">Liver Function Test (LFT)</option>
                  <option value="Kidney Function Test (KFT)">Kidney Function Test (KFT)</option>
                </select>
              </div>
              <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(6,182,212,0.1)', borderRadius: '8px', border: '1px solid #06b6d4', color: '#38bdf8', fontSize: '0.85rem' }}>
                Recommended Order: <strong>{labTest}</strong> (Dispatches order to Lab Technician Queue)
              </div>
            </div>
          )}

          {/* TAB 4: LAB REPORTS REVIEW */}
          {p360Tab === 'LAB_REPORTS' && (
            <div>
              <h3>Completed Laboratory Reports Review</h3>
              <div style={{ padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', marginTop: '14px', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <strong>CBC Blood Test Report</strong>
                  <span className="badge badge-success">COMPLETED & VERIFIED</span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>Sample Collected: 2026-08-29 09:30 AM | Verified by Lab Tech Alex Mercer</p>
                <div style={{ marginTop: '12px', padding: '10px', background: 'var(--bg-surface)', borderRadius: '6px', fontSize: '0.85rem', color: '#34d399' }}>
                  Hemoglobin: 14.5 g/dL | WBC: 7,200 /mcL | Platelets: 250,000 /mcL (All Normal Parameters)
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: VISIT HISTORY */}
          {p360Tab === 'VISIT_HISTORY' && (
            <div>
              <h3>Previous Medical Record Visits</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '14px' }}>
                <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#94a3b8' }}>
                    <span>Visit Date: 2026-08-20</span>
                    <span>Attending: Dr. John Doe</span>
                  </div>
                  <strong style={{ fontSize: '0.9rem', display: 'block', marginTop: '4px' }}>Routine Cardiac Checkup</strong>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '2px' }}>Diagnosis: Mild Hypertension | Rx: Amolodipine 5mg</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
