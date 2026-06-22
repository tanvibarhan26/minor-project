import React, { useState } from 'react';
import { Book, FileCode, Shield, Zap, Terminal, Copy, Check } from 'lucide-react';
import './DocsPage.css';

const DocsPage = () => {
  const [activeTab, setActiveTab] = useState('getting-started');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'getting-started':
        return (
          <>
            <h1>Getting Started with DataCleanse.AI</h1>
            <p className="lead">Learn how to automate your data integrity workflows using our AI-powered engine.</p>
            
            <section>
              <h2>Introduction</h2>
              <p>DataCleanse.AI is a next-generation data processing platform designed to detect anomalies, fix formatting, and generate intelligent insights from raw datasets instantly.</p>
            </section>

            <section>
              <h2>How it Works</h2>
              <div className="step">
                <div className="step-number">1</div>
                <div>
                  <h3>Upload Your Dataset</h3>
                  <p>Upload any CSV file to the processing engine. We support datasets of all sizes.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div>
                  <h3>Select Domain</h3>
                  <p>Choose from Healthcare, E-commerce, Real Estate, or General domains for specialized AI cleaning logic.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div>
                  <h3>Review & Export</h3>
                  <p>Review the AI correction report and export your cleaned data with one click.</p>
                </div>
              </div>
            </section>
          </>
        );
      case 'api':
        return (
          <>
            <h1>API Reference</h1>
            <p className="lead">Integrate DataCleanse.AI directly into your own applications via our REST API.</p>
            
            <section className="api-endpoint">
              <div className="endpoint-header">
                <span className="method post">POST</span>
                <span className="url">/api/analyze</span>
              </div>
              <p>Analyzes and corrects a dataset based on the specified domain.</p>
              
              <h4>Request Body (Form Data)</h4>
              <ul className="api-params">
                <li><code>file</code>: The CSV file to process.</li>
                <li><code>domain</code>: (Optional) "healthcare", "ecommerce", "realestate", or "general".</li>
              </ul>

              <h4>Example Request</h4>
              <div className="code-block">
                <pre>
{`curl -X POST http://localhost:8000/api/analyze \\
  -F "file=@data.csv" \\
  -F "domain=ecommerce"`}
                </pre>
                <button className="copy-btn" onClick={() => handleCopy('curl -X POST http://localhost:8000/api/analyze -F "file=@data.csv" -F "domain=ecommerce"')}>
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </section>
          </>
        );
      case 'security':
        return (
          <>
            <h1>Security & Privacy</h1>
            <p className="lead">Your data security is our top priority. Here's how we protect your information.</p>
            
            <section>
              <h2>Data Encryption</h2>
              <p>All datasets are encrypted at rest and in transit. We use industry-standard AES-256 encryption to ensure your raw data remains private.</p>
            </section>

            <section className="info-box">
              <h3><Shield size={20} /> SOC2 Compliant</h3>
              <p>Our infrastructure is fully SOC2 Type II compliant, meeting the highest standards for security and availability.</p>
            </section>
          </>
        );
      case 'best-practices':
        return (
          <>
            <h1>Best Practices</h1>
            <p className="lead">Optimize your data processing by following these expert recommendations.</p>
            
            <section>
              <h2>Clean Header Names</h2>
              <p>Ensure your CSV headers are clear and descriptive. The AI engine uses header context to determine the best cleaning strategy.</p>
            </section>

            <section>
              <h2>Consistent Delimiters</h2>
              <p>Always use commas as delimiters for maximum compatibility. Our engine automatically detects semicolons and tabs, but commas are preferred.</p>
            </section>
          </>
        );
      case 'cli':
        return (
          <>
            <h1>CLI Tool</h1>
            <p className="lead">Process large datasets directly from your terminal using our command-line interface.</p>
            
            <section>
              <h2>Installation</h2>
              <div className="code-block">
                <pre>npm install -g @datacleanse/cli</pre>
              </div>
            </section>

            <section>
              <h2>Usage</h2>
              <div className="code-block">
                <pre>datacleanse process ./my-data.csv --domain healthcare</pre>
              </div>
            </section>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="docs-page">
      <div className="docs-sidebar glass-panel">
        <h3>Documentation</h3>
        <ul>
          <li className={activeTab === 'getting-started' ? 'active' : ''} onClick={() => setActiveTab('getting-started')}>
            <Book size={18} /> Getting Started
          </li>
          <li className={activeTab === 'api' ? 'active' : ''} onClick={() => setActiveTab('api')}>
            <FileCode size={18} /> API Reference
          </li>
          <li className={activeTab === 'security' ? 'active' : ''} onClick={() => setActiveTab('security')}>
            <Shield size={18} /> Security
          </li>
          <li className={activeTab === 'best-practices' ? 'active' : ''} onClick={() => setActiveTab('best-practices')}>
            <Zap size={18} /> Best Practices
          </li>
          <li className={activeTab === 'cli' ? 'active' : ''} onClick={() => setActiveTab('cli')}>
            <Terminal size={18} /> CLI Tool
          </li>
        </ul>
      </div>
      
      <div className="docs-content glass-panel">
        {renderContent()}
        
        <section className="info-box">
          <h3><Terminal size={20} /> Pro Tip</h3>
          <p>You can use our REST API to automate your data cleaning pipelines. Check the API Reference for more details.</p>
        </section>
      </div>
    </div>
  );
};

export default DocsPage;
