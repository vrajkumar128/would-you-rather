import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.min.css';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact activeClassName="active">Home</NavLink>
        </li>
        <li>
          <a>Add Question</a>
        </li>
        <li>
          <a>Leaderboard</a>
        </li>
      </ul>
    </nav>
  </header>
);

export default Header;
