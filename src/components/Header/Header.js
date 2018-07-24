import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import './Header.min.css';
import { connect } from 'react-redux';
import { unsetAuthedUser } from '../../actions/authedUser';
import { Dropdown } from 'semantic-ui-react';

// Define the navigable pages
const pages = [
  { href: "/", label: "Home" },
  { href: "/add", label: "Add Question" },
  { href: "/leaderboard", label: "Leaderboard" }
];

// Render the navigation links
const renderPages = () => (
  pages.map(page => (
    <li key={page.label}>
      <NavLink to={page.href} exact activeClassName="active">{page.label}</NavLink>
    </li>
  ))
);

// Log out the authedUser and redirect to /
const handleClick = (dispatch, history) => {
  dispatch(unsetAuthedUser());
  history.push('/');
};

// Render the authedUser
const renderAuthedUser = (authedUser, users, dispatch, history) => (
  <div className="authedUser">
    <img src={users[authedUser].avatarURL} alt={`The avatar of ${users[authedUser].name}`} />
    <Dropdown inline text={users[authedUser].name}>
      <Dropdown.Menu>
        <Dropdown.Item text="Log Out" onClick={() => handleClick(dispatch, history)} />
      </Dropdown.Menu>
    </Dropdown>
  </div>
);

// Header component
const Header = ({ authedUser, users, dispatch, history }) => (
  <header>
    <nav>
      <ul>
        {renderPages()}
      </ul>
    </nav>
    {authedUser && renderAuthedUser(authedUser, users, dispatch, history)}
  </header>
);

// Grab data from Redux store as props
const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  users
});

// Connect component to Redux store
export default connect(mapStateToProps)(withRouter(Header));
