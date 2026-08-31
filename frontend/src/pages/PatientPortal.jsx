import React, { useState } from 'react';
import { Search, Calendar, HeartPulse, UserCheck, TestTube, Pill, Receipt, Bell, ShieldCheck, Activity, CheckCircle, Clock } from 'lucide-react';
import DataTable from '../components/common/DataTable';
import Modal from '../components/common/Modal';

export default function PatientPortal() {
  const [symptomInput, setSymptomInput] = useState('');
  const [recommendation, setRecommendation] = useState(null);
  const [activeTab, setActiveTab] = useState('OVERVIEW');

  const [appointments, setAppointments] = useState([
    { id: 1, num: 'APT-1001', doctor: 'Dr. John Doe', dept: 'Cardiology', date: '2026-09-01', time: '09:00 AM', status: 'CONFIRMED' }
  ]);

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
  const [selectedDoc, setSelectedDoc] = useState('Dr. John Doe (Cardiology)');
  const [bookDate, setBookDate] = useState('2026-09-02');
  const [bookTime, setBookTime] = useState('10:00 AM');

  const handleSymptomSearch = (e) => {
    e.preventDefault();
    const sym = symptomInput.toLowerCase();
    if (sym.includes('chest') || sym.includes('heart') || sym.includes('bp')) {
      setRecommendation({ dept: 'Cardiology', spec: 'Cardiovascular Care', doctor: 'Dr. John Doe (Cardiology)', match: '98% High Match' });
    } else if (sym.includes('fever') || sym.includes('cough') || sym.includes('cold')) {
      setRecommendation({ dept: 'General Medicine', spec: 'Internal Medicine', doctor: 'Dr. Sarah Connor (General Medicine)', match: '95% High Match' });
    } else {
      setRecommendation({ dept: 'General Medicine', spec: 'General Physician', doctor: 'Dr. Sarah Connor (General Medicine)', match: '90% Match' });
    }
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();
    const appt = { id: Date.now(), num: `APT-${Math.floor(1000 + Math.random() * 9000)}`, doctor: selectedDoc, dept: 'Cardiology', date: bookDate, time: bookTime, status: 'BOOKED' };
    setAppointments([...appointments, appt]);
    setIsBookModalOpen(false);
  };

  const handlePayBill = (id) => {
    setBills(bills.map(b => b.id === id ? { ...b, status: 'PAID' } : b));
    alert("Payment settled successfully via UPI! PaymentCompleted event dispatched.");
  };

  return (
    <div>
      {/* Patient Portal Header Banner */}
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

        {/* Portal Nav Tabs */}
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

      {/* TAB CONTENT */}
      {activeTab === 'OVERVIEW' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Smart Doctor Recommendation Engine */}
          <div className="glass-card">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <HeartPulse color="#06b6d4" size={24} />
              <div>
                <h3>Smart Doctor & Department Recommendation Engine</h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Academic symptom-matching algorithm (Non-clinical academic decision support)</p>
              </div>
            </div>

            <form onSubmit={handleSymptomSearch} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <input
                placeholder="Describe your symptoms (e.g. chest tightness, high BP, fever, headache)..."
                value={symptomInput}
                onChange={e => setSymptomInput(e.target.value)}
                style={{ marginTop: 0 }}
              />
              <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
                <Search size={16} /> Recommend Doctor
              </button>
            </form>

            {recommendation && (
              <div style={{ padding: '16px', borderRadius: '10px', background: 'rgba(6,182,212,0.1)', border: '1px solid #06b6d4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span className="badge badge-success">{recommendation.match}</span>
                  <h4 style={{ marginTop: '6px' }}>Recommended Department: {recommendation.dept} ({recommendation.spec})</h4>
                  <p style={{ fontSize: '0.85rem', color: '#e2e8f0', marginTop: '2px' }}>Suggested Specialist: <strong>{recommendation.doctor}</strong></p>
                </div>
                <button className="btn btn-primary" onClick={() => { setSelectedDoc(recommendation.doctor); setIsBookModalOpen(true); }}>
                  Book Recommended Slot
                </button>
              </div>
            )}
          </div>

          {/* Quick Active Overview Grid */}
          <div className="grid-cols-4">
            <div className="glass-card">
              <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>UPCOMING APPOINTMENT</span>
              <h4 style={{ marginTop: '6px' }}>Dr. John Doe</h4>
              <p style={{ fontSize: '0.8rem', color: '#06b6d4', marginTop: '2px' }}>2026-09-01 (09:00 AM)</p>
            </div>
            <div className="glass-card">
              <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>ACTIVE PRESCRIPTION</span>
              <h4 style={{ marginTop: '6px' }}>Amolodipine 5mg</h4>
              <p style={{ fontSize: '0.8rem', color: '#10b981', marginTop: '2px' }}>1 tab daily for 30 days</p>
            </div>
            <div className="glass-card">
              <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>LAB TEST REPORT</span>
              <h4 style={{ marginTop: '6px' }}>CBC Blood Test</h4>
              <p style={{ fontSize: '0.8rem', color: '#38bdf8', marginTop: '2px' }}>Result Available (Normal)</p>
            </div>
            <div className="glass-card">
              <span style={{ color: '#94a3b8', fontSize: '0.78rem' }}>OUTSTANDING BILLS</span>
              <h4 style={{ marginTop: '6px' }}>$215.00 Invoice</h4>
              <p style={{ fontSize: '0.8rem', color: '#f59e0b', marginTop: '2px' }}>Pending Payment</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'APPOINTMENTS' && (
        <div className="glass-card">
          <h3>Your Appointments History</h3>
          <table>
            <thead>
              <tr><th>Appt #</th><th>Doctor</th><th>Department</th><th>Date & Time</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {appointments.map(a => (
                <tr key={a.id}>
                  <td><span className="badge badge-info">{a.num}</span></td>
                  <td><strong>{a.doctor}</strong></td>
                  <td>{a.dept}</td>
                  <td>{a.date} ({a.time})</td>
                  <td><span className={`badge ${a.status === 'CONFIRMED' ? 'badge-success' : 'badge-warning'}`}>{a.status}</span></td>
                  <td>
                    <button className="btn btn-secondary" style={{ padding: '4px 8px', fontSize: '0.75rem' }} onClick={() => {
                      setAppointments(appointments.filter(item => item.id !== a.id));
                    }}>Cancel</button>
                  </td>
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
              <tr><th>Doctor</th><th>Prescribed Date</th><th>Medicine</th><th>Dosage & Duration</th><th>Dispense Status</th></tr>
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
          <h3>Laboratory Test Reports</h3>
          <table>
            <thead>
              <tr><th>Test Name</th><th>Ordering Doctor</th><th>Date</th><th>Result Summary</th><th>Status</th></tr>
            </thead>
            <tbody>
              {labReports.map(l => (
                <tr key={l.id}>
                  <td><strong>{l.test}</strong></td>
                  <td>{l.doc}</td>
                  <td>{l.date}</td>
                  <td><span style={{ color: '#34d399', fontWeight: 600 }}>{l.result}</span></td>
                  <td><span className="badge badge-success">{l.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'BILLS' && (
        <div className="glass-card">
          <h3>Hospital Invoices & Payments</h3>
          <table>
            <thead>
              <tr><th>Invoice #</th><th>Billed Items</th><th>Total Amount</th><th>Status</th><th>Actions</th></tr>
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
                      <button className="btn btn-primary" style={{ padding: '4px 10px', fontSize: '0.75rem' }} onClick={() => handlePayBill(b.id)}>
                        Pay via UPI / Card
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Book Appointment Modal */}
      <Modal isOpen={isBookModalOpen} onClose={() => setIsBookModalOpen(false)} title="Book Doctor Consultation">
        <form onSubmit={handleBookSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label>Attending Doctor</label>
            <select value={selectedDoc} onChange={e => setSelectedDoc(e.target.value)}>
              <option value="Dr. John Doe (Cardiology)">Dr. John Doe (Cardiology)</option>
              <option value="Dr. Sarah Connor (General Medicine)">Dr. Sarah Connor (General Medicine)</option>
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
