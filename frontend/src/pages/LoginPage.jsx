import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import api from '../api';
import './Auth.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const cleanData = {
        email: formData.email.trim(),
        password: formData.password.trim()
      };
      console.log("Attempting login for:", cleanData.email);
      const res = await api.post('/api/auth/login', cleanData);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      window.dispatchEvent(new Event('storage')); // Force navbar update
      
      setLoggedInUser(res.data.user.username);
      setShowWelcome(true);
      
      setTimeout(() => {
        navigate(res.data.user.role === 'admin' ? '/admin' : '/');
      }, 2500);
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.detail || 'Login failed. Please check your credentials and connection.');
    } finally {
      setLoading(false);
    }
  };

  if (showWelcome) {
    return (
      <div className="welcome-flash-overlay">
        <div className="welcome-content">
          <div className="neural-ping"></div>
          <h1 className="welcome-text">Welcome back, <span className="text-gradient">{loggedInUser}</span></h1>
          <p>Initializing Neural Workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Login to your account</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <Mail size={18} />
            <input 
              type="email" 
              placeholder="Email" 
              required 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="input-group">
            <Lock size={18} />
            <input 
              type="password" 
              placeholder="Password" 
              required 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>
          <button type="submit" className="btn-primary auth-submit" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : 'Login'} <ArrowRight size={18} />
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
