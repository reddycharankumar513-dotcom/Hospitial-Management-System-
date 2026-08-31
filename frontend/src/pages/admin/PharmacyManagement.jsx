import React, { useState } from 'react';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import { Pill, Plus, AlertTriangle, CheckCircle } from 'lucide-react';

export default function PharmacyManagement() {
  const [meds, setMeds] = useState([
    { id: 1, code: 'MED-7001', name: 'Amolodipine 5mg', gen: 'Amlodipine Besylate', cat: 'Cardiovascular', batch: 'BAT-2026-A1', expiry: '2027-12-31', qty: 120, reorder: 20, price: '$15.00', status: 'IN_STOCK' },
    { id: 2, code: 'MED-7002', name: 'Atorvastatin 20mg', gen: 'Atorvastatin Calcium', cat: 'Cardiovascular', batch: 'BAT-2026-A2', expiry: '2027-10-15', qty: 95, reorder: 15, price: '$22.00', status: 'IN_STOCK' },
    { id: 3, code: 'MED-7003', name: 'Metoprolol 50mg', gen: 'Metoprolol Succinate', cat: 'Cardiovascular', batch: 'BAT-2026-A3', expiry: '2027-08-20', qty: 80, reorder: 15, price: '$18.00', status: 'IN_STOCK' },
    { id: 4, code: 'MED-7004', name: 'Clopidogrel 75mg', gen: 'Clopidogrel Bisulfate', cat: 'Cardiovascular', batch: 'BAT-2026-A4', expiry: '2027-11-10', qty: 60, reorder: 10, price: '$30.00', status: 'IN_STOCK' },
    { id: 5, code: 'MED-7005', name: 'Lisinopril 10mg', gen: 'Lisinopril Dihydrate', cat: 'Cardiovascular', batch: 'BAT-2026-A5', expiry: '2027-09-05', qty: 110, reorder: 20, price: '$14.00', status: 'IN_STOCK' },

    { id: 6, code: 'MED-7006', name: 'Amoxicillin 500mg', gen: 'Amoxicillin Trihydrate', cat: 'Antibiotics', batch: 'BAT-2026-B1', expiry: '2027-06-30', qty: 8, reorder: 15, price: '$25.00', status: 'LOW_STOCK' },
    { id: 7, code: 'MED-7007', name: 'Azithromycin 500mg', gen: 'Azithromycin Dihydrate', cat: 'Antibiotics', batch: 'BAT-2026-B2', expiry: '2027-07-25', qty: 45, reorder: 10, price: '$35.00', status: 'IN_STOCK' },
    { id: 8, code: 'MED-7008', name: 'Ciprofloxacin 500mg', gen: 'Ciprofloxacin HCl', cat: 'Antibiotics', batch: 'BAT-2026-B3', expiry: '2027-05-18', qty: 50, reorder: 10, price: '$28.00', status: 'IN_STOCK' },
    { id: 9, code: 'MED-7009', name: 'Ceftriaxone 1g Inj', gen: 'Ceftriaxone Sodium', cat: 'Antibiotics', batch: 'BAT-2026-B4', expiry: '2026-11-12', qty: 30, reorder: 10, price: '$45.00', status: 'IN_STOCK' },

    { id: 10, code: 'MED-7010', name: 'Paracetamol 500mg', gen: 'Acetaminophen', cat: 'Analgesics', batch: 'BAT-2026-C1', expiry: '2028-01-31', qty: 300, reorder: 50, price: '$5.00', status: 'IN_STOCK' },
    { id: 11, code: 'MED-7011', name: 'Ibuprofen 400mg', gen: 'Ibuprofen', cat: 'Analgesics', batch: 'BAT-2026-C2', expiry: '2027-12-15', qty: 220, reorder: 30, price: '$8.00', status: 'IN_STOCK' },
    { id: 12, code: 'MED-7012', name: 'Tramadol 50mg', gen: 'Tramadol HCl', cat: 'Analgesics', batch: 'BAT-2026-C3', expiry: '2027-09-30', qty: 40, reorder: 10, price: '$18.00', status: 'IN_STOCK' },
    { id: 13, code: 'MED-7013', name: 'Diclofenac 50mg', gen: 'Diclofenac Sodium', cat: 'Analgesics', batch: 'BAT-2026-C4', expiry: '2027-04-20', qty: 75, reorder: 15, price: '$10.00', status: 'IN_STOCK' },

    { id: 14, code: 'MED-7014', name: 'Omeprazole 20mg', gen: 'Omeprazole Magnesium', cat: 'Gastrointestinal', batch: 'BAT-2026-D1', expiry: '2027-11-30', qty: 150, reorder: 25, price: '$12.00', status: 'IN_STOCK' },
    { id: 15, code: 'MED-7015', name: 'Pantoprazole 40mg', gen: 'Pantoprazole Sodium', cat: 'Gastrointestinal', batch: 'BAT-2026-D2', expiry: '2027-10-10', qty: 130, reorder: 20, price: '$16.00', status: 'IN_STOCK' },
    { id: 16, code: 'MED-7016', name: 'Ondansetron 4mg', gen: 'Ondansetron HCl', cat: 'Gastrointestinal', batch: 'BAT-2026-D3', expiry: '2027-08-14', qty: 85, reorder: 15, price: '$20.00', status: 'IN_STOCK' },

    { id: 17, code: 'MED-7017', name: 'Montelukast 10mg', gen: 'Montelukast Sodium', cat: 'Respiratory', batch: 'BAT-2026-E1', expiry: '2027-12-01', qty: 90, reorder: 15, price: '$24.00', status: 'IN_STOCK' },
    { id: 18, code: 'MED-7018', name: 'Cetirizine 10mg', gen: 'Cetirizine Dihydrochloride', cat: 'Respiratory', batch: 'BAT-2026-E2', expiry: '2028-02-28', qty: 180, reorder: 30, price: '$6.00', status: 'IN_STOCK' },
    { id: 19, code: 'MED-7019', name: 'Salbutamol Inhaler', gen: 'Albuterol Sulfate', cat: 'Respiratory', batch: 'BAT-2026-E3', expiry: '2027-06-15', qty: 5, reorder: 10, price: '$40.00', status: 'LOW_STOCK' },

    { id: 20, code: 'MED-7020', name: 'Metformin 500mg', gen: 'Metformin HCl', cat: 'Endocrinology', batch: 'BAT-2026-F1', expiry: '2027-11-20', qty: 250, reorder: 40, price: '$10.00', status: 'IN_STOCK' },
    { id: 21, code: 'MED-7021', name: 'Glimepiride 2mg', gen: 'Glimepiride', cat: 'Endocrinology', batch: 'BAT-2026-F2', expiry: '2027-09-10', qty: 110, reorder: 20, price: '$15.00', status: 'IN_STOCK' },
    { id: 22, code: 'MED-7022', name: 'Insulin Glargine 100IU', gen: 'Recombinant Insulin', cat: 'Endocrinology', batch: 'BAT-2026-F3', expiry: '2026-10-30', qty: 25, reorder: 10, price: '$85.00', status: 'IN_STOCK' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMed, setNewMed] = useState({ name: '', gen: '', cat: 'Cardiovascular', qty: '', price: '', expiry: '2027-12-31' });

  const handleAddMedicine = (e) => {
    e.preventDefault();
    const created = {
      id: Date.now(),
      code: `MED-${Math.floor(7023 + Math.random() * 500)}`,
      ...newMed,
      qty: parseInt(newMed.qty),
      batch: `BAT-2026-NEW`,
      status: parseInt(newMed.qty) < 15 ? 'LOW_STOCK' : 'IN_STOCK'
    };
    setMeds([...meds, created]);
    setIsModalOpen(false);
  };

  const columns = [
    { label: 'Med Code', key: 'code', render: m => <span className="badge badge-info">{m.code}</span> },
    { label: 'Medicine Brand / Generic Name', key: 'name', render: m => <div><strong>{m.name}</strong><br/><span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{m.gen}</span></div> },
    { label: 'Therapeutic Category', key: 'cat', render: m => <span className="badge badge-warning">{m.cat}</span> },
    { label: 'Batch No', key: 'batch' },
    { label: 'Expiry Date', key: 'expiry' },
    { label: 'Available Stock', key: 'qty', render: m => <strong style={{ color: m.qty < 15 ? '#ef4444' : '#10b981' }}>{m.qty} units</strong> },
    { label: 'Unit Price', key: 'price' },
    { label: 'Inventory Status', key: 'status', render: m => <span className={`badge ${m.status === 'IN_STOCK' ? 'badge-success' : 'badge-danger'}`}>{m.status}</span> }
  ];

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1>Pharmacy Inventory Catalog ({meds.length} Medicines)</h1>
        <p style={{ color: '#94a3b8' }}>Therapeutic categories, batch tracking, stock levels & expiry control</p>
      </div>

      <div className="glass-card">
        <DataTable
          columns={columns}
          data={meds}
          searchPlaceholder="Search medicine, generic name, category, batch..."
          actions={
            <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
              <Plus size={16} /> Add Medicine Batch
            </button>
          }
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Pharmacy Medicine Batch">
        <form onSubmit={handleAddMedicine}>
          <div style={{ marginBottom: '14px' }}>
            <label>Brand Name</label>
            <input required placeholder="e.g. Amolodipine 5mg" value={newMed.name} onChange={e => setNewMed({ ...newMed, name: e.target.value })} />
          </div>
          <div style={{ marginBottom: '14px' }}>
            <label>Generic Chemical Name</label>
            <input required placeholder="e.g. Amlodipine Besylate" value={newMed.gen} onChange={e => setNewMed({ ...newMed, gen: e.target.value })} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            <div>
              <label>Therapeutic Category</label>
              <select value={newMed.cat} onChange={e => setNewMed({ ...newMed, cat: e.target.value })}>
                <option value="Cardiovascular">Cardiovascular</option>
                <option value="Antibiotics">Antibiotics</option>
                <option value="Analgesics">Analgesics</option>
                <option value="Gastrointestinal">Gastrointestinal</option>
                <option value="Respiratory">Respiratory</option>
                <option value="Endocrinology">Endocrinology</option>
              </select>
            </div>
            <div>
              <label>Stock Quantity</label>
              <input type="number" required placeholder="100" value={newMed.qty} onChange={e => setNewMed({ ...newMed, qty: e.target.value })} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label>Unit Price ($)</label>
              <input required placeholder="$15.00" value={newMed.price} onChange={e => setNewMed({ ...newMed, price: e.target.value })} />
            </div>
            <div>
              <label>Batch Expiry Date</label>
              <input type="date" value={newMed.expiry} onChange={e => setNewMed({ ...newMed, expiry: e.target.value })} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Add Medicine Batch
          </button>
        </form>
      </Modal>
    </div>
  );
}
