import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Header from './components/Header/Header';

ReactDOM.render(
  <Router>
    <Fragment>
      <Header />
      <Route exact path="/" component={App} />
    </Fragment>
  </Router>,
  document.getElementById('root'));
