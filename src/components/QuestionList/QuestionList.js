import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Question from '../Question/Question';
import { Container, Menu } from 'semantic-ui-react';
import Slider from 'react-slick';
import './QuestionList.min.css';

class QuestionList extends React.Component {
  state = {
    displayAnswered: false
  }

  // Indicate need to display unanswered questions
  displayUnanswered = () => {
    this.setState({
      displayAnswered: false
    });
  }

  // Indicate need to display answered questions
  displayAnswered = () => {
    this.setState({
      displayAnswered: true
    });
  }

  // Return an array of question IDs corresponding to questions that have been answered by the authedUser
  getAnsweredQids = () => {
    const { users, authedUser } = this.props;
    return Object.keys(users[authedUser].answers);
  }

  // Render questions that the authedUser has not answered
  renderUnansweredQs = () => {
    const { questions, sortedQids } = this.props;
    const unansweredQids = sortedQids.filter(qid =>
      !this.getAnsweredQids().includes(qid)
    );

    return (
      unansweredQids.length > 0
        ? unansweredQids.map(unansweredQid => (
            <Link key={unansweredQid} to={`questions/${unansweredQid}`}>
              <Question question={questions[unansweredQid]} />
            </Link>
          ))
        : <h2>No unanswered questions!</h2>
    );
  }

  // Render questions that the authedUser *has* answered
  renderAnsweredQs = () => {
    const { questions, sortedQids } = this.props;
    const answeredQids = sortedQids.filter(qid =>
      this.getAnsweredQids().includes(qid)
    );

    return (
      answeredQids.length > 0
        ? answeredQids.map(answeredQid => (
            <Link key={answeredQid} to={`questions/${answeredQid}`}>
              <Question question={questions[answeredQid]} />
            </Link>
          ))
        : <h2>No answered questions!</h2>
    );
  }

  render() {
    const { displayAnswered } = this.state;

    return (
      <Container className="question-list">
        <Menu tabular>
          <Menu.Item
            name='unanswered'
            active={!displayAnswered}
            onClick={this.displayUnanswered}
          />
          <Menu.Item
            name='answered'
            active={displayAnswered}
            onClick={this.displayAnswered}
          />
        </Menu>
        <h1>Would You Rather</h1>
        <Slider infinite={false}>
          {displayAnswered
            ? this.renderAnsweredQs()
            : this.renderUnansweredQs()
          }
        </Slider>
      </Container>
    );
  }
}

// Grab data from state as props
const mapStateToProps = ({ authedUser, users, questions }) => {
  const qidArray = Object.keys(questions).map(qid => questions[qid].id);
  const sortedQids = qidArray
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  return {
    authedUser,
    users,
    questions,
    sortedQids
  };
};

// Connect component to Redux store
export default connect(mapStateToProps)(QuestionList);
