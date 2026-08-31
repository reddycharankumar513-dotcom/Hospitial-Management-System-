import React, { useState } from 'react';
import { Search, Calendar, HeartPulse, UserCheck, TestTube, Pill, Receipt, Bell, ShieldCheck, Activity, CheckCircle, Clock } from 'lucide-react';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';

export default function PatientPortal({ doctors, appointments, onAddAppointment }) {
  const [symptomInput, setSymptomInput] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [activeTab, setActiveTab] = useState('OVERVIEW');

  const [prescriptions] = useState([
    { id: 1, doc: 'Dr. John Doe', date: '2026-08-29', med: 'Amolodipine 5mg', dose: '1 tab daily', dur: '30 days', status: 'DISPENSED' }
  ]);

  const [labReports] = useState([
    { id: 1, test: 'Complete Blood Count (CBC)', doc: 'Dr. John Doe', date: '2026-08-29', result: 'Hemoglobin: 14.5 g/dL (Normal)', status: 'COMPLETED' }
  ]);

  const [bills, setBills] = useState([
    { id: 1, inv: 'INV-9001', items: 'Consultation + Lab Test + Medicines', total: '$215.00', status: 'UNPAID' }
  ]);

  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(doctors[0] ? `${doctors[0].name} (${doctors[0].spec})` : '');
  const [bookDate, setBookDate] = useState('2026-09-02');
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
      match: '98% High Match'
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
    alert("Payment settled successfully via UPI! PaymentCompleted event dispatched.");
  };

  return (
    <div>
      <div className="glass-card" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(59,130,246,0.15))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span className="badge badge-info" style={{ marginBottom: '8px', display: 'inline-block' }}>PATIENT SELF-SERVICE PORTAL</span>
            <h2>Welcome back, Peter Parker (PAT-1001)</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>Blood Group: O+ | Age: 26 | Emergency Triage Status: <span className="badge badge-success">LOW RISK</span></p>
          </div>
          <button className="btn btn-primary" onClick={() => setIsBookModalOpen(true)}>
            <Calendar size={18} /> Book New Appointment
          </button>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '20px', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
          {['OVERVIEW', 'APPOINTMENTS', 'PRESCRIPTIONS', 'LAB_REPORTS', 'BILLS'].map(tab => (
            <button
              key={tab}
              className="btn"
              onClick={() => setActiveTab(tab)}
              style={{
                fontSize: '0.8rem',
                padding: '6px 14px',
                background: activeTab === tab ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'transparent',
                color: activeTab === tab ? '#fff' : '#94a3b8'
              }}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'OVERVIEW' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <HeartPulse color="#06b6d4" size={24} />
              <div>
                <h3>Smart Doctor Recommendation Engine</h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Input symptoms to match with our specialists automatically</p>
              </div>
            </div>

            <form onSubmit={handleSymptomSearch} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <input
                placeholder="Describe your symptoms (e.g. chest tightness, high BP, fever, joint pain)..."
                value={symptomInput}
                onChange={e => setSymptomInput(e.target.value)}
                style={{ marginTop: 0 }}
              />
              <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                <Search size={16} /> Match Doctor
              </button>
            </form>

            {recommendation && (
              <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(6,182,212,0.1)', border: '1px solid #06b6d4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span className="badge badge-success">{recommendation.match}</span>
                  <h4 style={{ marginTop: '6px' }}>Recommended: {recommendation.dept} ({recommendation.spec})</h4>
                  <p style={{ fontSize: '0.85rem', color: '#e2e8f0', marginTop: '2px' }}>Specialist Doctor: <strong>{recommendation.doctor}</strong> | Fee: <strong>{recommendation.fee}</strong></p>
                </div>
                <button className="btn btn-primary" onClick={() => { setSelectedDoc(recommendation.doctor); setIsBookModalOpen(true); }}>
                  Book Recommended Doctor
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'APPOINTMENTS' && (
        <div className="glass-card">
          <h3>Your Appointments History</h3>
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

      <Modal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} title="Book Doctor Consultation">
        <form onSubmit={handleBookSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label>Attending Doctor</label>
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
              <label>Consultation Date</label>
              <input type="date" value={bookDate} onChange={e => setBookDate(e.target.value)} />
            </div>
            <div>
              <label>Preferred Time Slot</label>
              <select value={bookTime} onChange={e => setBookTime(e.target.value)}>
                <option value="09:00 AM">09:00 AM</option>
                <option value="10:00 AM">10:00 AM</option>
                <option value="11:30 AM">11:30 AM</option>
                <option value="02:00 PM">02:00 PM</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Confirm Appointment Booking
          </button>
        </form>
      </Modal>
    </div>
  );
}
