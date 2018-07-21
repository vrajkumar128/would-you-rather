import React from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import Login from './components/Login/Login';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { authedUser } = this.props;

    return authedUser ? <p>logged in!</p> : <Login />;
  }
}

const mapStateToProps = ({ authedUser }) => ({
  authedUser
});

export default connect(mapStateToProps)(App);
