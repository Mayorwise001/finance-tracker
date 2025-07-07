import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:5000/api/auth/get', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Unauthorized');
        return res.json();
      })
      .then(data => setUserData(data.user))
      .catch(err => {
        console.error(err);
        localStorage.removeItem('token');
        navigate('/login');
      });
  }, [navigate]);

  if (!userData) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {userData.username}!</h2>
      {/* Protected content goes here */}
    </div>
  );
};

export default Dashboard;
