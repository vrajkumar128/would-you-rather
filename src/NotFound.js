import React from 'react';
import Login from './components/Login/Login';
import { connect } from 'react-redux';

const NotFound = ({ authedUser }) => {
  if (!authedUser) {
    return <Login />;
  }

  document.title = "Page not found";
  return <h1>404: Page not found</h1>;
};

// Grab data from Redux store as props
const mapStateToProps = ({ authedUser }) => ({
  authedUser
});

// Connect component to Redux store
export default connect(mapStateToProps)(NotFound);
