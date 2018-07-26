import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleInitialData } from './actions/shared';
import Header from './components/Header/Header';
import QuestionList from './components/QuestionList/QuestionList';
import AddQuestion from './components/AddQuestion/AddQuestion';
import QuestionPage from './components/QuestionPage/QuestionPage';
import Leaderboard from './components/Leaderboard/Leaderboard';
import AddUser from './components/AddUser/AddUser';
import NotFound from './NotFound';
import LoadingBar from 'react-redux-loading-bar';

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(handleInitialData());
  }

  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar maxProgress={100} style={{ backgroundColor: "black"}} />
          <Header />
          <Switch>
            <Route exact path="/" component={QuestionList} />
            <Route path="/add" component={AddQuestion} />
            <Route path="/leaderboard" component={Leaderboard} />
            <Route path="/questions/:question_id" component={QuestionPage} />
            <Route path="/signup" component={AddUser} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

// Connect component to Redux store
export default connect()(App);
