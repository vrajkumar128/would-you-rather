import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.min.css';
import { connect } from 'react-redux';
import { unsetAuthedUser } from '../../actions/authedUser';
import { Dropdown } from 'semantic-ui-react';

const Header = ({ authedUser, users, dispatch }) => {
  const pages = [
    { href: "/", label: "Home" },
    { href: "/add", label: "Add Question" },
    { href: "/leaderboard", label: "Leaderboard" }
  ];

  const renderPages = () => (
    pages.map(page => (
      <li key={page.label}>
        <NavLink to={page.href} exact activeClassName="active">{page.label}</NavLink>
      </li>
    ))
  );

  const handleClick = () => {
    dispatch(unsetAuthedUser());
  }

  const renderAuthedUser = () => (
    <div className="authedUser">
      <img src={users[authedUser].avatarURL} alt={`The avatar of ${users[authedUser].name}`} />
      <Dropdown inline text={users[authedUser].name}>
        <Dropdown.Menu>
          <Dropdown.Item text="Log Out" onClick={handleClick} />
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );

  return (
    <header>
      <nav>
        <ul>
          {renderPages()}
        </ul>
      </nav>
      {authedUser && renderAuthedUser()}
    </header>
  );
}

// Grab data from Redux store as props
const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  users
});

export default connect(mapStateToProps)(Header);
