// 📁 src/components/EntryHistory.jsx

import React, { useEffect } from 'react';
import axios from 'axios';

const EntryHistory = ({ entries, setEntries }) => {
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const token = localStorage.getItem('token'); // ✅ Get JWT token
        const response = await axios.get('https://finance-tracker-backend-ckqn.onrender.com/api/auth/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEntries(response.data); // ✅ Load entries into the Sidebar state
      } catch (error) {
        console.error('Error fetching user entries:', error);
      }
    };

    fetchEntries(); // ✅ Fetch on mount
  }, [setEntries]);

  return null; // No UI, just populates state in Sidebar
};

export default EntryHistory;
