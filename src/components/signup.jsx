import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/signup.css';
import { FaEye, FaEyeSlash, FaCog } from 'react-icons/fa';
import Navbar from '../components/home_components/navbar'; // Import your Navbar component
import Footers from '../components/home_components/footer'; // Adjust the import path as necessary
import { FaEnvelope, FaUserTag, FaLock, FaUserPlus } from 'react-icons/fa';


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: ''
  });

   const [focusedInput, setFocusedInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ message: '', success: null });

  const passwordCriteria = {
    hasUppercase: /[A-Z]/.test(formData.password),
    hasLowercase: /[a-z]/.test(formData.password),
    hasNumber: /[0-9]/.test(formData.password),
    hasSymbol: /[!@#$%^&*]/.test(formData.password),
    minLength: formData.password.length >= 6
  };

  const allValid = Object.values(passwordCriteria).every(Boolean);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatus({ message: '', success: null });
  };
const handleSubmit = async e => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    return setStatus({ message: 'Passwords do not match', success: false });
  }

  if (!allValid) {
    return setStatus({ message: 'Password does not meet requirements.', success: false });
  }

  setLoading(true);
  try {
    const res = await fetch('https://finance-tracker-backend-ckqn.onrender.com/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    setStatus({ message: 'Signup successful!', success: true });
    setTimeout(() => navigate('/login'), 2000);
  } catch (error) {
    setStatus({ message: error.message, success: false });
  } finally {
    setLoading(false);
  }
};




  return (
<>
       <Navbar />
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className=".logo-wrapper">
  <img src="./NewLogo.png" alt="Logo" className="logo-img2" />
  <h2 className="logo-text">Expense Tracker Expert</h2>
</div>
        <h2>Create Account</h2>
        <div className="form-row">
            <div className="input-icon-wrapper">
          <input type="text" name="firstName" 
          placeholder="First Name" 
          value={formData.firstName} 
          onChange={handleChange} required
                          onFocus={() => setFocusedInput('firstName')}
                onBlur={() => setFocusedInput('')}
          
          />

                <FaUserPlus className={`input-icon ${focusedInput === 'firstName' ? 'show' : ''}`} />
          </div>

          <div className="input-icon-wrapper">

          <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} 
                          onFocus={() => setFocusedInput('lastName')}
                onBlur={() => setFocusedInput('')}
          required />
        </div>
</div>

<div className="input-icon-wrapper">
        <input type="text" 
        name="username" 
        placeholder="Username" 
        value={formData.username} 
        onChange={handleChange}
                      onFocus={() => setFocusedInput('username')}
              onBlur={() => setFocusedInput('')}
               required />
                <FaUserTag className={`input-icon ${focusedInput === 'username' ? 'show' : ''}`} />
        </div>

<div className="input-icon-wrapper">
        <input type="email" 
        name="email" 
        placeholder="Email Address"
        value={formData.email} 
        onChange={handleChange} 
                      onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput('')}
        required />
<FaEnvelope className={`input-icon ${focusedInput === 'email' ? 'show' : ''}`} />
        </div>

        <div className="password-group input-with-icon">

          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
                          onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput('')}
            required
          />
           <FaLock className={`input-icon ${focusedInput === 'password' ? 'show' : ''}`} />
          <span onClick={() => setShowPassword(!showPassword)} className="toggle-password">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

     <div className="password-group input-icon-wrapper">

          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onFocus={() => setFocusedInput('confirmPassword')}
              onBlur={() => setFocusedInput('')}
            required
          />
          <FaLock className={`input-icon ${focusedInput === 'confirmPassword' ? 'show' : ''}`} />
        </div>

        <div className="password-checklist">
          <p className={passwordCriteria.minLength ? 'valid' : ''}>✔ At least 6 characters</p>
          <p className={passwordCriteria.hasUppercase ? 'valid' : ''}>✔ Uppercase letter</p>
          <p className={passwordCriteria.hasLowercase ? 'valid' : ''}>✔ Lowercase letter</p>
          <p className={passwordCriteria.hasNumber ? 'valid' : ''}>✔ Number</p>
          <p className={passwordCriteria.hasSymbol ? 'valid' : ''}>✔ Symbol (!@#$...)</p>
        </div>

        {status.message && (
          <div className={`status-message ${status.success ? 'success' : 'error'}`}>
            {status.message}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? (
            <span className="loading">
              <FaCog className="spin" /> Creating Account...
            </span>
          ) : (
            'Sign Up'
          )}
        </button>

        <p className="auth-switch">
          Already have an account? <span onClick={() => navigate('/login')}>Login</span>
        </p>
      </form>
    </div>
    <Footers/>
    </>
  );
};

export default Signup;
