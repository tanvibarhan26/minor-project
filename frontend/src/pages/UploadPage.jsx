import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, File, AlertCircle, CheckCircle, Database, Cpu, Search, Sparkles } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import api from '../api';
import './UploadPage.css';

const UploadPage = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const [file, setFile] = useState(null);
  const [domain, setDomain] = useState('general');
  const [isUploading, setIsUploading] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const playPopSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
    audio.play().catch(err => console.log('Sound play blocked by browser:', err));
  };

  const handleProcess = async () => {
    if (!file) return;
    setIsUploading(true);
    setProcessingStep(1);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('domain', domain);

    let apiResponse = null;
    let apiError = null;

    // Start API request
    const apiCall = api.post('/api/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => {
      apiResponse = res;
    }).catch(err => {
      apiError = err;
    });

    // Step through 1 to 4 with exactly 875ms delay (875ms * 4 steps = 3500ms / 3.5 seconds total)
    const runTimeline = async () => {
      return new Promise((resolve) => {
        let step = 1;
        const interval = setInterval(() => {
          step += 1;
          if (step <= 4) {
            setProcessingStep(step);
          } else {
            clearInterval(interval);
            resolve();
          }
        }, 875);
      });
    };

    // Wait for BOTH the API call and the visual timeline to complete
    await Promise.all([apiCall, runTimeline()]);

    setIsUploading(false);
    setProcessingStep(0);

    if (apiError) {
      console.error("Error analyzing file:", apiError);
      addNotification(
        'Connection Error', 
        'Could not reach the analysis server. Please ensure the backend is running.',
        'error'
      );
      return;
    }

    if (apiResponse && apiResponse.data.status === 'success') {
      playPopSound();
      addNotification(
        'Processing Complete!', 
        `Your file "${file.name}" has been successfully analyzed.`,
        'success'
      );
      navigate('/dashboard', { state: { analysisData: apiResponse.data } });
    } else {
      addNotification(
        'Analysis Failed', 
        apiResponse?.data?.message || 'There was an error processing your file.',
        'error'
      );
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-header">
        <h2>Analyze & Correct Dataset</h2>
        <p>Upload your messy CSV data and select a domain for tailored AI processing.</p>
      </div>

      <div className="upload-container glass-panel">
        <div className="domain-selector">
          <label>Select Domain Context</label>
          <select value={domain} onChange={(e) => setDomain(e.target.value)} className="glass-input">
            <option value="general">General (Auto-detect)</option>
            <option value="ecommerce">E-commerce Products</option>
            <option value="healthcare">Healthcare & Patient Data</option>
            <option value="education">Student Performance</option>
            <option value="realestate">Real Estate Listings</option>
            <option value="social">Social Media Analytics</option>
          </select>
        </div>

        <div 
          className={`dropzone ${file ? 'has-file' : ''}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {!file ? (
            <>
              <div className="upload-icon-pulse">
                <UploadCloud size={48} color="var(--accent-primary)" />
              </div>
              <h3>Drag & Drop your dataset here</h3>
              <p>Supports CSV, Excel (XLSX/XLS), and JSON</p>
              <input 
                type="file" 
                accept=".csv,.xlsx,.xls,.json" 
                onChange={handleFileChange} 
                className="file-input"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="btn-outline mt-4">
                Browse Files
              </label>
            </>
          ) : (
            <div className="file-info">
              <File size={48} color="var(--accent-neon)" />
              <h3>{file.name}</h3>
              <p>{(file.size / 1024).toFixed(2)} KB</p>
              <button className="btn-text" onClick={() => setFile(null)}>
                Remove file
              </button>
            </div>
          )}
        </div>

        <div className="compliance-terms-container">
          <label className="compliance-checkbox-label">
            <div className="custom-checkbox-wrapper">
              <input 
                type="checkbox" 
                checked={termsAccepted} 
                onChange={(e) => setTermsAccepted(e.target.checked)} 
                className="hidden-checkbox"
                id="terms-check"
              />
              <div className={`custom-checkbox-bullet ${termsAccepted ? 'checked' : ''}`}>
                {termsAccepted && <CheckCircle size={12} />}
              </div>
            </div>
            <span className="terms-text">
              I certify that this dataset complies with the <strong>DataCleanse.AI Data Processing Policy</strong>. 
              I verify that all critical personal identifiable information (PII) has been properly scrubbed, and I have lawful authorization to process this data in compliance with regulatory laws (GDPR, HIPAA, DPDP Act).
            </span>
          </label>
        </div>

        <div className="upload-actions">
          <button 
            className={`btn-primary w-full ${!file || isUploading || !termsAccepted ? 'disabled' : ''}`}
            onClick={handleProcess}
            disabled={!file || isUploading || !termsAccepted}
          >
            {isUploading ? (
              <>
                <div className="spinner"></div> Processing Data...
              </>
            ) : (
              <>
                <Database size={20} /> Process & Analyze
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="info-cards">
        <div className="info-card glass-panel">
          <AlertCircle color="var(--accent-purple)" size={24} />
          <div>
            <h4>Privacy First</h4>
            <p>Your data is processed in memory and never permanently stored without permission.</p>
          </div>
        </div>
        <div className="info-card glass-panel">
          <CheckCircle color="var(--accent-success)" size={24} />
          <div>
            <h4>Supported Formats</h4>
            <p>Automatically convert CSV, Excel (XLSX/XLS), and JSON files to clean CSV data.</p>
          </div>
        </div>
      </div>
      
      {isUploading && (
        <div className="processing-modal-overlay">
          <div className="processing-modal glass-panel">
            <div className="processing-header">
              <div className="neural-glow-loader">
                <Sparkles size={32} className="sparkle-glow animate-pulse" />
              </div>
              <h3>Neural Correction in Progress...</h3>
              <p>Analyzing dataset structure, anomalies, and drift models.</p>
            </div>

            <div className="timeline-container">
              <div className="timeline-line">
                <div 
                  className="timeline-line-fill" 
                  style={{ height: `${Math.max(0, ((processingStep - 1) / 3) * 100)}%` }}
                ></div>
              </div>

              <div className="timeline-steps">
                <div className={`timeline-step ${processingStep >= 1 ? 'active' : ''} ${processingStep > 1 ? 'completed' : ''}`}>
                  <div className="step-bullet">
                    {processingStep > 1 ? <CheckCircle size={18} /> : <Database size={18} />}
                  </div>
                  <div className="step-info">
                    <h4>Ingesting Dataset</h4>
                    <p>Reading rows, headers, and parsing schema details...</p>
                  </div>
                </div>

                <div className={`timeline-step ${processingStep >= 2 ? 'active' : ''} ${processingStep > 2 ? 'completed' : ''}`}>
                  <div className="step-bullet">
                    {processingStep > 2 ? <CheckCircle size={18} /> : <Search size={18} />}
                  </div>
                  <div className="step-info">
                    <h4>Detecting Anomalies</h4>
                    <p>Searching for duplicate rows, structural mismatches, and NaN elements...</p>
                  </div>
                </div>

                <div className={`timeline-step ${processingStep >= 3 ? 'active' : ''} ${processingStep > 3 ? 'completed' : ''}`}>
                  <div className="step-bullet">
                    {processingStep > 3 ? <CheckCircle size={18} /> : <Cpu size={18} />}
                  </div>
                  <div className="step-info">
                    <h4>Neural Imputation</h4>
                    <p>Executing AI learning regressions to auto-fill and correct values...</p>
                  </div>
                </div>

                <div className={`timeline-step ${processingStep >= 4 ? 'active' : ''} ${processingStep > 4 ? 'completed' : ''}`}>
                  <div className="step-bullet">
                    {processingStep >= 4 ? <CheckCircle size={18} /> : <Sparkles size={18} />}
                  </div>
                  <div className="step-info">
                    <h4>Compiling Reports</h4>
                    <p>Finalizing data health index scores and structural logs...</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPage;
