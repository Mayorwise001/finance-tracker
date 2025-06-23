import React, { useState } from 'react';
import '../styles/login.css';
import { FaEye, FaEyeSlash,FaCog } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setStatusMessage('');

    try {
      // Replace this with your API endpoint
      const response = await fetch('https://yourapi.com/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Invalid credentials');

      const data = await response.json();
      setStatusMessage('Login Successful!');
      setTimeout(() => {
        navigate('/dashboard'); // Redirect to a protected page
      }, 1500);
    } catch (err) {
      setError(true);
      setStatusMessage('Login Failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <h2>Welcome Back</h2>
        <p>Please login to continue</p>

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />

  <div className="password-wrapper">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
          />
          <span
            className="toggle-password"
            onClick={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div className="button-row">
<button type="submit" disabled={loading} className="login-button">
  {loading ? (
    <span className="loading-content">
      <FaCog className="spinner" />
      <span className="loading-text">  Logging in...</span>
    </span>
  ) : (
    'Login'
  )}
</button>

  <button
    type="button"
    className="signup-button"
    onClick={() => navigate('/signup')}
  >
    Sign Up
  </button>
</div>

{statusMessage && (
  <p
    className={`status-message ${statusMessage === 'Login successful' ? 'success' : 'error'}`}
  >
    {statusMessage}
  </p>
)}


      </form>
    </div>
    </>
  );
};

export default Login;
