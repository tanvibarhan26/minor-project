import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import api from '../api';
import './Auth.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const [registeredUser, setRegisteredUser] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const cleanData = {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password.trim()
      };
      console.log("Registering user:", cleanData.email);
      const res = await api.post('/api/auth/register', cleanData);
      
      const userObject = {
        username: cleanData.username,
        email: cleanData.email,
        role: res.data.role
      };
      
      // Directly log user in
      localStorage.setItem('user', JSON.stringify(userObject));
      window.dispatchEvent(new Event('storage')); // Force navbar and landing updates
      
      setRegisteredUser(cleanData.username);
      setShowWelcome(true);
      
      setTimeout(() => {
        navigate(userObject.role === 'admin' ? '/admin' : '/');
      }, 2500);
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showWelcome) {
    return (
      <div className="welcome-flash-overlay">
        <div className="welcome-content">
          <div className="neural-ping"></div>
          <h1 className="welcome-text">Welcome, <span className="text-gradient">{registeredUser}</span></h1>
          <p>Creating and Initializing Neural Workspace...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card glass-panel">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join DataCleanse.AI today</p>
        </div>
        
        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <User size={18} />
            <input 
              type="text" 
              placeholder="Username" 
              required 
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
            />
          </div>
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
            {loading ? <Loader2 className="animate-spin" /> : 'Sign Up'} <ArrowRight size={18} />
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
