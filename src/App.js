import React from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import LoginForm from './components/LoginForm/LoginForm';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData);
  }

  render() {
    return (
      <div>
        <LoginForm />
      </div>
    );
  }
}

export default connect()(App);
