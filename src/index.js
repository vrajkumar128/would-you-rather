import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Header from './components/Header/Header';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import middleware from './middleware';

// Create Redux store
const store = createStore(reducer, middleware);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Fragment>
        <Header />
        <Route exact path="/" component={App} />
      </Fragment>
    </Router>
  </Provider>,
  document.getElementById('root')
);
