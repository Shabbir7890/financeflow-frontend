import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiUpload, HiDocumentText } from 'react-icons/hi';
import client from '../../api/client';
import toast from 'react-hot-toast';

export default function CSVUpload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) return toast.error('Please select a CSV file');
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await client.post('/csv/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' }});
      toast.success(`Parsed ${res.data.total_rows} rows`);
      navigate('/csv-preview', { state: { uploadData: res.data }});
    } catch (err) { toast.error(err.response?.data?.detail || 'Upload failed'); }
    setLoading(false);
  };

  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f?.name.endsWith('.csv')) setFile(f); else toast.error('Only CSV files accepted'); };

  return (
    <div className="animate-fade">
      <div className="page-header"><h1>CSV Upload</h1><p>Upload your bank statement CSV to import transactions</p></div>
      <div className="card" style={{ maxWidth: '600px' }}>
        <div className={`drop-zone ${dragOver ? 'active' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)} onDrop={handleDrop}
          onClick={() => document.getElementById('csv-file-input').click()}>
          <HiUpload size={48} style={{ color: 'var(--primary)', marginBottom: '16px' }} />
          <p style={{ fontWeight: 600, marginBottom: '8px' }}>Drag & drop your CSV file here</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>or click to browse</p>
          <input type="file" accept=".csv" id="csv-file-input" style={{ display: 'none' }}
            onChange={e => setFile(e.target.files[0])} />
        </div>
        {file && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '16px', padding: '12px', background: 'var(--bg-dark)', borderRadius: 'var(--radius-sm)' }}>
            <HiDocumentText size={24} style={{ color: 'var(--success)' }} />
            <div><p style={{ fontWeight: 600 }}>{file.name}</p><p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{(file.size / 1024).toFixed(1)} KB</p></div>
          </div>
        )}
        <button onClick={handleUpload} className="btn btn-primary" style={{ marginTop: '20px', width: '100%' }} disabled={!file || loading}>
          {loading ? 'Processing...' : 'Upload & Parse'}
        </button>
      </div>
      <style>{`.drop-zone { border: 2px dashed var(--border); border-radius: var(--radius-md); padding: 48px; text-align: center; cursor: pointer; transition: var(--transition); } .drop-zone:hover, .drop-zone.active { border-color: var(--primary); background: rgba(124,58,237,0.05); }`}</style>
    </div>
  );
}
