import React from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Container } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { handleAddQuestionAnswer } from '../../actions/shared';
import "./QuestionPage.min.css";

// Calculate total number of votes associated with the question
const totalVotes = (question) => (
  question.optionOne.votes.length + question.optionTwo.votes.length
);

// If one of the options has already been selected by the authedUser, return it
const alreadyAnswered = (authedUser, users, question) => {
  if (Object.keys(users[authedUser].answers).includes(question.id)) {
    return users[authedUser].answers[question.id];
  }
};

// Render a center icon based on result of alreadyAnswered()
const renderIcon = (authedUser, users, question) => {
  if (alreadyAnswered(authedUser, users, question) === 'optionOne') {
    return <Icon name="caret left" />
  } else if (alreadyAnswered(authedUser, users, question) === 'optionTwo') {
    return <Icon name="caret right" />
  } else {
    return <Icon name="question" />
  }
};

// Render option one's results
const renderOptionOneResults = (question) => {
  const optionOneVotes = question.optionOne.votes.length;

  return (
    optionOneVotes === 1
      ? <span>{optionOneVotes} vote ({((optionOneVotes / totalVotes(question)) * 100).toFixed(1)}%)</span>
      : <span>{optionOneVotes} votes ({((optionOneVotes / totalVotes(question)) * 100).toFixed(1)}%)</span>
  );
};

// Render option two's results
const renderOptionTwoResults = (question) => {
  const optionTwoVotes = question.optionTwo.votes.length;

  return (
    optionTwoVotes === 1
      ? <span>{optionTwoVotes} vote ({((optionTwoVotes / totalVotes(question)) * 100).toFixed(1)}%)</span>
      : <span>{optionTwoVotes} votes ({((optionTwoVotes / totalVotes(question)) * 100).toFixed(1)}%)</span>
  );
};

// Return the class name for the option divs based on alreadyAnswered()
const getOptionClass = (authedUser, users, question, option) => (
  alreadyAnswered(authedUser, users, question) ? `answered option-${option}` : `option-${option}`
);

// Render the answer choices
const renderOptions = (authedUser, users, question, dispatch) => (
  <div className="options">
    <div
      className={getOptionClass(authedUser, users, question, "one")}
      onClick={() => submitOptionOne(authedUser, users, question, dispatch)}
    >
      <p>{question.optionOne.text}</p>
      {alreadyAnswered(authedUser, users, question)
        && renderOptionOneResults(question)}
    </div>
    <div className="icon">
      {renderIcon(authedUser, users, question)}
    </div>
    <div
      className={getOptionClass(authedUser, users, question, "two")}
      onClick={() => submitOptionTwo(authedUser, users, question, dispatch)}
    >
      <p>{question.optionTwo.text}</p>
      {alreadyAnswered(authedUser, users, question)
        && renderOptionTwoResults(question)}
    </div>
  </div>
);

// If the authedUser has not already answered the question, submit option one as the authedUser's answer
const submitOptionOne = (authedUser, users, question, dispatch) => {
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
const submitOptionTwo = (authedUser, users, question, dispatch) => {
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

// QuestionPage component
const QuestionPage = ({ authedUser, users, question, author, dispatch }) => (
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
      {renderOptions(authedUser, users, question, dispatch)}
      <Card.Content extra>
        <img src={author.avatarURL} alt={`The avatar of ${author.name}`} />
        <p>posted by {author.name}</p>
      </Card.Content>
    </Card>
  </Container>
);

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
