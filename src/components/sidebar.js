import React, { useState } from 'react';
import './sidebar.css'; // Import your CSS file for styling
// Material UI Icons
import HomeIcon from '@mui/icons-material/Home';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import NoteAdd from '@mui/icons-material/NoteAdd';
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
        <li onClick={handleItemClick}><span className="icon"><HomeIcon /></span><span className="text">Home</span></li>
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
