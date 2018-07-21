import React from 'react';
import './Login.min.css';
import { connect } from 'react-redux';
import { setAuthedUser } from '../../actions/authedUser';
import { Form, Grid, Header, Message, Segment } from 'semantic-ui-react';

const Login = ({ dispatch, users }) => {

  // Render list of users
  const renderUsers = () => (
    Object.keys(users).map(user => (
      <li key={users[user].id} onClick={handleClick}>
        <img src={users[user].avatarURL} alt={`The avatar of ${users[user].name}`} />
        <div className="userName">
          <h3>{users[user].name}</h3>
        </div>
      </li>
    ))
  );

  // Log a user in when clicked
  const handleClick = (e) => {
    const userId = e.currentTarget.textContent.toLowerCase().replace(" ", "");
    dispatch(setAuthedUser(userId));
  };

  return (
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
                {renderUsers()}
              </ul>
            </Segment>
          </Form>
          <Message>
            New user? <a href='#'>Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
}

// Grab data from Redux store as props
const mapStateToProps = ({ users }) => ({
  users
});

// Connect component to Redux store
export default connect(mapStateToProps)(Login);
