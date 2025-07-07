import React from 'react';
import Sidebar from './components/sidebar';
import Home from './components/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/dashboard';




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        {/* <Route path="/home" element={<Home />} /> */}
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



      </Routes>
    </Router>
  );

}

export default App;
