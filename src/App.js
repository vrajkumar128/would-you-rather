import React from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import Login from './components/Login/Login';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }

  render() {
    return (
      <div>
        <Login />
      </div>
    );
  }
}

export default connect()(App);
