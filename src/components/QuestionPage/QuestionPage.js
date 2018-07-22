import React from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import "./QuestionPage.min.css";

const QuestionPage = ({ authedUser, question, author }) => {

  // Render the answer choices
  const renderOptions = () => (
    <div class="options">
      <div class="option-one">
        <p>{question.optionOne.text}</p>
      </div>
      <div class="question-mark">
        <Icon name="question" />
      </div>
      <div class="option-two">
        <p>{question.optionTwo.text}</p>
      </div>
    </div>
  );

  return (
    <Container className="question-page">
      <Card>
        <div className="card-header">
          <div className="back">
            <Link to="/">
              <Icon name="arrow left" size="large" />
              <span>back</span>
            </Link>
          </div>
          <h1>Would You Rather</h1>
        </div>
        {renderOptions()}
        <Card.Content extra>
          <img src={author.avatarURL} />
          <p>posted by {author.name}</p>
        </Card.Content>
      </Card>
    </Container>
  );
}

// Grab data from Redux store as props
const mapStateToProps = ({ users, questions, authedUser }, ownProps) => {
  const { question_id } = ownProps.match.params;
  const question = questions[question_id];
  const author = users[question.author];

  return ({
    authedUser,
    question,
    author
  });
};

// Connect component to Redux store
export default connect(mapStateToProps)(QuestionPage);
