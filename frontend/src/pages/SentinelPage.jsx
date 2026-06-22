import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldAlert, ShieldCheck, Terminal, Cpu, Server, Activity, 
  Globe, Radio, Lock, Unlock, Wifi, Bell, RefreshCw, Eye, 
  Database, UserCheck, Key, AlertTriangle, AlertCircle, Play, 
  Download, Zap
} from 'lucide-react';
import './SentinelPage.css';

const SentinelPage = () => {
  const [sentinelActive, setSentinelActive] = useState(true);
  const [threatLevel, setThreatLevel] = useState('SAFE'); // SAFE, WARNING, THREAT
  const [activeUsers, setActiveUsers] = useState(42);
  const [serverLoad, setServerLoad] = useState(28);
  const [cpuUsage, setCpuUsage] = useState(18);
  const [diagnosticsRunning, setDiagnosticsRunning] = useState(false);
  const [diagnosticStep, setDiagnosticStep] = useState(0);
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'info', time: '10:04:12', message: 'AI Sentinel initialized. Neural network operational.' },
    { id: 2, type: 'info', time: '10:05:22', message: 'Access node synced with region AWS-AP-SOUTH-1.' },
    { id: 3, type: 'warning', time: '10:08:45', message: 'Unusual file pattern detected in dataset_temp_482.csv.' }
  ]);
  const [logs, setLogs] = useState([
    'SYSTEM: Initializing data ingestion watchdog...',
    'INTEGRITY: AES-256 database connection audited. Status: Secure.',
    'AI-CORE: Processing pipelines loaded. Current response time: 4ms.',
    'NETWORK: Node 4 incoming bandwidth stable at 84 MB/s.',
    'MONITOR: System health metrics standard.'
  ]);

  const logEndRef = useRef(null);

  // Generate live traffic logs & mock system events
  useEffect(() => {
    const interval = setInterval(() => {
      // Stream fresh security scanner events
      const mockLogTemplates = [
        'TRAFFIC: Verified GET /api/v1/dataset/health from IP 142.250.190.46',
        'AI-WATCHDOG: Evaluated clean matrix for uploaded user buffer. Threat Score: 0.02%',
        'INTEGRITY: Completed micro-scan on database collection "datasets".',
        'AUTH: User session token refreshed securely.',
        'TRAFFIC: POST /api/v1/clean successfully resolved in 142ms.',
        'SURVEILLANCE: Analyzing metadata structural invariants. No drift detected.',
        'NETWORK: Synchronized background shard cluster replicas.'
      ];

      const randomLog = mockLogTemplates[Math.floor(Math.random() * mockLogTemplates.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [...prev.slice(-30), `[${timestamp}] ${randomLog}`]);

      // Randomly change active users and server load
      setActiveUsers(prev => Math.max(10, Math.min(150, prev + Math.floor(Math.random() * 9) - 4)));
      setServerLoad(prev => Math.max(10, Math.min(95, prev + Math.floor(Math.random() * 7) - 3)));
      setCpuUsage(prev => Math.max(8, Math.min(85, prev + Math.floor(Math.random() * 5) - 2)));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Periodic random security warnings
  useEffect(() => {
    const warningInterval = setInterval(() => {
      if (diagnosticsRunning) return;

      const randomChance = Math.random();
      const timestamp = new Date().toLocaleTimeString();

      if (randomChance > 0.8) {
        // Trigger Warning
        setThreatLevel('WARNING');
        const newWarning = {
          id: Date.now(),
          type: 'warning',
          time: timestamp,
          message: 'Suspicious IP address sequence scanning developer API endpoints.'
        };
        setAlerts(prev => [newWarning, ...prev.slice(0, 10)]);
        setLogs(prev => [...prev, `[${timestamp}] [WARNING] Security scanner identified anomaly on port 8080.`]);
      } else if (randomChance > 0.95) {
        // Trigger Threat
        setThreatLevel('THREAT');
        const newThreat = {
          id: Date.now(),
          type: 'danger',
          time: timestamp,
          message: 'Emergency: Failed admin authentication flood detected.'
        };
        setAlerts(prev => [newThreat, ...prev.slice(0, 10)]);
        setLogs(prev => [...prev, `[${timestamp}] [ALERT] THREAT AUDIT: Bruteforce signature matched from IP 89.23.11.2`]);
      }
    }, 15000);

    return () => clearInterval(warningInterval);
  }, [diagnosticsRunning]);

  // Scroll to bottom of terminal log container
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Run AI Diagnostics Simulation
  const triggerDiagnostics = () => {
    if (diagnosticsRunning) return;
    setDiagnosticsRunning(true);
    setDiagnosticStep(1);
    setThreatLevel('SAFE');

    const steps = [
      'Scanning local server endpoints...',
      'Validating encryption tokens & SSL invariants...',
      'Analyzing dataset structural entropy anomalies...',
      'Checking API traffic pattern signature correlation...',
      'Deep AI Cleanse completed. Threat neutralized successfully.'
    ];

    let currentStep = 1;
    const interval = setInterval(() => {
      currentStep++;
      setDiagnosticStep(currentStep);

      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [...prev, `[${timestamp}] [DIAGNOSTICS] Step ${currentStep-1}: Completed.`]);

      if (currentStep > 5) {
        clearInterval(interval);
        setDiagnosticsRunning(false);
        setDiagnosticStep(0);
        // Reset everything back to healthy
        setThreatLevel('SAFE');
        const resolveAlert = {
          id: Date.now(),
          type: 'success',
          time: timestamp,
          message: 'System diagnostics complete. All threats successfully mitigated.'
        };
        setAlerts(prev => [resolveAlert, ...prev.slice(0, 10)]);
      }
    }, 15000 / 5);
  };

  // Mitigate warnings manually
  const mitigateAllThreats = () => {
    setThreatLevel('SAFE');
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] [ADMIN] Manually dispatched AI Counter-measures. Threats purged.`]);
    const resolveAlert = {
      id: Date.now(),
      type: 'success',
      time: timestamp,
      message: 'All threat levels manual purge complete. System healthy.'
    };
    setAlerts(prev => [resolveAlert, ...prev.slice(0, 10)]);
  };

  // Toggle Sentinel
  const toggleSentinel = () => {
    setSentinelActive(!sentinelActive);
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, `[${timestamp}] [SYSTEM] AI Sentinel state toggled: ${!sentinelActive ? 'ACTIVE' : 'DEACTIVATED'}`]);
  };

  return (
    <div className="sentinel-page cyber-theme">
      <div className="bg-grid-glow"></div>
      
      {/* Sentinel Header */}
      <div className="sentinel-header-panel">
        <div className="header-brand-info">
          <div className="sentinel-badge-pulsing">
            <span className={`pulse-dot ${sentinelActive ? 'active' : 'inactive'}`}></span>
            {sentinelActive ? 'AI SENTINEL ACTIVE' : 'AI SENTINEL INACTIVE'}
          </div>
          <h1>Surveillance & Threat Center</h1>
          <p>Real-time deep threat intelligence, server invariants audit, and predictive data integrity pipeline security.</p>
        </div>
        
        <div className="sentinel-header-actions">
          <button 
            className={`btn-sentinel ${sentinelActive ? 'btn-active' : 'btn-inactive'}`} 
            onClick={toggleSentinel}
          >
            {sentinelActive ? <ShieldCheck size={18} /> : <ShieldAlert size={18} />}
            {sentinelActive ? 'Sentinel Engaged' : 'Sentinel Disengaged'}
          </button>
          
          <button className="btn-sentinel btn-secondary" onClick={mitigateAllThreats}>
            <Unlock size={18} /> Purge Anomalies
          </button>
        </div>
      </div>

      {/* Cyber Grid Stats */}
      <div className="sentinel-stats-grid">
        <div className="sentinel-stat-card glass-cyber">
          <div className="stat-card-glow"></div>
          <div className="stat-card-header">
            <span>Threat Index</span>
            <AlertCircle size={20} className={`color-${threatLevel.toLowerCase()}`} />
          </div>
          <div className="stat-big-value">
            <span className={`level-badge text-${threatLevel.toLowerCase()}`}>
              {threatLevel === 'SAFE' && '🟢 SAFE'}
              {threatLevel === 'WARNING' && '🟡 WARNING'}
              {threatLevel === 'THREAT' && '🔴 SEC THREAT'}
            </span>
          </div>
          <div className="stat-small-desc">
            {threatLevel === 'SAFE' && 'All pipelines operating normally'}
            {threatLevel === 'WARNING' && 'Suspicious API traffic patterns identified'}
            {threatLevel === 'THREAT' && 'Active bruteforce authentication signature matched'}
          </div>
        </div>

        <div className="sentinel-stat-card glass-cyber">
          <div className="stat-card-glow"></div>
          <div className="stat-card-header">
            <span>Active Connections</span>
            <UserCheck size={20} className="color-primary" />
          </div>
          <div className="stat-big-value font-mono">
            {activeUsers} <span className="value-unit">NODES</span>
          </div>
          <div className="stat-small-desc">
            Simultaneous background data uploads / downloads active
          </div>
        </div>

        <div className="sentinel-stat-card glass-cyber">
          <div className="stat-card-glow"></div>
          <div className="stat-card-header">
            <span>Server Invariants Load</span>
            <Server size={20} className="color-neon" />
          </div>
          <div className="stat-big-value font-mono">
            {serverLoad}%
          </div>
          <div className="stat-progress-bar">
            <div className="progress-fill" style={{ width: `${serverLoad}%` }}></div>
          </div>
          <div className="stat-small-desc">
            AWS-AP-SOUTH-1 CPU clusters compute capability threshold
          </div>
        </div>

        <div className="sentinel-stat-card glass-cyber">
          <div className="stat-card-glow"></div>
          <div className="stat-card-header">
            <span>Neural Processor Usage</span>
            <Cpu size={20} className="color-purple" />
          </div>
          <div className="stat-big-value font-mono">
            {cpuUsage}%
          </div>
          <div className="stat-progress-bar">
            <div className="progress-fill purple" style={{ width: `${cpuUsage}%` }}></div>
          </div>
          <div className="stat-small-desc">
            Data correction models queue threshold processing
          </div>
        </div>
      </div>

      {/* Core Dashboard Content */}
      <div className="sentinel-content-grid">
        
        {/* Terminal logs and Diagnostic Scan */}
        <div className="sentinel-left-panel">
          
          {/* Diagnostic control card */}
          <div className="diagnostics-card glass-cyber">
            <div className="diag-header">
              <div className="diag-title-box">
                <Activity className="pulse-icon color-primary" size={22} />
                <h3>Emergency Core Diagnostics</h3>
              </div>
              <button 
                className={`btn-diag-run ${diagnosticsRunning ? 'running' : ''}`}
                onClick={triggerDiagnostics}
                disabled={diagnosticsRunning}
              >
                {diagnosticsRunning ? <RefreshCw className="spin" size={16} /> : <Play size={16} />}
                {diagnosticsRunning ? 'Audit In Progress...' : 'Run Neural Audit'}
              </button>
            </div>
            
            {diagnosticsRunning ? (
              <div className="diag-progress-center">
                <div className="circle-scanner-container">
                  <div className="pulse-radar"></div>
                  <div className="scanning-line"></div>
                  <span className="scan-percentage">{diagnosticStep * 20}%</span>
                </div>
                <div className="diag-step-desc font-mono">
                  {diagnosticStep === 1 && '🟢 Phase 1: Checking IP Access Lists...'}
                  {diagnosticStep === 2 && '🟡 Phase 2: Validating encryption tokens & SSL invariants...'}
                  {diagnosticStep === 3 && '🔵 Phase 3: Auditing MongoDB dataset integrity...'}
                  {diagnosticStep === 4 && '🟠 Phase 4: Checking API traffic pattern correlation...'}
                  {diagnosticStep === 5 && '🔴 Phase 5: Executing threat-signature purge...'}
                </div>
              </div>
            ) : (
              <div className="diag-idle-state">
                <ShieldCheck size={48} className="shield-icon-idle color-primary" />
                <p>System operating signature fully calibrated. Run deep audit to verify encryption invariants.</p>
              </div>
            )}
          </div>

          {/* Terminal Command Console */}
          <div className="terminal-card glass-cyber">
            <div className="terminal-header">
              <div className="terminal-dots"><span></span><span></span><span></span></div>
              <span className="terminal-title">ai-sentinel@datacleanse.ai:~/monitoring_core</span>
            </div>
            <div className="terminal-body font-mono">
              {logs.map((log, index) => (
                <div key={index} className="terminal-line">{log}</div>
              ))}
              <div ref={logEndRef}></div>
            </div>
          </div>
        </div>

        {/* Alerts and Threat Auditing */}
        <div className="sentinel-right-panel">
          <div className="alerts-card glass-cyber">
            <div className="alerts-header">
              <Bell className="bell-glow color-warning" size={20} />
              <h3>Real-Time Threat Intelligence</h3>
            </div>
            
            <div className="alerts-scroller">
              {alerts.length === 0 ? (
                <div className="empty-alerts">
                  <ShieldCheck size={42} opacity={0.3} />
                  <p>Zero active vulnerabilities identified</p>
                </div>
              ) : (
                alerts.map(alert => (
                  <div key={alert.id} className={`alert-tile ${alert.type}`}>
                    <div className="alert-tile-marker"></div>
                    <div className="alert-tile-body">
                      <div className="tile-header">
                        <span className="tile-badge">{alert.type.toUpperCase()}</span>
                        <span className="tile-time">{alert.time}</span>
                      </div>
                      <p>{alert.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Infrastructure Details */}
          <div className="infra-card glass-cyber">
            <div className="infra-header">
              <Globe className="color-neon" size={20} />
              <h3>API Gateway Infrastructure</h3>
            </div>
            
            <div className="infra-details-list">
              <div className="infra-item">
                <div className="infra-label">Surveillance Target</div>
                <div className="infra-value font-mono">https://api.datacleanse.ai/v1</div>
              </div>
              <div className="infra-item">
                <div className="infra-label">Audit Key Hash</div>
                <div className="infra-value font-mono">SHA-256::AE39..C2A1</div>
              </div>
              <div className="infra-item">
                <div className="infra-label">Live Gateway Uptime</div>
                <div className="infra-value color-neon font-mono">99.998%</div>
              </div>
              <div className="infra-item">
                <div className="infra-label">Active Shards</div>
                <div className="infra-value font-mono">3 Regional Clusters</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SentinelPage;
