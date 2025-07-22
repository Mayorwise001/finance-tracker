
import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css'; // Import your CSS file for styling
import {logout} from './logout'
// Material UI Icons
import HomeIcon from '@mui/icons-material/Home';
import NoteAdd from '@mui/icons-material/NoteAdd';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import 'react-toastify/dist/ReactToastify.css';
import introJs from 'intro.js';
import 'intro.js/introjs.css';


const ProfileSidebar = ({ isOpen, toggleSidebar }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [theme, setTheme] = useState('light');

  // Update sidebar open state on resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      toggleSidebar(!mobile); // Update parent sidebar state
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [toggleSidebar]);
  return (
    <div className={`layout ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <button className="toggle-btn" onClick={() => toggleSidebar(!isOpen)}>
        ☰
      </button>

      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className="top-bar">

        </div>
        <ul>
            <li><span
  onClick={() => introJs().start()}
  className="help-tour-btn text link-clean" 
 
  title="Take a quick tour"
>
      <lord-icon
        src="https://cdn.lordicon.com/msetysan.json"
  trigger="hover"
  colors="primary:#ffffff,secondary:#3b82f6"
  style={{ width: "27px", height: "27px" }}
></lord-icon>
  Click here for help
</span></li>
          <li><span className="icon"><HomeIcon /></span><span><Link to="/" className="text link-clean"  title="Visit the home page">Home</Link></span></li>
          <li><span className="icon"><NoteAdd /></span><span><Link to="/sidebar" className="text link-clean">Create a New Entry</Link></span></li>
          <li><span className="icon"><PersonIcon /></span><span><Link to="/profile" className="text link-clean">Profile</Link></span></li>
          <li onClick={logout}><span className="icon"><LogoutIcon /></span><span className="text">Logout</span></li>
        </ul>
      </div>
    </div>
  );
};

export default ProfileSidebar;
