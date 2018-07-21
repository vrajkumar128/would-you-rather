import React from 'react';
import './Login.min.css';
import { connect } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';

const Login = props => {
  const { dispatch, users } = props;

  const renderUsers = () => (
    Object.keys(users).map(user => (
      <li key={users[user].id} onClick={handleClick}>
        <img src={users[user].avatarURL} />
        <h1>{users[user].name}</h1>
      </li>
    ))
  );

  const handleClick = (e) => {
    const userId = e.currentTarget.textContent.toLowerCase().replace(" ", "");
    dispatch(setAuthedUser(userId));
  }

  return (
    <div className="login">
      <h2>Login</h2>
      <ul>
        {renderUsers()}
      </ul>
    </div>
  );
}

const mapStateToProps = ({ users }) => ({
  users
});

export default connect(mapStateToProps)(Login);
