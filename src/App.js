import React from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import Login from './components/Login/Login';
import QuestionList from './components/QuestionList/QuestionList';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;

    return authedUser ? <QuestionList /> : <Login />;
  }
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser
});

export default connect(mapStateToProps)(App);
