import React, { useState } from 'react';
import { Search, Calendar, HeartPulse, User, TestTube, Pill, Receipt, CheckCircle } from 'lucide-react';
import Modal from '../components/common/Modal';

export default function PatientPortal({ doctors, appointments, onAddAppointment }) {
  const [symptomInput, setSymptomInput] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [activeTab, setActiveTab] = useState('OVERVIEW');

  const [prescriptions] = useState([
    { id: 1, doc: 'Dr. Ravi Kumar', date: '2026-08-29', med: 'Amolodipine 5mg', dose: '1 tablet daily', dur: '30 days', status: 'DISPENSED' }
  ]);

  const [labReports] = useState([
    { id: 1, test: 'Complete Blood Count (CBC)', doc: 'Dr. Ravi Kumar', date: '2026-08-29', result: 'Hemoglobin: 14.5 g/dL (Normal)', status: 'COMPLETED' }
  ]);

  const [bills, setBills] = useState([
    { id: 1, inv: 'INV-9001', items: 'Consultation + Lab Test + Medicines', total: '$215.00', status: 'UNPAID' }
  ]);

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(doctors[0] ? `${doctors[0].name} (${doctors[0].spec})` : '');
  const [bookDate, setBookDate] = useState('2026-09-05');
  const [bookTime, setBookTime] = useState('10:00 AM');

  const handleSymptomSearch = (e) => {
    e.preventDefault();
    const sym = symptomInput.toLowerCase();
    let matchedDoc = doctors.find(d => d.dept.toLowerCase().includes('cardio')) || doctors[0];
    if (sym.includes('fever') || sym.includes('cough') || sym.includes('cold')) {
      matchedDoc = doctors.find(d => d.dept.toLowerCase().includes('medicine') || d.dept.toLowerCase().includes('pediatric')) || doctors[0];
    } else if (sym.includes('bone') || sym.includes('joint') || sym.includes('pain')) {
      matchedDoc = doctors.find(d => d.dept.toLowerCase().includes('ortho')) || doctors[0];
    }

    setRecommendation({
      dept: matchedDoc.dept,
      spec: matchedDoc.spec,
      doctor: `${matchedDoc.name} (${matchedDoc.spec})`,
      fee: matchedDoc.fee,
      disclaimer: 'Academic Doctor Recommendation Match'
    });
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    const appt = {
      id: Date.now(),
      num: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
      doctor: selectedDoc,
      patient: 'Peter Parker',
      dept: 'Cardiology',
      date: bookDate,
      time: bookTime,
      status: 'BOOKED'
    };
    onAddAppointment(appt);
    setIsBookModalOpen(false);
  };

  const handlePayBill = (id) => {
    setBills(bills.map(b => b.id === id ? { ...b, status: 'PAID' } : b));
    alert("Payment settled successfully via UPI.");
  };

  return (
    <div>
      {/* Patient Header */}
      <div className="glass-card" style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge-info" style={{ marginBottom: '6px' }}>PATIENT PORTAL</span>
            <h2>Patient Dashboard — Peter Parker (PAT-1001)</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>Blood Group: O+ | Age: 26 | Triage Status: <span className="badge badge-success">LOW RISK</span></p>
          </div>
          <button className="btn btn-primary" onClick={() => setIsBookModalOpen(true)}>
            <Calendar size={16} /> Book Appointment
          </button>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '14px' }}>
          {['OVERVIEW', 'APPOINTMENTS', 'PRESCRIPTIONS', 'LAB_REPORTS', 'BILLS'].map(tab => (
            <button
              key={tab}
              className="btn"
              onClick={() => setActiveTab(tab)}
              style={{
                fontSize: '0.8rem',
                padding: '5px 12px',
                background: activeTab === tab ? 'var(--color-primary)' : 'transparent',
                color: activeTab === tab ? '#fff' : '#94a3b8'
              }}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'OVERVIEW' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Doctor Recommendation Matcher */}
          <div className="glass-card">
            <h3>Find Doctor by Symptoms</h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '12px' }}>Academic decision support matcher (non-clinical demo rule)</p>

            <form onSubmit={handleSymptomSearch} style={{ display: 'flex', gap: '10px', marginBottom: '14px' }}>
              <input
                placeholder="Enter symptoms (e.g. chest tightness, fever, joint pain)..."
                value={symptomInput}
                onChange={e => setSymptomInput(e.target.value)}
                style={{ marginTop: 0 }}
              />
              <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                <Search size={16} /> Match Doctor
              </button>
            </form>

            {recommendation && (
              <div style={{ padding: '14px', borderRadius: '8px', background: 'rgba(37, 99, 235, 0.08)', border: '1px solid #2563eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span className="badge badge-success">{recommendation.disclaimer}</span>
                  <h4 style={{ marginTop: '4px' }}>Recommended: {recommendation.dept} ({recommendation.spec})</h4>
                  <p style={{ fontSize: '0.85rem', color: '#e2e8f0', marginTop: '2px' }}>Attending Specialist: <strong>{recommendation.doctor}</strong> | Fee: <strong>{recommendation.fee}</strong></p>
                </div>
                <button className="btn btn-primary" onClick={() => { setSelectedDoc(recommendation.doctor); setIsBookModalOpen(true); }}>
                  Book Doctor
                </button>
              </div>
            )}
          </div>

          <div className="grid-cols-4">
            <div className="glass-card">
              <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>UPCOMING APPOINTMENT</span>
              <h4 style={{ marginTop: '4px' }}>Dr. Ravi Kumar</h4>
              <p style={{ fontSize: '0.8rem', color: '#38bdf8', marginTop: '2px' }}>2026-09-05 (09:00 AM)</p>
            </div>
            <div className="glass-card">
              <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>ACTIVE PRESCRIPTION</span>
              <h4 style={{ marginTop: '4px' }}>Amolodipine 5mg</h4>
              <p style={{ fontSize: '0.8rem', color: '#4ade80', marginTop: '2px' }}>1 tab daily for 30 days</p>
            </div>
            <div className="glass-card">
              <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>LAB TEST REPORT</span>
              <h4 style={{ marginTop: '4px' }}>CBC Blood Test</h4>
              <p style={{ fontSize: '0.8rem', color: '#38bdf8', marginTop: '2px' }}>Normal Findings</p>
            </div>
            <div className="glass-card">
              <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>UNPAID BILLS</span>
              <h4 style={{ marginTop: '4px' }}>$215.00 Invoice</h4>
              <p style={{ fontSize: '0.8rem', color: '#fbbf24', marginTop: '2px' }}>Pending Payment</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'APPOINTMENTS' && (
        <div className="glass-card">
          <h3>Your Appointments</h3>
          <table>
            <thead>
              <tr><th>Appt #</th><th>Doctor & Specialization</th><th>Date & Time</th><th>Status</th></tr>
            </thead>
            <tbody>
              {appointments.map(a => (
                <tr key={a.id}>
                  <td><span className="badge badge-info">{a.num}</span></td>
                  <td><strong>{a.doctor}</strong></td>
                  <td>{a.date} ({a.time})</td>
                  <td><span className={`badge ${a.status === 'CONFIRMED' ? 'badge-success' : 'badge-warning'}`}>{a.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'PRESCRIPTIONS' && (
        <div className="glass-card">
          <h3>Issued Prescriptions</h3>
          <table>
            <thead>
              <tr><th>Doctor</th><th>Date</th><th>Medicine</th><th>Dosage</th><th>Status</th></tr>
            </thead>
            <tbody>
              {prescriptions.map(p => (
                <tr key={p.id}>
                  <td><strong>{p.doc}</strong></td>
                  <td>{p.date}</td>
                  <td>{p.med}</td>
                  <td>{p.dose} ({p.dur})</td>
                  <td><span className="badge badge-success">{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'LAB_REPORTS' && (
        <div className="glass-card">
          <h3>Laboratory Reports</h3>
          <table>
            <thead>
              <tr><th>Test Name</th><th>Doctor</th><th>Date</th><th>Findings</th><th>Status</th></tr>
            </thead>
            <tbody>
              {labReports.map(l => (
                <tr key={l.id}>
                  <td><strong>{l.test}</strong></td>
                  <td>{l.doc}</td>
                  <td>{l.date}</td>
                  <td><span style={{ color: '#4ade80' }}>{l.result}</span></td>
                  <td><span className="badge badge-success">{l.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'BILLS' && (
        <div className="glass-card">
          <h3>Invoices & Billing</h3>
          <table>
            <thead>
              <tr><th>Invoice #</th><th>Items</th><th>Amount</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {bills.map(b => (
                <tr key={b.id}>
                  <td><span className="badge badge-info">{b.inv}</span></td>
                  <td>{b.items}</td>
                  <td><strong>{b.total}</strong></td>
                  <td><span className={`badge ${b.status === 'PAID' ? 'badge-success' : 'badge-warning'}`}>{b.status}</span></td>
                  <td>
                    {b.status === 'UNPAID' && (
                      <button className="btn btn-primary" style={{ padding: '3px 8px', fontSize: '0.75rem' }} onClick={() => handlePayBill(b.id)}>
                        Pay Invoice
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} title="Book Appointment">
        <form onSubmit={handleBookSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label>Select Doctor</label>
            <select value={selectedDoc} onChange={e => setSelectedDoc(e.target.value)}>
              {doctors.map(d => (
                <option key={d.id} value={`${d.name} (${d.spec})`}>
                  {d.name} - {d.spec} ({d.dept}) [{d.fee}]
                </option>
              ))}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label>Date</label>
              <input type="date" value={bookDate} onChange={e => setBookDate(e.target.value)} />
            </div>
            <div>
              <label>Time Slot</label>
              <select value={bookTime} onChange={e => setBookTime(e.target.value)}>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Confirm Appointment
          </button>
        </form>
      </Modal>
    </div>
  );
}
