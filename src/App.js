import React, { useState , useEffect } from 'react';
import Sidebar from './components/sidebar';
import Home from './components/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/dashboard';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import './index.css'; // Import your global styles
import ProfilePage from './components/profile';

function App() {
  const [theme, setTheme] = useState('light');
  
  // Apply theme attribute for CSS vars
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);
  return (
    <>
  <button
    className="theme-toggle-btn"
    onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
  >
    {theme === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
  </button>
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
 


        {/* Add more routes here if needed */}
         {/* Protected route */}
        <Route 
          path="/sidebar" 
          element={
            <PrivateRoute>
              {<Sidebar/>}   
            </PrivateRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <PrivateRoute>
              {<ProfilePage/>}   
            </PrivateRoute>
          } 
        />



      </Routes>
    </Router>
    </>
  );

}

export default App;
