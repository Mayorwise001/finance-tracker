import React, { useState } from 'react';
import '../styles/login.css';
import { FaEye, FaEyeSlash,FaCog } from 'react-icons/fa';
import { redirect, useNavigate } from 'react-router-dom';
import Footers from '../components/home_components/footer'; // Adjust the import path as necessary
import Navbar from '../components/home_components/navbar'; // Import your Navbar component

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
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) throw new Error('Invalid credentials');

      const data = await response.json();
      // setStatusMessage('Login Successful!');
      // setTimeout(() => {
      //   navigate('/'); // Redirect to a protected page
      // }, 1500);
          // Delay status message to allow spinner to spin first
    setTimeout(() => {
      setStatusMessage('Login successful!');
      localStorage.setItem('token', data.token);

      setLoading(false);  // Stop spinner after showing success
      setTimeout(() => {
        // navigate('/home');
        navigate('/sidebar');
      }, 1100); // Delay redirect slightly for message to show
    }, 1100); // Adjust this delay (ms) to match your desired spinner duration
      // Optionally, you can store the token in localStorage or context
    } catch (err) {
    // Delay error message
    setTimeout(() => {
      setError(true);
      setStatusMessage('Login Failed. Please check your credentials.');
      setLoading(false);
    }, 1000);
  }
  };

  return (
    <>
    <Navbar />
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <div className=".logo-wrapper">
  <img src="./NewLogo.png" alt="Logo" className="logo-img" />
  <h2 className="logo-text">Expense Tracker Expert</h2>
</div>
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
    className={`status-message ${statusMessage === 'Login successful!' ? 'success' : 'error'}`}
  >
    {statusMessage}
  </p>
)}


      </form>
    </div>

       <Footers/>
    </>
  );
};

export default Login;
