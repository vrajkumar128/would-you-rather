import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import ImageInput from '../../ImageInput';
import serializeForm from 'form-serialize';
import './AddUser.min.css';
import { handleAddUser } from '../../actions/users';
import { Form, Container, Card, Button } from 'semantic-ui-react';

// AddUser component
class AddUser extends React.Component {
  state = {
    name: '',
    toHome: false
  }

  // Update state with user input
  handleChange = (e) => {
    const name = e.target.value;
    this.setState({ name });
  }

  // Convert captured form data into JSON and add it to database
  handleSubmit = (e) => {
    e.preventDefault();
    const user = serializeForm(e.target, {
      hash: true
    });

    const userId = user.name.toLowerCase().replace(" ", "");
    user.id = userId;

    this.props.dispatch(handleAddUser(user));
    this.setState({
      toHome: true
    });
  }

  render() {
    const { name, toHome } = this.state;

    if (toHome) {
      return <Redirect to="/" />;
    }

    document.title = "Sign Up"; // Set page title

    return (
      <Container className="add-user">
        <Card>
          <Card.Content>
            <h2>New User</h2>
            <Form onSubmit={this.handleSubmit}>
              <div className="inputs">
                <Form.Field className="avatar-input">
                  <ImageInput
                    name="avatarURL"
                    maxHeight={64}
                  />
                </Form.Field>
                <Form.Field className="userName">
                  <input
                    name="name"
                    type="text"
                    placeholder='Name'
                    value={name}
                    onChange={this.handleChange}
                  />
                </Form.Field>
              </div>
              <Button
                type='submit'
                size="large"
                color="blue"
                disabled={!name}
              >
                Submit
              </Button>
            </Form>
          </Card.Content>
        </Card>
      </Container>
    );
  }
}

// Connect component to Redux store
export default connect()(AddUser);
