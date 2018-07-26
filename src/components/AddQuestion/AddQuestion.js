import React from 'react';
import { Redirect } from 'react-router-dom';
import { handleAddQuestion } from '../../actions/shared';
import { Card, Container, Button, Form } from 'semantic-ui-react';
import './AddQuestion.min.css';
import { connect } from 'react-redux';
import Login from '../Login/Login';

class AddQuestion extends React.Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false
  }

  // Update state with user input
  handleChange = (e, option) => {
    const text = e.target.value;

    if (option === "one") {
      this.setState({
        optionOneText: text
      });
    } else if (option === "two") {
      this.setState({
        optionTwoText: text
      });
    } else {
      console.error("Error: invalid option");
    }
  }

  // Submit new question and redirect to /
  handleSubmit = (e) => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state;
    const { authedUser, dispatch } = this.props;

    const question = {
      optionOneText,
      optionTwoText,
      author: authedUser
    };

    dispatch(handleAddQuestion(question))
    this.setState({
      toHome: true
    });
  }

  render() {
    const { optionOneText, optionTwoText, toHome } = this.state;
    const { authedUser } = this.props;

    if (toHome) {
      return <Redirect to="/" />;
    }

    if (!authedUser) {
      return <Login />;
    }

    document.title = "Add Question"; // Set page title

    return (
      <Container className="add-question">
        <Card>
          <Card.Content>
            <h2>Would You Rather</h2>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                <label>Option One</label>
                <input
                  name="optionOne"
                  type="text"
                  placeholder='Option One'
                  value={optionOneText}
                  onChange={(e) => this.handleChange(e, "one")}
                />
              </Form.Field>
              <Form.Field>
                <label>Option Two</label>
                <input
                  name="optionOne"
                  type="text"
                  placeholder='Option Two'
                  value={optionTwoText}
                  onChange={(e) => this.handleChange(e, "two")}
                />
              </Form.Field>
              <Button
                type='submit'
                size="large"
                color="blue"
                disabled={!(optionOneText && optionTwoText)}
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

// Grab data from Redux store as props
const mapStateToProps = ({ authedUser }) => ({
  authedUser
});

// Connect component to Redux store
export default connect(mapStateToProps)(AddQuestion);
