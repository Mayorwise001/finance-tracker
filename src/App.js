import React from 'react';
import Sidebar from './components/sidebar';
import Home from './components/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/home" element={<Home />} />
        {/* Add more routes here if needed */}
      </Routes>
    </Router>
  );

}

export default App;
