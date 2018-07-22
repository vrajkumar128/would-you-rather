import React from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import Login from './components/Login/Login';
import QuestionList from './components/QuestionList/QuestionList';

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;
    return authedUser ? <QuestionList /> : <Login />;
  }
}

// Grab data from Redux store as props
const mapStateToProps = ({ authedUser }) => ({
  authedUser
});

// Connect component to Redux store
export default connect(mapStateToProps)(App);
