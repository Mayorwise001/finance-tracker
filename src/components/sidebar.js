import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/sidebar.css'; // Import your CSS file for styling
// Material UI Icons
import HomeIcon from '@mui/icons-material/Home';
import NoteAdd from '@mui/icons-material/NoteAdd';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  // const [isOpen, setIsOpen] = useState(true);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768); // open by default on desktop

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsOpen(!mobile); // Open on desktop, closed on mobile
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    document.activeElement.blur(); // removes focus from any clicked item

  };

  const handleItemClick = () => {
    if (!isOpen) setIsOpen(true);
  };

  return (
    <div className={`layout ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        <ul>
        <li onClick={handleItemClick}><span className="icon"><HomeIcon /></span><span><Link to="/home" className="text link-clean">Home</Link></span></li>
        <li onClick={handleItemClick}><span className="icon"><NoteAdd /></span><span className="text">New</span></li>
          <li onClick={handleItemClick}><span className="icon"><SearchIcon /></span><span className="text">Search</span></li>
          <li onClick={handleItemClick}><span className="icon"><PersonIcon /></span><span className="text">Profile</span></li>
          <li onClick={handleItemClick}><span className="icon"><LogoutIcon /></span><span className="text">Logout</span></li>
        </ul>
      </div>

      <div className="content">
        <h1>Welcome!</h1>
        <p>This is a responsive React sidebar with hidden text when collapsed.</p>
      </div>
    </div>
  );
};

export default Sidebar;
