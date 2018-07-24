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
import QuestionPage from './components/QuestionPage/QuestionPage';
import LoadingBar from 'react-redux-loading-bar';

// Create Redux store
const store = createStore(reducer, middleware);

// style={{ backgroundColor: "#0E82BE" }}

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Fragment>
        <LoadingBar />
        <Header />
        <Route exact path="/" component={App} />
        <Route path="/questions/:question_id" component={QuestionPage} />
      </Fragment>
    </Router>
  </Provider>,
  document.getElementById('root')
);
