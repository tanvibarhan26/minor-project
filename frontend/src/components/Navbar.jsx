import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Database, UploadCloud, LayoutDashboard, Settings, User, LogOut, 
  Shield, Bell, Check, Trash2, Clock, Menu, X, ChevronDown, 
  Sparkles, Activity, Eye, Share2, Code, BarChart3 
} from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hide on scroll down, show on scroll up. Keep visible at the very top.
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const { notifications, unreadCount, markAsRead, clearAll } = useNotifications();
  const notificationRef = useRef(null);

  useEffect(() => {
    const checkUser = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('storage', checkUser);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  return (
    <nav className={`navbar glass-panel ${visible ? '' : 'nav-hidden'}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="DataCleanse Logo" className="logo-img" />
          <span className="logo-text">Data<span className="text-highlight">Cleanse</span>.AI</span>
        </Link>
        
        <button className="mobile-menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>

          <div 
            className="nav-link-dropdown" 
            onMouseEnter={() => setShowMegaMenu(true)} 
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            <span className={`nav-link dropdown-trigger ${showMegaMenu ? 'active' : ''}`}>
              Products <ChevronDown size={14} className={`dropdown-arrow ${showMegaMenu ? 'open' : ''}`} />
            </span>
            {showMegaMenu && (
              <div className="mega-menu glass-panel">
                <div className="mega-menu-content">
                  <div className="mega-menu-banner">
                    <div className="banner-badge">AI CORE SYSTEM</div>
                    <h3>DataCleanse.AI Platform</h3>
                    <p>Unlock the power of neural intelligence for complete, secure, and production-ready data integrity.</p>
                    <Link to="/signup" className="btn-primary" onClick={() => setShowMegaMenu(false)}>Start Free Trial &rarr;</Link>
                  </div>
                  <div className="mega-menu-grid">
                    <a href="#ai-data-cleaner" className="mega-menu-item" onClick={() => setShowMegaMenu(false)}>
                      <div className="item-icon-wrapper purple"><Sparkles size={18} /></div>
                      <div className="item-details">
                        <h4>AI Data Cleaner</h4>
                        <p>Automatically clean CSV/Excel datasets using AI.</p>
                        <div className="item-features">Deduplication • Normalization</div>
                      </div>
                    </a>
                    <a href="#dataset-health-analyzer" className="mega-menu-item" onClick={() => setShowMegaMenu(false)}>
                      <div className="item-icon-wrapper blue"><Activity size={18} /></div>
                      <div className="item-details">
                        <h4>Dataset Health Analyzer</h4>
                        <p>Generate an AI-powered health score for datasets.</p>
                        <div className="item-features">Accuracy • Completeness • Consistency</div>
                      </div>
                    </a>
                    <Link to="/sentinel" className="mega-menu-item" onClick={() => setShowMegaMenu(false)}>
                      <div className="item-icon-wrapper neon"><Eye size={18} /></div>
                      <div className="item-details">
                        <h4>AI Sentinel Surveillance</h4>
                        <p>24/7 continuous threat monitoring and diagnostics.</p>
                        <div className="item-features">Anomalies • Live Pulses • Logs</div>
                      </div>
                    </Link>
                    <a href="#gsheets-integration" className="mega-menu-item" onClick={() => setShowMegaMenu(false)}>
                      <div className="item-icon-wrapper green"><Share2 size={18} /></div>
                      <div className="item-details">
                        <h4>Google Sheets Integration</h4>
                        <p>Connect and sync Google Sheets in real time.</p>
                        <div className="item-features">OAuth • Auto Sync • Two-way Sync</div>
                      </div>
                    </a>
                    <a href="#developer-api" className="mega-menu-item" onClick={() => setShowMegaMenu(false)}>
                      <div className="item-icon-wrapper yellow"><Code size={18} /></div>
                      <div className="item-details">
                        <h4>Developer API Platform</h4>
                        <p>Allow developers to clean data using APIs.</p>
                        <div className="item-features">API Keys • REST API • Usage Logs</div>
                      </div>
                    </a>
                    <a href="#enterprise-security" className="mega-menu-item" onClick={() => setShowMegaMenu(false)}>
                      <div className="item-icon-wrapper red"><Shield size={18} /></div>
                      <div className="item-details">
                        <h4>Enterprise Security</h4>
                        <p>Enterprise protection for sensitive datasets.</p>
                        <div className="item-features">GDPR • Encryption • Audit Trails</div>
                      </div>
                    </a>
                    <a href="#analytics-dashboard" className="mega-menu-item full-width" onClick={() => setShowMegaMenu(false)}>
                      <div className="item-icon-wrapper orange"><BarChart3 size={18} /></div>
                      <div className="item-details">
                        <h4>Analytics Dashboard</h4>
                        <p>Visualize dataset quality metrics and AI insights.</p>
                        <div className="item-features">Charts • Error Heatmaps • Recommendations</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          <a href="/#features" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="/#pricing" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
          <a href="/#about" className="nav-link" onClick={() => setMobileMenuOpen(false)}>About</a>
          {user && (
            <>
              <div className="nav-divider"></div>
              <Link to="/upload" className={`nav-link workspace-link ${location.pathname === '/upload' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                <UploadCloud size={18} />
                Upload
              </Link>
              <Link to="/dashboard" className={`nav-link workspace-link ${location.pathname === '/dashboard' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className={`nav-link workspace-link ${location.pathname === '/admin' ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}>
                  <Shield size={18} />
                  Admin
                </Link>
              )}
            </>
          )}
        </div>

        <div className="navbar-actions">
          {user && (
            <div className="notification-wrapper" ref={notificationRef}>
              <button 
                className={`btn-icon ${unreadCount > 0 ? 'has-unread' : ''}`} 
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                {unreadCount > 0 && <span className="unread-badge">{unreadCount}</span>}
              </button>

              {showNotifications && (
                <div className="notification-dropdown glass-panel">
                  <div className="dropdown-header">
                    <h4>Notifications</h4>
                    <button className="btn-text-small" onClick={clearAll}>Clear all</button>
                  </div>
                  <div className="notification-list">
                    {notifications.length === 0 ? (
                      <div className="empty-notifications">
                        <Bell size={32} opacity={0.3} />
                        <p>No new notifications</p>
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className={`notification-item ${n.read ? 'read' : ''}`} onClick={() => markAsRead(n.id)}>
                          <div className={`notification-status ${n.type}`}></div>
                          <div className="notification-content">
                            <h5>{n.title}</h5>
                            <p>{n.message}</p>
                            <span className="notification-time"><Clock size={12} /> {n.time}</span>
                          </div>
                          {!n.read && <Check size={14} className="mark-read-icon" />}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {user ? (
            <div className="user-profile">
              <span className="user-name">
                {user.role === 'admin' ? <Shield size={18} className="admin-nav-icon" /> : <User size={18} />}
                {user.username}
                {user.role === 'admin' && <span className="admin-role-badge">Admin</span>}
              </span>
              <button className="btn-logout" onClick={handleLogout} title="Logout">
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="btn-primary">Get Started</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
