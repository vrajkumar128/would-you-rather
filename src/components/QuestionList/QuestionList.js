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
  getAnsweredQuestionIds = () => {
    const { users, authedUser } = this.props;
    return Object.keys(users[authedUser].answers);
  }

  // Render questions that the authedUser has not answered
  renderUnansweredQuestions = () => {
    const { questions } = this.props;
    const unansweredQuestionIds = Object.keys(questions).filter(questionId =>
      !this.getAnsweredQuestionIds().includes(questionId));

    return (
      unansweredQuestionIds.map(unansweredQuestionId => (
        <Link to={`questions/${unansweredQuestionId}`}>
          <Question question={questions[unansweredQuestionId]} />
        </Link>
      ))
    );
  }

  // Render questions that the authedUser *has* answered
  renderAnsweredQuestions = () => {
    const { questions } = this.props;
    const answeredQuestionIds = Object.keys(questions).filter(questionId =>
      this.getAnsweredQuestionIds().includes(questionId));

    return (
      answeredQuestionIds.map(answeredQuestionId => (
        <Link to={`questions/${answeredQuestionId}`}>
          <Question question={questions[answeredQuestionId]} />
        </Link>
      ))
    );
  }

  render() {
    const { displayAnswered } = this.state;

    return (
      <Container className="question-list">
        <Menu tabular>
          <Menu.Item name='unanswered' active={!displayAnswered} onClick={this.displayUnanswered} />
          <Menu.Item name='answered' active={displayAnswered} onClick={this.displayAnswered} />
        </Menu>
        <h1>Would You Rather</h1>
        {displayAnswered
          ? (
            <Slider infinite={false}>
              {this.renderAnsweredQuestions()}
            </Slider>
            )
          : (
            <Slider infinite={false}>
              {this.renderUnansweredQuestions()}
            </Slider>
            )
          }
      </Container>
    );
  }
};

// Grab data from state as props
const mapStateToProps = (state) => state;

// Connect component to Redux store
export default connect(mapStateToProps)(QuestionList);
