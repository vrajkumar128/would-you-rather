import React from 'react';
import { connect } from 'react-redux';
import Question from '../Question/Question';

class QuestionList extends React.Component {
  state = {
    displayAnswered: false
  }

  // Indicate need to display unanswered questions
  displayUnansweredQuestions = () => {
    this.setState({
      displayAnswered: false
    })
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
      unansweredQuestionIds.map(questionId => (
        <Question question={questions[questionId]} />
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
        <Question question={questions[answeredQuestionId]} />
      ))
    );
  }

  render() {
    const { displayAnswered } = this.state;

    return (
      <div>
        {displayAnswered ? this.renderAnsweredQuestions() : this.renderUnansweredQuestions()}
      </div>
    );
  }
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(QuestionList);
