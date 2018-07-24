import React from 'react';
import './Login.min.css';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setAuthedUser } from '../../actions/authedUser';
import { Form, Grid, Header, Message, Segment, Divider } from 'semantic-ui-react';

// Render list of users
const renderUsers = (users, dispatch) => (
  Object.keys(users).map(userId => (
    <div key={users[userId].id} className="user">
      <li onClick={e => handleClick(e, dispatch)}>
        <img src={users[userId].avatarURL} alt={`The avatar of ${users[userId].name}`} />
        <div className="userName">
          <h3>{users[userId].name}</h3>
        </div>
      </li>
      <Divider />
    </div>
  ))
);

// Log a user in when clicked
const handleClick = (e, dispatch) => {
  const userId = e.currentTarget.textContent.toLowerCase().replace(" ", "");
  dispatch(setAuthedUser(userId));
};

// Login component
const Login = ({ users, dispatch }) => (
  <div className='login-form'>
    <Grid>
      <Grid.Column>
        <Header as='h2' color='blue'>
          Welcome
        </Header>
        <Form size='large'>
          <Segment stacked>
            <p>Please select a user:</p>
            <ul>
              {renderUsers(users, dispatch)}
            </ul>
          </Segment>
        </Form>
        <Message>
          New user? <NavLink to="/signup">Sign Up</NavLink>
        </Message>
      </Grid.Column>
    </Grid>
  </div>
);

// Grab data from Redux store as props
const mapStateToProps = ({ users }) => ({
  users
});

// Connect component to Redux store
export default connect(mapStateToProps)(Login);
