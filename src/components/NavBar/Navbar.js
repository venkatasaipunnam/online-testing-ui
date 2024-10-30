import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboardList, faChartLine, faGraduationCap, faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import { NavMiddleMenu } from '../../utils/UserAccess';

const Navbar = (props) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const { user } = props;
  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  console.log(user);
  const navMenu = Object.entries(NavMiddleMenu[user?.userType]);

  console.log(navMenu);

  return (
    <nav className="navbar">
      <h1 className="navbar__title">Online Testing App</h1>
      <div className="navbar__center">
        {navMenu.map(([index, data]) => (
          <Link key={data.path} to={data.path} className="navbar__link" data-automation-id={"navbar_link"+data.label}>
            <FontAwesomeIcon icon={data.icon} /> <p className='navbar-link'>{data.label}</p>
          </Link>
        ))}
        {/* <Link to="/home" className="navbar__link">
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
        </Link> */}
      </div>

      {/* Profile Section */}
      <div className="navbar__profile">
        <button onClick={toggleProfileMenu} className="navbar__profile-button">
          <FontAwesomeIcon icon={faUserCircle} /> <p className='navbar-link'>Profile</p>
        </button>
        {isProfileOpen && (
          <div className="navbar__profile-menu">
            <Link to="/profile" className="navbar__profile-item">Profile</Link>
            <Link to="/changepassword" className="navbar__profile-item">Change Password</Link>
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
