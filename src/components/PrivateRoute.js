// components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');

//   return token ? children : <Navigate to="/login" />;
// };

if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    // Optional: Decode the token and check expiration
    const payload = JSON.parse(atob(token.split('.')[1]));
    const isExpired = payload.exp * 1000 < Date.now();
    if (isExpired) {
      localStorage.removeItem('token');
      return <Navigate to="/login" />;
    }
  } catch (error) {
    localStorage.removeItem('token');
    return <Navigate to="/login" />;
  }

  return children;
};


export default PrivateRoute;
