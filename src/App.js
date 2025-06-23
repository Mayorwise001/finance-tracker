import React from 'react';
import Sidebar from './components/sidebar';
import Home from './components/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />

        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );

}

export default App;
