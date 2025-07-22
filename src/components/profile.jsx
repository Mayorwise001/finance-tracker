import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import ProfileSidebar from './profilesidebar';


const ProfilePage = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [editMode, setEditMode] = useState(false);
  const [tempData, setTempData] = useState(userData);
  const [showPassword, setShowPassword] = useState(false);

     // State to control sidebar visibility (open or collapsed)
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // ADD: Listen to screen resize to update sidebar open state

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        setUserData(data);
        setTempData(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(tempData)
      });

      const result = await res.json();
      if (res.ok) {
        alert('Profile updated!');
        setUserData(tempData);
        setEditMode(false);
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
    }
  };

  const handleCancel = () => {
    setTempData(userData);
    setEditMode(false);
  };

 // Toggle sidebar open/close
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
 {/* Dynamic class changes depending on sidebar state */}
    <div className={`profile-container ${sidebarOpen ? 'sidebar-visible' : 'sidebar-collapsed'}`}>
     
      <ProfileSidebar isOpen={sidebarOpen} toggleSidebar={setSidebarOpen} />
     <div className="profile-content">
        <h2 className="profile-title">My Profile</h2>

      <div>
        <label className="profile-label">Username</label>
        <input
          type="text"
          name="username"
          value={tempData.username}
          onChange={handleChange}
          disabled={!editMode}
          className="profile-input"
        />
      </div>

      <div>
        <label className="profile-label">Email</label>
        <input
          type="email"
          name="email"
          value={tempData.email}
          onChange={handleChange}
          disabled={!editMode}
          className="profile-input"
        />
      </div>

      <div>
        <label className="profile-label">Password</label>
        <div className="profile-password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={tempData.password}
            onChange={handleChange}
            disabled={!editMode}
            className="profile-input"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="profile-password-toggle"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </div>

      <div className="profile-buttons">
        {editMode ? (
          <>
            <button onClick={handleSave} className="profile-button save-btn">
              Save
            </button>
            <button onClick={handleCancel} className="profile-button cancel-btn">
              Cancel
            </button>
          </>
        ) : (
          <button onClick={() => setEditMode(true)} className="profile-button edit-btn">
            Edit Profile
          </button>
        )}
      </div>
    </div>
    </div>
        </>
  );
};

export default ProfilePage;
