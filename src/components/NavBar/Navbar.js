import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboardList, faChartLine, faGraduationCap, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="navbar">
      <h1 className="navbar__title">Online Testing App</h1>
      <div className="navbar__center">
        <Link to="/home" className="navbar__link">
          <FontAwesomeIcon icon={faHome} /> <p className='navbar-link'>Home</p>
        </Link>
        <Link to="/exams" className="navbar__link">
          <FontAwesomeIcon icon={faClipboardList} /> <p className='navbar-link'>Exams</p>
        </Link>
        <Link to="/grades" className="navbar__link">
          <FontAwesomeIcon icon={faGraduationCap} /> <p className='navbar-link'>Grades</p>
        </Link>
        <Link to="/analysis" className="navbar__link">
          <FontAwesomeIcon icon={faChartLine} /> <p className='navbar-link'>Analysis</p>
        </Link>
      </div>

      {/* Profile Section */}
      <div className="navbar__profile">
        <button onClick={toggleProfileMenu} className="navbar__profile-button">
          <FontAwesomeIcon icon={faUserCircle} /> <p className='navbar-link'>Profile</p>
        </button>
        {isProfileOpen && (
          <div className="navbar__profile-menu">
            <Link to="/profile" className="navbar__profile-item">Profile</Link>
            <Link to="/change-password" className="navbar__profile-item">Change Password</Link>
          </div>
        )}
      </div>

      {/* Logout Button */}
      <button className="navbar__logout-button" onClick={() => navigate("/logout")}>
        <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" /> Logout
      </button>
    </nav>
  );
};

export default Navbar;
