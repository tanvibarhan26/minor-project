import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, HeartPulse, GraduationCap, Home, TrendingUp, 
  ArrowRight, Zap, ShieldCheck, BarChart2, Search, UploadCloud, 
  CheckCircle, AlertTriangle, MessageSquare, Star, Play, 
  Layers, Database, FileText, Activity, LayoutDashboard, Check,
  Sparkles, Eye, Share2, Code, Shield, BarChart3, ChevronRight
} from 'lucide-react';
import AIChatbot from '../components/AIChatbot';
import './LandingPage.css';

const DomainCard = ({ icon: Icon, title, description, color, onClick }) => (
  <div className="domain-card glass-panel" onClick={onClick}>
    <div className="domain-icon-wrapper" style={{ backgroundColor: `${color}20`, color: color }}>
      <Icon size={32} />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
    <span className="learn-more">Explore AI Model &rarr;</span>
  </div>
);

const LandingPage = () => {
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;
  const [activeStep, setActiveStep] = React.useState(null);
  const [selectedDomain, setSelectedDomain] = React.useState(null);
  const [showDemo, setShowDemo] = React.useState(false);
  const [demoStage, setDemoStage] = React.useState(0);

  const startDemo = () => {
    setShowDemo(true);
    setDemoStage(1);
    setTimeout(() => setDemoStage(2), 2000);
    setTimeout(() => setDemoStage(3), 4000);
  };

  const closeDemo = () => {
    setShowDemo(false);
    setDemoStage(0);
  };
  
  const stats = [
    { label: "Files Cleaned", value: "1.2M+" },
    { label: "Accuracy Rate", value: "99.9%" },
    { label: "Time Saved", value: "850k hrs" },
    { label: "Active Users", value: "50k+" }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$0",
      features: ["5 Files / month", "Basic AI Detection", "CSV Support", "Community Support"],
      cta: "Get Started",
      highlight: false
    },
    {
      name: "Pro",
      price: "$29",
      features: ["Unlimited Files", "Advanced Neural Fixing", "Excel & JSON Support", "Priority API Access", "Custom Rules"],
      cta: "Go Pro Now",
      highlight: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      features: ["Dedicated AI Instance", "SLA Guarantee", "On-premise Deployment", "24/7 Phone Support", "SSO & Security"],
      cta: "Contact Sales",
      highlight: false
    }
  ];

  const domains = [
    {
      icon: ShoppingCart,
      id: 'ecommerce',
      title: "E-commerce",
      description: "Clean product data, fix categories, and auto-generate review summaries.",
      color: "var(--accent-primary)",
      details: {
        ai_model: "NLP-X Transformer",
        features: ["Price Normalization", "Category Mapping", "Review Sentiment", "Stock Prediction"],
        rule: "Automatically detects negative pricing and corrects currency inconsistencies across global marketplaces."
      }
    },
    {
      icon: HeartPulse,
      id: 'healthcare',
      title: "Healthcare",
      description: "Detect missing fields, correct out-of-range values, and get health insights.",
      color: "var(--accent-success)",
      details: {
        ai_model: "BioMed Logic Engine",
        features: ["Patient ID Validation", "Lab Result Normalization", "Age Outlier Correction", "HIPAA Compliance Check"],
        rule: "Uses probabilistic models to fill missing diagnostic codes based on surrounding clinical text."
      }
    },
    {
      icon: GraduationCap,
      id: 'education',
      title: "Education",
      description: "Cleanse student performance data and generate AI feedback.",
      color: "var(--accent-purple)",
      details: {
        ai_model: "EduLearn Insights V2",
        features: ["Grade Curve Normalization", "Attendance Pattern Analysis", "Performance Prediction", "Resource Allocation"],
        rule: "Standardizes disparate grading scales (4.0, 100%, A-F) into a unified performance metric."
      }
    },
    {
      icon: Home,
      id: 'realestate',
      title: "Real Estate",
      description: "Fix property inconsistencies and uncover undervalued listings.",
      color: "var(--accent-neon)",
      details: {
        ai_model: "PropTech Vision AI",
        features: ["Address Standardization", "SqFt Discrepancy Fix", "Price-to-Value Index", "Zoning Validation"],
        rule: "Detects square-footage anomalies by comparing property types with regional historical averages."
      }
    },
    {
      icon: TrendingUp,
      id: 'socialmedia',
      title: "Social Media",
      description: "Standardize hashtags, remove duplicates, and analyze sentiment.",
      color: "var(--accent-danger)",
      details: {
        ai_model: "StreamSense NLP",
        features: ["Hashtag Clustering", "Duplicate Post Removal", "Engagement Analytics", "Spam Detection"],
        rule: "Identifies and groups similar social posts across platforms to eliminate redundancy in sentiment reports."
      }
    }
  ];

  return (
    <div className="landing-page">
      <div className="bg-glow-top"></div>
      
      <section className="hero-section">
        {user ? (
          user.role === 'admin' ? (
            <div className="welcome-back-hero admin-hero">
              <div className="hero-badge admin-badge">🛡️ Welcome back, Admin {user.username}!</div>
              <h1 className="hero-title">System Console & <span className="text-gradient">Admin Center</span></h1>
              <p className="hero-subtitle">Manage registered accounts, check continuous sentinel health, and monitor global database events.</p>
              <div className="hero-cta">
                <Link to="/admin" className="btn-primary btn-lg">Go to Admin Console</Link>
                <Link to="/sentinel" className="btn-outline btn-lg">Monitor Sentinel</Link>
              </div>
            </div>
          ) : (
            <div className="welcome-back-hero">
              <div className="hero-badge">Welcome back, {user.username}!</div>
              <h1 className="hero-title">Ready to Clean More <span className="text-gradient">Data?</span></h1>
              <p className="hero-subtitle">Your neural workspace is ready. Drop a file below to begin processing.</p>
              <div className="hero-cta">
                <Link to="/upload" className="btn-primary btn-lg">Go to Workspace</Link>
                <Link to="/dashboard" className="btn-outline btn-lg">View Analytics</Link>
              </div>
            </div>
          )
        ) : (
          <>
            <div className="hero-badge">✨ Welcome back! Start exploring...</div>
            <h1 className="hero-title">
              Clean Your CSV Data <br />
              <span className="text-gradient">with Neural Intelligence</span>
            </h1>
            <p className="hero-subtitle">
              Detect duplicates, fix formatting issues, remove missing values, and improve data quality instantly 
              with our production-ready AI engine.
            </p>
            <div className="hero-cta">
              <Link to="/login" className="btn-primary btn-lg">
                <UploadCloud size={20} /> Upload CSV
              </Link>
              <button className="btn-outline btn-lg" onClick={startDemo}>
                <Play size={20} /> Try Demo
              </button>
            </div>
          </>
        )}

        <div className="hero-stats">
          {stats.map((s, i) => (
            <div key={i} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-preview-section">
        <div className="preview-container glass-panel">
          <div className="preview-header">
            <div className="preview-dots"><span></span><span></span><span></span></div>
            <div className="preview-url">app.datacleanse.ai/dashboard</div>
          </div>
          <div className="preview-content">
            <div className="preview-sidebar">
              <div className="sidebar-item active"><LayoutDashboard size={16} /> Dashboard</div>
              <div className="sidebar-item"><FileText size={16} /> Records</div>
              <div className="sidebar-item"><Activity size={16} /> AI Logs</div>
            </div>
            <div className="preview-main">
              <div className="preview-stats-row">
                <div className="mini-card">Quality: 98.4%</div>
                <div className="mini-card">Errors: 0</div>
                <div className="mini-card">Fixes: 1,240</div>
              </div>
              <div className="fake-table">
                <div className="table-header">
                  <span>Name</span><span>Email</span><span>Status</span>
                </div>
                {[1,2,3].map(i => (
                  <div key={i} className="table-row">
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line"></div>
                    <div className="status-pill">Cleaned</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="product-showcase-section" id="products">
        <div className="section-header">
          <div className="features-badge">THE NEURAL INTEGRATION SUITE</div>
          <h2 className="text-gradient">AI-Powered Data Integrity</h2>
          <p>Supercharge your enterprise workflows with our complete suite of automated data cleaning and security tools.</p>
        </div>
        
        <div className="showcase-grid">
          {/* Card 1: AI Data Cleaner */}
          <div className="showcase-card glass-panel border-purple" id="ai-data-cleaner">
            <div className="showcase-glow purple"></div>
            <div className="showcase-card-header">
              <div className="showcase-icon-wrapper purple"><Sparkles size={24} /></div>
              <h3>AI Data Cleaner</h3>
            </div>
            <p className="showcase-desc">Automatically clean CSV and Excel datasets using AI.</p>
            <ul className="showcase-features-list">
              <li><Check size={14} /> Duplicate removal</li>
              <li><Check size={14} /> Missing value fixing</li>
              <li><Check size={14} /> Auto formatting</li>
              <li><Check size={14} /> Smart normalization</li>
            </ul>
            <div className="showcase-footer">
              <Link to="/login" className="showcase-cta">Explore Feature <ChevronRight size={16} /></Link>
            </div>
          </div>

          {/* Card 2: Dataset Health Analyzer */}
          <div className="showcase-card glass-panel border-blue" id="dataset-health-analyzer">
            <div className="showcase-glow blue"></div>
            <div className="showcase-card-header">
              <div className="showcase-icon-wrapper blue"><Activity size={24} /></div>
              <h3>Dataset Health Analyzer</h3>
            </div>
            <p className="showcase-desc">Generate an AI-powered health score for datasets.</p>
            <ul className="showcase-features-list">
              <li><Check size={14} /> Accuracy score</li>
              <li><Check size={14} /> Completeness score</li>
              <li><Check size={14} /> Consistency analysis</li>
              <li><Check size={14} /> Error summaries</li>
            </ul>
            <div className="showcase-footer">
              <Link to="/login" className="showcase-cta">Explore Feature <ChevronRight size={16} /></Link>
            </div>
          </div>

          {/* Card 3: AI Sentinel Surveillance */}
          <div className="showcase-card glass-panel border-neon" id="ai-sentinel-surveillance">
            <div className="showcase-glow neon"></div>
            <div className="showcase-card-header">
              <div className="showcase-icon-wrapper neon"><Eye size={24} /></div>
              <h3>24/7 AI Sentinel</h3>
            </div>
            <p className="showcase-desc">Continuous threat intelligence and predictive API pipeline surveillance.</p>
            <ul className="showcase-features-list">
              <li><Check size={14} /> Real-time server diagnostics</li>
              <li><Check size={14} /> Anomaly and bruteforce audits</li>
              <li><Check size={14} /> Invariant encryption scans</li>
              <li><Check size={14} /> Suspicious IP purging</li>
            </ul>
            <div className="showcase-footer">
              <Link to="/sentinel" className="showcase-cta">Open Control Center <ChevronRight size={16} /></Link>
            </div>
          </div>

          {/* Card 4: Google Sheets Integration */}
          <div className="showcase-card glass-panel border-green" id="gsheets-integration">
            <div className="showcase-glow green"></div>
            <div className="showcase-card-header">
              <div className="showcase-icon-wrapper green"><Share2 size={24} /></div>
              <h3>Google Sheets Integration</h3>
            </div>
            <p className="showcase-desc">Connect and sync Google Sheets in real time.</p>
            <ul className="showcase-features-list">
              <li><Check size={14} /> OAuth login</li>
              <li><Check size={14} /> Auto sync</li>
              <li><Check size={14} /> Two-way sync</li>
            </ul>
            <div className="showcase-footer">
              <Link to="/login" className="showcase-cta">Explore Feature <ChevronRight size={16} /></Link>
            </div>
          </div>

          {/* Card 5: Developer API Platform */}
          <div className="showcase-card glass-panel border-yellow" id="developer-api">
            <div className="showcase-glow yellow"></div>
            <div className="showcase-card-header">
              <div className="showcase-icon-wrapper yellow"><Code size={24} /></div>
              <h3>Developer API Platform</h3>
            </div>
            <p className="showcase-desc">Allow developers to clean and analyze data using APIs.</p>
            <ul className="showcase-features-list">
              <li><Check size={14} /> API keys</li>
              <li><Check size={14} /> REST API access</li>
              <li><Check size={14} /> Usage analytics</li>
              <li><Check size={14} /> Documentation links</li>
            </ul>
            <div className="showcase-footer">
              <Link to="/login" className="showcase-cta">Explore Feature <ChevronRight size={16} /></Link>
            </div>
          </div>

          {/* Card 6: Enterprise Security */}
          <div className="showcase-card glass-panel border-red" id="enterprise-security">
            <div className="showcase-glow red"></div>
            <div className="showcase-card-header">
              <div className="showcase-icon-wrapper red"><Shield size={24} /></div>
              <h3>Enterprise Security</h3>
            </div>
            <p className="showcase-desc">Enterprise-grade protection for sensitive datasets.</p>
            <ul className="showcase-features-list">
              <li><Check size={14} /> Encrypted storage</li>
              <li><Check size={14} /> GDPR compliance</li>
              <li><Check size={14} /> Role-based access</li>
              <li><Check size={14} /> Activity logs</li>
            </ul>
            <div className="showcase-footer">
              <Link to="/login" className="showcase-cta">Explore Feature <ChevronRight size={16} /></Link>
            </div>
          </div>

          {/* Card 7: Analytics Dashboard */}
          <div className="showcase-card glass-panel border-orange full-width" id="analytics-dashboard">
            <div className="showcase-glow orange"></div>
            <div className="showcase-card-header">
              <div className="showcase-icon-wrapper orange"><BarChart3 size={24} /></div>
              <h3>Analytics Dashboard</h3>
            </div>
            <p className="showcase-desc">Visualize dataset quality and AI insights in a powerful dashboard.</p>
            <ul className="showcase-features-list grid-columns">
              <li><Check size={14} /> Real-time Charts & Graphs</li>
              <li><Check size={14} /> Anomaly and Error Heatmaps</li>
              <li><Check size={14} /> Comprehensive Dataset Reports</li>
              <li><Check size={14} /> Tailored AI Recommendations</li>
            </ul>
            <div className="showcase-footer">
              <Link to="/login" className="showcase-cta">Explore Feature <ChevronRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="workflow-section" id="features">
        <div className="section-header">
          <h2 className="text-gradient">How it Works</h2>
          <p>Cleanse your data in three simple, automated steps.</p>
        </div>
        <div className="workflow-container">
          <div className="workflow-step">
            <div className="workflow-icon-box"><UploadCloud /></div>
            <h3>1. Upload</h3>
            <p>Drag & drop your messy CSV files.</p>
          </div>
          <div className="workflow-connector"><div className="connector-line"></div></div>
          <div className="workflow-step">
            <div className="workflow-icon-box pulse"><Search /></div>
            <h3>2. AI Detect</h3>
            <p>Engine finds errors & duplicates.</p>
          </div>
          <div className="workflow-connector"><div className="connector-line"></div></div>
          <div className="workflow-step">
            <div className="workflow-icon-box success"><CheckCircle /></div>
            <h3>3. Download</h3>
            <p>Get your pristine, ready-to-use data.</p>
          </div>
        </div>
      </section>

      <section className="domains-section" id="industries">
        <div className="section-header">
          <h2 className="text-gradient">Tailored for Your Industry</h2>
          <p>Click any industry to explore our domain-specific AI models.</p>
        </div>
        <div className="domains-grid">
          {domains.map((domain, index) => (
            <DomainCard key={index} {...domain} onClick={() => setSelectedDomain(domain)} />
          ))}
        </div>
      </section>

      <section className="problem-section">
        <div className="section-header">
          <h2 className="text-gradient">The Data Crisis</h2>
          <p>Messy data costs companies billions. We solve the friction.</p>
        </div>
        <div className="problem-grid">
          {[
            { title: "Missing Values", desc: "Empty cells that break analysis." },
            { title: "Duplicate Rows", desc: "Redundant data skewing results." },
            { title: "Invalid Formats", desc: "Inconsistent dates and emails." },
            { title: "Data Corruption", desc: "Broken structures and encoding." }
          ].map((p, i) => (
            <div key={i} className="problem-card glass-panel">
              <AlertTriangle className="icon-alert" size={20} />
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="about-us-section" id="about">
        <div className="section-header">
          <h2 className="text-gradient">About DataCleanse.AI</h2>
          <p>Transforming messy datasets into clean, reliable, AI-powered insights.</p>
        </div>

        <div className="about-content-grid">
          <div className="about-text-panel glass-panel">
            <div className="mission-badge">OUR MISSION</div>
            <h3>Foundation of Better Decisions</h3>
            <p>
              DataCleanse.AI is an intelligent platform built to simplify data cleaning and preprocessing for businesses, 
              developers, analysts, and startups. Our AI-powered engine automatically detects and fixes CSV and spreadsheet 
              errors including duplicates, missing values, formatting issues, and invalid records.
            </p>
            <div className="mission-quote">
              "Our mission is to help businesses unlock the true power of clean and structured data using artificial intelligence."
            </div>
            
            <div className="about-stats-mini">
              <div className="a-stat"><strong>10K+</strong> Files Processed</div>
              <div className="a-stat"><strong>99%</strong> Accuracy</div>
              <div className="a-stat"><strong>500+</strong> Users</div>
            </div>
          </div>

          <div className="about-values-grid">
            {[
              { icon: Zap, title: "Neural Correction", desc: "AI-powered error correction that learns from patterns." },
              { icon: Activity, title: "Real-time Analysis", desc: "Instant CSV structure and anomaly detection." },
              { icon: ShieldCheck, title: "Enterprise Security", desc: "AES-256 encryption for every byte of data." },
              { icon: Database, title: "Cloud Scale", desc: "Fast cloud-based processing for massive datasets." }
            ].map((v, i) => (
              <div key={i} className="value-card glass-panel">
                <v.icon size={24} className="value-icon" />
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="journey-timeline">
          <div className="timeline-item">
            <div className="t-dot"></div>
            <div className="t-content">
              <span>2024 Q1</span>
              <h4>The Vision</h4>
              <p>Founded with the goal of eliminating manual data cleaning forever.</p>
            </div>
          </div>
          <div className="timeline-item active">
            <div className="t-dot"></div>
            <div className="t-content">
              <span>2025 Q2</span>
              <h4>Neural Engine V2</h4>
              <p>Launched our proprietary transformer model for structured data fixes.</p>
            </div>
          </div>
          <div className="timeline-item">
            <div className="t-dot"></div>
            <div className="t-content">
              <span>2026 Q3</span>
              <h4>Global Scale</h4>
              <p>Expanding to support multi-cloud enterprise deployments.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing-section" id="pricing">
        <div className="section-header">
          <h2 className="text-gradient">Simple Pricing</h2>
          <p>Choose the plan that fits your data volume.</p>
        </div>
        <div className="pricing-grid">
          {pricingPlans.map((plan, i) => (
            <div key={i} className={`pricing-card glass-panel ${plan.highlight ? 'highlight' : ''}`}>
              {plan.highlight && <div className="popular-badge">Most Popular</div>}
              <h3>{plan.name}</h3>
              <div className="price">{plan.price}<span>/month</span></div>
              <ul className="plan-features">
                {plan.features.map((f, j) => (
                  <li key={j}><Check size={16} /> {f}</li>
                ))}
              </ul>
              <button className={`btn-${plan.highlight ? 'primary' : 'outline'} w-full`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section">
        <div className="section-header">
          <h2 className="text-gradient">Trusted by the Best</h2>
          <p>See what leading data engineers are saying.</p>
        </div>
        <div className="testimonials-grid">
          {[
            { name: "Sarah Chen", role: "Data Lead @ TechFlow", text: "DataCleanse saved us 40+ hours of manual work in just one week. The AI is scarily accurate." },
            { name: "Marcus Vane", role: "CTO @ Nexus AI", text: "The API integration is seamless. We've automated our entire data ingestion pipeline." },
            { name: "Elena Rossi", role: "Analyst @ Global Insights", text: "Finally a tool that understands CSV structures instead of just throwing errors." }
          ].map((t, i) => (
            <div key={i} className="testimonial-card glass-panel">
              <div className="stars"><Star size={14} fill="var(--accent-neon)" /> <Star size={14} fill="var(--accent-neon)" /> <Star size={14} fill="var(--accent-neon)" /> <Star size={14} fill="var(--accent-neon)" /> <Star size={14} fill="var(--accent-neon)" /></div>
              <p>"{t.text}"</p>
              <div className="author">
                <strong>{t.name}</strong>
                <span>{t.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showDemo && (
        <div className="modal-overlay" onClick={closeDemo}>
          <div className="demo-modal glass-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Live Demo Simulation</h3>
              <button className="btn-icon-small" onClick={closeDemo}>&times;</button>
            </div>

            <div className="demo-stages">
              <div className={`demo-stage ${demoStage >= 1 ? 'active' : ''}`}>
                <div className="stage-icon"><Search size={24} /></div>
                <div className="stage-text">
                  <h4>Neural Scanning</h4>
                  <p>Analyzing 50,000 records for anomalies...</p>
                </div>
                {demoStage === 1 && <div className="progress-bar-indefinite"></div>}
                {demoStage > 1 && <CheckCircle size={20} className="success-icon" />}
              </div>

              <div className={`demo-stage ${demoStage >= 2 ? 'active' : ''}`}>
                <div className="stage-icon"><Zap size={24} /></div>
                <div className="stage-text">
                  <h4>Auto-Correction</h4>
                  <p>Applying domain-specific fixes & patterns...</p>
                </div>
                {demoStage === 2 && <div className="progress-bar-indefinite"></div>}
                {demoStage > 2 && <CheckCircle size={20} className="success-icon" />}
              </div>

              <div className={`demo-stage ${demoStage >= 3 ? 'active' : ''}`}>
                <div className="stage-icon"><CheckCircle size={24} /></div>
                <div className="stage-text">
                  <h4>Final Optimization</h4>
                  <p>Deduplicating and generating quality report.</p>
                </div>
                {demoStage === 3 && <div className="progress-bar-indefinite"></div>}
              </div>
            </div>

            {demoStage === 3 && (
              <div className="demo-result">
                <div className="result-stats">
                  <div className="res-stat"><span>1,402</span> Fixes</div>
                  <div className="res-stat"><span>98.2%</span> Quality</div>
                </div>
                <button className="btn-primary w-full" onClick={closeDemo}>Experience Full App</button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="footer glass-panel">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/logo.png" alt="Logo" className="footer-logo" />
            <p>Clean Data. Better Decisions. The future of data integrity is here.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#pricing">Pricing</a>
              <a href="#industries">Industries</a>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <a href="/docs">API Docs</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom" id="contact">
          <span>&copy; 2026 DataCleanse.AI. All rights reserved.</span>
          <div className="social-icons">
            {/* Social icons here */}
          </div>
        </div>
      </footer>

      {selectedDomain && (
        <div className="modal-overlay" onClick={() => setSelectedDomain(null)}>
          <div className="domain-modal glass-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="title-with-icon">
                <div className="icon-circle" style={{ backgroundColor: `${selectedDomain.color}20`, color: selectedDomain.color }}>
                  <selectedDomain.icon size={24} />
                </div>
                <h3>{selectedDomain.title} Model Details</h3>
              </div>
              <button className="btn-icon-small" onClick={() => setSelectedDomain(null)}>&times;</button>
            </div>
            <div className="modal-grid">
              <div className="modal-section">
                <label>Proprietary Model</label>
                <div className="ai-tag">{selectedDomain.details.ai_model}</div>
              </div>
              <div className="modal-section">
                <label>Key Intelligence Features</label>
                <div className="feature-tags">
                  {selectedDomain.details.features.map(f => <span key={f} className="f-tag">{f}</span>)}
                </div>
              </div>
              <div className="modal-section full-width">
                <label>Smart Processing Rule</label>
                <p className="rule-text">{selectedDomain.details.rule}</p>
              </div>
            </div>
            <div className="modal-footer">
              <Link to="/upload" className="btn-primary" style={{ width: '100%' }}>
                Process {selectedDomain.title} Data
              </Link>
            </div>
          </div>
        </div>
      )}

      <AIChatbot />
    </div>
  );
};

export default LandingPage;
