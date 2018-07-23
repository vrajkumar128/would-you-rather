import React from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { handleAddQuestionAnswer } from '../../actions/shared';
import "./QuestionPage.min.css";

const QuestionPage = ({ users, authedUser, question, author, dispatch }) => {

  // Calculate total number of votes associated with the question
  const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length;

  // If one of the options has already been selected by the authedUser, return it
  const alreadyAnswered = () => {
    if (Object.keys(users[authedUser].answers).includes(question.id)) {
      return users[authedUser].answers[question.id];
    }
  };

  // Render a center icon based on result of alreadyAnswered
  const renderIcon = () => {
    if (alreadyAnswered() === 'optionOne') {
      return <Icon name="caret left" />
    } else if (alreadyAnswered() === 'optionTwo') {
      return <Icon name="caret right" />
    } else {
      return <Icon name="question" />
    }
  };

  // Render option one's results
  const renderOptionOneResults = () => {
    const optionOneVotes = question.optionOne.votes.length;

    return (
      optionOneVotes === 1
        ? <span>{optionOneVotes} vote ({(optionOneVotes / totalVotes) * 100}%)</span>
        : <span>{optionOneVotes} votes ({(optionOneVotes / totalVotes) * 100}%)</span>
    );
  };

  // Render option two's results
  const renderOptionTwoResults = () => {
    const optionTwoVotes = question.optionTwo.votes.length;

    return (
      optionTwoVotes === 1
        ? <span>{optionTwoVotes} vote ({(optionTwoVotes / totalVotes) * 100}%)</span>
        : <span>{optionTwoVotes} votes ({(optionTwoVotes / totalVotes) * 100}%)</span>
    );
  };

  // Render the answer choices
  const renderOptions = () => (
    <div className="options">
      <div className={alreadyAnswered() ? "answered option-one" : "option-one"} onClick={submitOptionOne}>
        <p>{question.optionOne.text}</p>
        {alreadyAnswered() && renderOptionOneResults()}
      </div>
      <div className="icon">
        {renderIcon()}
      </div>
      <div className={alreadyAnswered() ? "answered option-two" : "option-two"} onClick={submitOptionTwo}>
        <p>{question.optionTwo.text}</p>
        {alreadyAnswered() && renderOptionTwoResults()}
      </div>
    </div>
  );

  // If the authedUser has not already answered the question, submit option one as the authedUser's answer
  const submitOptionOne = () => {
    if (Object.keys(users[authedUser].answers).includes(question.id)) {
      return;
    }

    const info = {
      authedUser,
      qid: question.id,
      answer: "optionOne"
    };

    dispatch(handleAddQuestionAnswer(info));
  };

  // If the authedUser has not already answered the question, submit option two as the authedUser's answer
  const submitOptionTwo = () => {
    if (Object.keys(users[authedUser].answers).includes(question.id)) {
      return;
    }

    const info = {
      authedUser,
      qid: question.id,
      answer: "optionTwo"
    };

    dispatch(handleAddQuestionAnswer(info));
  };

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

  return {
    users,
    authedUser,
    question,
    author
  };
};

// Connect component to Redux store
export default connect(mapStateToProps)(QuestionPage);
