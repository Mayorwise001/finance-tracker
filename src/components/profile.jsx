import React, { useState, useEffect } from 'react';
import '../styles/profile.css';
import ProfileSidebar from './profilesidebar';
import introJs from 'intro.js';
import 'intro.js/introjs.css';
import gsap from 'gsap';
import 'lord-icon-element'; // Ensure this is installed and configured properly
import '../styles/introjs.css'



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

useEffect(() => {
    const hasVisited = localStorage.getItem('hasSeenTutorial');

    if (!hasVisited) {
      const intro = introJs();
      intro.setOptions({
        showProgress: true,
        showBullets: false,
        steps: [
          {
            element: '#profile-title',
            intro: '<div class="tooltip-animated">This is your profile title</div>',
          },
          {
            element: '#username-label',
            intro: '<div class="tooltip-animated">Change your username here</div>',
          },
          {
            element: '#email-label',
            intro: '<div class="tooltip-animated">Change your email here</div>',
          },
          {
            element: '#password-label',
            intro: '<div class="tooltip-animated">Change your password here</div>',
          },
          {
            element: '#edit-profile-btn',
            intro: '<div class="tooltip-animated">Click to edit your profile</div>',
          },
        ],
      });

      intro.onafterchange(function () {
        const tooltip = document.querySelector('.introjs-tooltip');
        if (tooltip) {
          gsap.fromTo(
            tooltip,
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
          );
        }
      });

      intro.start();
      localStorage.setItem('hasSeenTutorial', 'true');
    }
  }, []);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('https://finance-tracker-backend-ckqn.onrender.com/api/auth/profile', {
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
      const res = await fetch('https://finance-tracker-backend-ckqn.onrender.com/api/auth/profile', {
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
        <h2 className="profile-title" data-intro="This is your profile title" data-step="1" id="profile-title">My Profile</h2>

      <div>
        <label className="profile-label" id="username-label">Username</label>
        <input
          type="text"
          name="username"
          value={tempData.username}
          onChange={handleChange}
          disabled={!editMode}
          className="profile-input"
            data-intro="Change your username here"
  data-step="2"
        />
      </div>

      <div>
        <label className="profile-label" id="email-label">Email</label>
        <input
          type="email"
          name="email"
          value={tempData.email}
          onChange={handleChange}
          disabled={!editMode}
          className="profile-input"
          data-intro="Change your email here"
  data-step="3"
        />
      </div>

      <div>
        <label className="profile-label" id="password-label">Password</label>
        <div className="profile-password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={tempData.password}
            onChange={handleChange}
            disabled={!editMode}
            className="profile-input"
                      data-intro="Change your password here"
  data-step="4"
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
          <button onClick={() => setEditMode(true)} className="profile-button edit-btn" id="edit-profile-btn" data-intro="Click to enable editing of your profile"
  data-step="5">
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
