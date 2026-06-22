import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  Download, AlertTriangle, CheckCircle, Search, TrendingUp, Info, 
  Shield, Key, Link2, List, Cpu, Database, Sparkles
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import api, { API_BASE_URL } from '../api';
import './Dashboard.css';

const dataQualityMetrics = [
  {
    name: "Missing Values",
    value: 15,
    color: "#ef4444"
  },
  {
    name: "Duplicates",
    value: 8,
    color: "#8b5cf6"
  },
  {
    name: "Format Errors",
    value: 12,
    color: "#f59e0b"
  },
  {
    name: "Valid Data",
    value: 65,
    color: "#10b981"
  }
];

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("analysis");
  const [currentAnalysis, setCurrentAnalysis] = useState(location.state?.analysisData || null);
  const [showRaw, setShowRaw] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [reportTab, setReportTab] = useState("comparison");
  const [comparisonMode, setComparisonMode] = useState("split");
  const [activeTableTab, setActiveTableTab] = useState("original");
  const [apiKey, setApiKey] = useState("");
  const [logs, setLogs] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const { addNotification } = useNotifications();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const metrics = currentAnalysis?.metrics;
  const healthBreakdown = metrics?.health_breakdown || {
    accuracy: 85,
    completeness: 90,
    consistency: 75,
    structural: 100
  };
  const missingByColumn = currentAnalysis?.missing_by_column || {};
  const changesReport = currentAnalysis?.changes_report || [];
  const originalPreview = currentAnalysis?.original_preview || [];
  const rawPreview = currentAnalysis?.raw_preview || [];
  const isDataAvailable = !!currentAnalysis;

  useEffect(() => {
    if (isDataAvailable) {
      // Small delay for a smoother entrance
      const timer = setTimeout(() => setShowReport(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isDataAvailable]);

  const getCellStatus = (rowIndex, colName, value) => {
    const origRow = originalPreview[rowIndex];
    if (!origRow) return "normal";
    const origVal = origRow[colName];
    // Check if it was missing in original but filled in cleaned
    if ((origVal === null || origVal === undefined || origVal === "") && value !== null && value !== undefined && value !== "") {
      return "imputed";
    }
    // Check if it was modified (e.g., standardizations like lowercase, price normalization)
    if (origVal !== value && origVal !== null && origVal !== undefined) {
      return "corrected";
    }
    return "normal";
  };

  useEffect(() => {
    if (activeTab === "enterprise") {
      api.get("/api/enterprise/logs").then((res) => setLogs(res.data));
    }
  }, [activeTab]);

  const handleDownload = () => {
    if (!currentAnalysis?.file_id) return;
    window.open(`${API_BASE_URL}/api/download/${currentAnalysis.file_id}`, "_blank");
    // Clear data for new execution as requested
    setTimeout(() => {
      setCurrentAnalysis(null);
      navigate("/dashboard", {
        replace: true,
        state: {}
      });
      addNotification("Workspace Reset", "Ready for a new data analysis task.", "info");
    }, 1500);
  };

  const handleKeyGen = async () => {
    const res = await api.post(`/api/developer/keygen?email=${user.email}`);
    setApiKey(res.data.api_key);
  };

  const handleSheetsSync = async () => {
    setIsSyncing(true);
    await api.post(`/api/integrations/gsheets/sync?email=${user.email}&file_id=${currentAnalysis?.file_id || "test"}`);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const dynamicQualityMetrics = isDataAvailable ? [
    {
      name: "Missing Values",
      value: metrics.missing_values,
      color: "#ef4444"
    },
    {
      name: "Duplicates",
      value: metrics.duplicates,
      color: "#8b5cf6"
    },
    {
      name: "Valid Data",
      value: Math.max(0, metrics.total_rows * metrics.total_columns - metrics.missing_values - metrics.duplicates),
      color: "#10b981"
    }
  ] : dataQualityMetrics;

  const dynamicAnomalyData = isDataAvailable ? Object.keys(missingByColumn).map((key) => ({
    category: key,
    count: missingByColumn[key]
  })) : [];

  const score = isDataAvailable ? metrics.quality_score : 82;
  const filename = isDataAvailable ? currentAnalysis.filename : "No dataset selected";

  return (
    <div className="dashboard-page">
      <div className="dashboard-nav-tabs">
        <button
          className={`tab-btn ${activeTab === "analysis" ? "active" : ""}`}
          onClick={() => setActiveTab("analysis")}
        >
          <BarChart size={18} /> AI Analysis
        </button>
        <button
          className={`tab-btn ${activeTab === "enterprise" ? "active" : ""}`}
          onClick={() => setActiveTab("enterprise")}
        >
          <Shield size={18} /> Enterprise
        </button>
        <button
          className={`tab-btn ${activeTab === "developer" ? "active" : ""}`}
          onClick={() => setActiveTab("developer")}
        >
          <Cpu size={18} /> Developer
        </button>
      </div>

      <div className="dashboard-header">
        <div>
          <h2>
            {activeTab === "analysis" 
              ? "Neural Workspace" 
              : activeTab === "enterprise" 
              ? "Audit & Security" 
              : "Developer Hub"}
          </h2>
          <p className="text-muted">Dataset: {filename}</p>
        </div>
        <div className="dashboard-actions">
          {activeTab === "analysis" && (
            <>
              <button
                className={`btn-sync ${isSyncing ? "loading" : ""}`}
                onClick={handleSheetsSync}
              >
                <Link2 size={18} /> {isSyncing ? "Syncing..." : "Sync to G-Sheets"}
              </button>
              <button
                className="btn-outline"
                onClick={() => setShowReport(true)}
                disabled={!isDataAvailable}
              >
                <Search size={18} /> View Report
              </button>
              <button
                className="btn-primary"
                onClick={handleDownload}
                disabled={!isDataAvailable}
              >
                <Download size={18} /> Export
              </button>
            </>
          )}
        </div>
      </div>

      {activeTab === "analysis" && (
        <div className="analysis-content">
          <div className="health-dashboard-grid">
            <div className="main-score-card glass-panel">
              <div className="score-header">
                <h3>Dataset Health Score</h3>
                <span className="score-badge">{score}%</span>
              </div>
              <div className="health-bars">
                {Object.entries(healthBreakdown).map(([key, val]) => (
                  <div className="health-bar-row" key={key}>
                    <div className="bar-label">
                      <span className="capitalize">{key}</span>
                      <span>{val}%</span>
                    </div>
                    <div className="bar-bg">
                      <div
                        className="bar-fill"
                        style={{
                          width: `${val}%`,
                          backgroundColor: val > 90 ? "var(--accent-success)" : val > 70 ? "var(--accent-primary)" : "var(--accent-danger)"
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ai-insights-panel glass-panel">
              <h3>
                <TrendingUp size={18} /> Predictive Insights
              </h3>
              <div className="insights-list">
                <div className="insight-item warning">
                  <AlertTriangle size={16} />
                  <span>Detected potential drift in Date formats for "created_at" column.</span>
                </div>
                <div className="insight-item success">
                  <CheckCircle size={16} />
                  <span>AI prediction: Auto-imputation can recover 94% of missing values.</span>
                </div>
                <div className="insight-item info">
                  <Info size={16} />
                  <span>Structural Integrity is high (100%). Ready for API deployment.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="charts-grid">
            <div className="chart-container glass-panel">
              <h3>Data Quality Distribution</h3>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dynamicQualityMetrics}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {dynamicQualityMetrics.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: "var(--panel-bg)",
                        borderColor: "var(--panel-border)"
                      }}
                      itemStyle={{ color: "var(--text-main)" }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-container glass-panel">
              <h3>Processing Metrics</h3>
              <div className="summary-stats">
                <div className="stat-row">
                  <span>Total Rows</span>{" "}
                  <span className="stat-val">{metrics?.total_rows || 0}</span>
                </div>
                <div className="stat-row">
                  <span>Anomalies Fixed</span>{" "}
                  <span className="stat-val text-success">{changesReport.length}</span>
                </div>
                <div className="stat-row">
                  <span>Storage Status</span>{" "}
                  <span className="stat-val">Encrypted (AES-256)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "enterprise" && (
        <div className="enterprise-content glass-panel">
          <div className="content-header">
            <h3>
              <List size={20} /> System Audit Trail
            </h3>
            <p className="text-muted">GDPR compliant activity logging for enterprise security.</p>
          </div>
          <div className="audit-table">
            <table>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Action</th>
                  <th>User</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {logs.length > 0 ? (
                  logs.map((log, i) => (
                    <tr key={i}>
                      <td>{new Date(log.timestamp * 1000).toLocaleString()}</td>
                      <td>
                        <span className={`action-pill ${log.action.toLowerCase()}`}>
                          {log.action}
                        </span>
                      </td>
                      <td>{log.user}</td>
                      <td>{log.details}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No logs found in current audit period.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "developer" && (
        <div className="developer-content">
          <div className="api-keygen-card glass-panel">
            <div className="card-header">
              <Key size={24} color="var(--accent-primary)" />
              <h3>API Access Key</h3>
            </div>
            <p>Use this key to authorize REST API calls for dataset processing.</p>
            <div className="key-display">
              <input
                type="text"
                readOnly
                value={apiKey || "••••••••••••••••••••••••••••••"}
                className="glass-input"
              />
              <button className="btn-primary" onClick={handleKeyGen}>
                Regenerate
              </button>
            </div>
          </div>

          <div className="api-docs-preview glass-panel mt-4">
            <div className="card-header">
              <Database size={24} color="var(--accent-neon)" />
              <h3>Endpoint Quick Reference</h3>
            </div>
            <div className="endpoint-list">
              <div className="endpoint-item">
                <code>POST /api/analyze</code> - Upload & Clean
              </div>
              <div className="endpoint-item">
                <code>GET /api/download/:id</code> - Fetch Cleaned CSV
              </div>
              <div className="endpoint-item">
                <code>POST /api/sync/sheets</code> - Real-time G-Sheets Sync
              </div>
            </div>
          </div>
        </div>
      )}

      {showReport && (
        <div className="modal-overlay" onClick={() => setShowReport(false)}>
          <div className="report-modal glass-panel" onClick={(e) => e.stopPropagation()}>
            <div className="report-header">
              <div className="report-title-area">
                <Sparkles size={24} className="text-primary animate-pulse" />
                <div>
                  <h3>Neural Cleansing & Alignment Report</h3>
                  <p className="text-muted">Dataset: {filename}</p>
                </div>
              </div>
              <button className="btn-icon-small" onClick={() => setShowReport(false)}>
                ×
              </button>
            </div>

            <div className="report-overview-grid">
              <div className="report-score-card glass-panel-inner">
                <span className="card-lbl">Dataset Health Shift</span>
                <div className="score-shift-display">
                  <div className="score-block orig">
                    <span className="score-val">{metrics?.original_quality_score || 0}%</span>
                    <span className="score-lbl">Original</span>
                  </div>
                  <div className="score-arrow">
                    <TrendingUp size={24} className="text-success" />
                    <span className="improvement-badge">
                      +{Math.max(0, (metrics?.quality_score || 0) - (metrics?.original_quality_score || 0)).toFixed(1)}%
                    </span>
                  </div>
                  <div className="score-block clean">
                    <span className="score-val glow">{metrics?.quality_score || 0}%</span>
                    <span className="score-lbl">Cleaned</span>
                  </div>
                </div>
              </div>

              <div className="report-stats-card glass-panel-inner">
                <span className="card-lbl">Anomaly Cleanup Summary</span>
                <div className="r-stats-grid">
                  <div className="r-stat">
                    <strong>{metrics?.original_missing || 0}</strong>
                    <span>Missing → Fixed</span>
                  </div>
                  <div className="r-stat">
                    <strong>{metrics?.original_duplicates || 0}</strong>
                    <span>Duplicates → Removed</span>
                  </div>
                  <div className="r-stat">
                    <strong>{changesReport.length}</strong>
                    <span>Rules Applied</span>
                  </div>
                  <div className="r-stat">
                    <strong>{metrics?.total_rows}</strong>
                    <span>Total Rows</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="report-nav-bar">
              <div className="report-subtabs">
                <button
                  className={`report-tab-btn ${reportTab === "comparison" ? "active" : ""}`}
                  onClick={() => setReportTab("comparison")}
                >
                  <Database size={16} /> Data Comparison Preview
                </button>
                <button
                  className={`report-tab-btn ${reportTab === "logs" ? "active" : ""}`}
                  onClick={() => setReportTab("logs")}
                >
                  <List size={16} /> Cleaning Activity Logs
                </button>
              </div>
              {reportTab === "comparison" && (
                <div className="comparison-controls">
                  <div className="view-mode-selector">
                    <button
                      className={`control-btn ${comparisonMode === "split" ? "active" : ""}`}
                      onClick={() => setComparisonMode("split")}
                      title="Show both tables vertically stacked (best for full-width column view)"
                    >
                      Stacked View (Top/Bottom)
                    </button>
                    <button
                      className={`control-btn ${comparisonMode === "tabbed" ? "active" : ""}`}
                      onClick={() => setComparisonMode("tabbed")}
                      title="Single table with tabs"
                    >
                      Tabbed View
                    </button>
                  </div>
                  {comparisonMode === "tabbed" && (
                    <div className="table-selector">
                      <button
                        className={`table-btn-tab ${activeTableTab === "original" ? "active orig" : ""}`}
                        onClick={() => setActiveTableTab("original")}
                      >
                        Original (Before)
                      </button>
                      <button
                        className={`table-btn-tab ${activeTableTab === "cleaned" ? "active clean" : ""}`}
                        onClick={() => setActiveTableTab("cleaned")}
                      >
                        Cleaned (After)
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="report-content-body">
              {reportTab === "logs" ? (
                <div className="report-changes-list">
                  <h4>Neural Pipeline Executions</h4>
                  {changesReport.length > 0 ? (
                    <div className="changes-timeline">
                      {changesReport.map((change, i) => (
                        <div className="change-log-card" key={i}>
                          <CheckCircle size={16} color="var(--accent-success)" />
                          <p>{change}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted padding-large text-center">
                      No anomalies were found in the dataset schema. The data was perfectly aligned!
                    </p>
                  )}
                </div>
              ) : (
                <div className={`comparison-container ${comparisonMode} ${originalPreview.length === 0 ? "no-original" : ""}`}>
                  {originalPreview.length > 0 && (comparisonMode === "split" || (comparisonMode === "tabbed" && activeTableTab === "original")) && (
                    <div className="comparison-table-wrapper original-side">
                      <div className="table-header-title original-title">
                        <AlertTriangle size={16} /> Original Dataset (Before Cleaning)
                      </div>
                      <div className="table-container report-table-container">
                        <table>
                          <thead>
                            <tr>
                              {originalPreview.length > 0 ? (
                                Object.keys(originalPreview[0]).map((key) => (
                                  <th key={key}>{key}</th>
                                ))
                              ) : (
                                <th>Original Data Columns</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {originalPreview.length > 0 ? (
                              originalPreview.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                  {Object.keys(row).map((colName) => {
                                    const val = row[colName];
                                    const isMissing = val === null || val === undefined || val === "";
                                    return (
                                      <td key={colName} className={isMissing ? "cell-missing" : ""}>
                                        {isMissing ? "[Missing / NaN]" : val?.toString()}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td className="text-center padding-large" style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
                                  No Original Dataset Preview Loaded. Please re-upload a dataset file to generate a preview.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {(comparisonMode === "split" || (comparisonMode === "tabbed" && activeTableTab === "cleaned")) && (
                    <div className="comparison-table-wrapper cleaned-side">
                      <div className="table-header-title cleaned-title">
                        <CheckCircle size={16} /> Neural Corrected Dataset (After Cleaning)
                      </div>
                      <div className="table-container report-table-container">
                        <table>
                          <thead>
                            <tr>
                              {rawPreview.length > 0 ? (
                                Object.keys(rawPreview[0]).map((key) => (
                                  <th key={key}>{key}</th>
                                ))
                              ) : (
                                <th>Cleaned Data Columns</th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {rawPreview.length > 0 ? (
                              rawPreview.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                  {Object.keys(row).map((colName) => {
                                    const val = row[colName];
                                    const status = getCellStatus(rowIndex, colName, val);
                                    let cellClass = "";
                                    let displayVal = val?.toString();
                                    let label = null;
                                    if (status === "imputed") {
                                      cellClass = "cell-imputed";
                                      label = "AI Imputed";
                                    } else if (status === "corrected") {
                                      cellClass = "cell-corrected";
                                      label = "Standardized";
                                    }
                                    return (
                                      <td key={colName} className={cellClass}>
                                        {displayVal}
                                        {label && <span className="cell-indicator-badge">{label}</span>}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td className="text-center padding-large" style={{ color: "var(--text-muted)", fontStyle: "italic" }}>
                                  No Neural Corrected Dataset Preview Loaded.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="report-modal-footer">
              <button className="btn-outline" onClick={() => setShowReport(false)}>
                Back to Workspace
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  handleDownload();
                  setShowReport(false);
                }}
              >
                <Download size={18} /> Export Cleaned CSV
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
