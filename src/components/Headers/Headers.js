import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><a href="#">Exams</a></li>
          <li><a href="#">Grades</a></li>
          <li><a href="#">Analytics</a></li>
          <li><a href="#">Question Bank</a></li>
          <li><a href="#">Help</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;