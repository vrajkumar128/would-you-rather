import React from 'react';
import './Login.min.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setAuthedUser } from '../../actions/authedUser';
import { Grid, Header, Message, Segment, Divider } from 'semantic-ui-react';

// Log a user in when clicked
const handleClick = (e, dispatch) => {
  const userId = e.currentTarget.textContent.toLowerCase().replace(" ", "");
  dispatch(setAuthedUser(userId));
};

// Render list of users
const renderUsers = (users, dispatch) => (
  Object.keys(users).length > 0
    ? <div>
        <p>Please select a user:</p>
        <ul>
          {Object.keys(users).map(userId => (
            <div key={users[userId].id} className="user">
              <li onClick={e => handleClick(e, dispatch)}>
                <img src={users[userId].avatarURL} alt={`The avatar of ${users[userId].name}`} />
                <div className="userName">
                  <h3>{users[userId].name}</h3>
                </div>
              </li>
              <Divider />
            </div>
          ))}
        </ul>
      </div>
    : <p>No users!</p>
);

// Render a loading spinner
const renderLoading = () => (
  <img src="https://svgshare.com/i/7_H.svg" title="Loading" alt="Loading spinner" />
);

// Login component
const Login = ({ users, loadingBar, dispatch }) => {
  document.title = "Login";

  return (
    <div className='login-form'>
      <Grid>
        <Grid.Column>
          <Header as='h2' color='blue'>
            Welcome
          </Header>
          <Segment stacked>
            {loadingBar.default ? renderLoading() : renderUsers(users, dispatch)}
          </Segment>
          <Message>
            New user? <NavLink to="/signup">Sign Up</NavLink>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

// Grab data from Redux store as props
const mapStateToProps = ({ users, loadingBar }) => ({
  users,
  loadingBar
});

// Connect component to Redux store
export default connect(mapStateToProps)(Login);
