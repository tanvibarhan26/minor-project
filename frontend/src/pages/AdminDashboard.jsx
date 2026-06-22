import React, { useEffect, useState } from 'react';
import { Users, Database, Activity, ShieldCheck, Clock, UserCheck } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import api from '../api';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModal, setActiveModal] = useState(null); // 'users', 'logs', 'config'
  const [usersList, setUsersList] = useState([]);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const { addNotification } = useNotifications();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/api/admin/stats');
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch admin stats');
      } finally {
        setLoading(false);
      }
    };
    
    const fetchConfig = async () => {
      try {
        const res = await api.get('/api/admin/config');
        setMaintenanceMode(res.data.maintenance_mode);
      } catch (err) {
        console.error('Failed to fetch system config');
      }
    };
    
    fetchStats();
    fetchConfig();
  }, []);

  const toggleMaintenanceMode = async () => {
    const newState = !maintenanceMode;
    // Optimistic update
    setMaintenanceMode(newState);
    try {
      await api.post('/api/admin/config', { maintenance_mode: newState });
      addNotification(
        'System Update',
        `Maintenance mode is now ${newState ? 'ON' : 'OFF'}`,
        newState ? 'warning' : 'success'
      );
    } catch (err) {
      setMaintenanceMode(!newState);
      addNotification('Error', 'Failed to update system config', 'error');
    }
  };

  const handleFetchUsers = async () => {
    try {
      const res = await api.get('/api/admin/users');
      setUsersList(res.data);
      setActiveModal('users');
    } catch (err) {
      addNotification('Error', 'Failed to fetch users list', 'error');
    }
  };

  const handleRevoke = () => {
    if (window.confirm('CRITICAL ACTION: Are you sure you want to revoke all system access? This will invalidate all active sessions.')) {
      addNotification(
        'System Lockout',
        'All active sessions have been invalidated. Security override complete.',
        'success'
      );
    }
  };

  if (loading) return <div className="admin-loading">Loading Management Console...</div>;

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div>
          <h1>Admin Management Console</h1>
          <p>System-wide overview and user management</p>
        </div>
        <div className="system-status">
          <ShieldCheck className="text-success" />
          <span>System Healthy</span>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <Users className="stat-icon purple" />
          <div className="stat-info">
            <h3>{stats?.total_users}</h3>
            <p>Total Registered Users</p>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <Database className="stat-icon blue" />
          <div className="stat-info">
            <h3>{stats?.total_datasets_analyzed}</h3>
            <p>Datasets Analyzed</p>
          </div>
        </div>
        <div className="stat-card glass-panel">
          <Activity className="stat-icon neon" />
          <div className="stat-info">
            <h3>99.9%</h3>
            <p>API Uptime</p>
          </div>
        </div>
      </div>

      <div className="admin-content-grid">
        <div className="recent-activity-panel glass-panel">
          <h3><Clock size={20} /> Recent Activity</h3>
          <div className="activity-list">
            {stats?.recent_activity.map((item, i) => (
              <div key={i} className="activity-item">
                <div className="activity-user-avatar">
                  {item.user[0].toUpperCase()}
                </div>
                <div className="activity-details">
                  <span className="user-email">{item.user}</span>
                  <span className="user-action">{item.action}</span>
                </div>
                <span className="activity-time">{item.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="quick-actions-panel glass-panel">
          <h3><UserCheck size={20} /> User Controls</h3>
          <div className="actions-list">
            <button className="btn-outline" onClick={handleFetchUsers}>Manage User Roles</button>
            <button className="btn-outline" onClick={() => setActiveModal('logs')}>View API Logs</button>
            <button className="btn-outline" onClick={() => setActiveModal('config')}>System Configuration</button>
            <button className="btn-primary danger" onClick={handleRevoke}>Revoke All Access</button>
          </div>
        </div>
      </div>

      {/* Admin Modals */}
      {activeModal === 'users' && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="admin-modal glass-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Manage User Roles</h3>
              <button className="btn-close" onClick={() => setActiveModal(null)}>&times;</button>
            </div>
            <div className="user-table-container">
              <table>
                <thead>
                  <tr><th>Username</th><th>Email</th><th>Role</th><th>Action</th></tr>
                </thead>
                <tbody>
                  {usersList.map((u, i) => (
                    <tr key={i}>
                      <td>{u.username}</td>
                      <td>{u.email}</td>
                      <td><span className={`role-badge ${u.role}`}>{u.role}</span></td>
                      <td><button className="btn-text-small">Modify</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'logs' && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="admin-modal glass-panel wide" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>System API Logs</h3>
              <button className="btn-close" onClick={() => setActiveModal(null)}>&times;</button>
            </div>
            <div className="logs-preview-list">
              <div className="log-entry"><code>[2024-05-16 21:30:12] INFO: POST /api/analyze - 200 OK (User: dev@test.com)</code></div>
              <div className="log-entry"><code>[2024-05-16 21:30:45] WARN: GET /api/admin/stats - 403 Forbidden (User: user@demo.com)</code></div>
              <div className="log-entry"><code>[2024-05-16 21:31:02] INFO: GET /api/download/7f2a - 200 OK (User: admin@cleanse.ai)</code></div>
              <p className="text-muted text-center mt-4">Streaming logs from Neural-Cloud Engine...</p>
            </div>
          </div>
        </div>
      )}

      {activeModal === 'config' && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="admin-modal glass-panel" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>System Configuration</h3>
              <button className="btn-close" onClick={() => setActiveModal(null)}>&times;</button>
            </div>
            <div className="config-form">
              <div className="config-item">
                <label>Maintenance Mode</label>
                <div 
                  className={`toggle-switch ${maintenanceMode ? 'active' : ''}`}
                  onClick={toggleMaintenanceMode}
                  style={{ 
                    cursor: 'pointer', 
                    backgroundColor: maintenanceMode ? '#ef4444' : '#334155', 
                    color: 'white',
                    userSelect: 'none'
                  }}
                >
                  {maintenanceMode ? 'ON' : 'OFF'}
                </div>
              </div>
              <div className="config-item">
                <label>API Rate Limit</label>
                <input type="number" defaultValue={500} className="glass-input-small" />
              </div>
              <div className="config-item">
                <label>Storage Quota (GB)</label>
                <input type="number" defaultValue={10} className="glass-input-small" />
              </div>
              <button className="btn-primary w-full mt-4" onClick={() => { addNotification('Success', 'Configuration saved', 'success'); setActiveModal(null); }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
