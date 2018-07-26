import React from 'react';
import { connect } from 'react-redux';
import { Container, Grid, Card } from 'semantic-ui-react';
import './Leaderboard.min.css';
import Login from '../Login/Login';

// Render the leaderboard header
const renderHeader = () => (
  <Grid.Row columns={5} className="header">
    <Grid.Column>
      <h4>Rank</h4>
    </Grid.Column>
    <Grid.Column>
      <h4>User</h4>
    </Grid.Column>
    <Grid.Column>
      <h4>Questions Asked</h4>
    </Grid.Column>
    <Grid.Column>
      <h4>Questions Answered</h4>
    </Grid.Column>
    <Grid.Column>
      <h4>Score</h4>
    </Grid.Column>
  </Grid.Row>
);

// Render list of users
const renderUsers = (users) => {

  // Calculate the number of questions asked by a user
  const questionsLength = (userId) => (
    users[userId].questions.length
  );

  // Calculate the number of questions answered by a user
  const answersLength = (userId) => (
    Object.keys(users[userId].answers).length
  );

  // Return an array of user IDs sorted by the sum of each user's # of questions answered and # of questions asked
  const rankedUserIds = Object.keys(users).sort((a, b) => (
    (answersLength(b) + questionsLength(b))
    - (answersLength(a) + questionsLength(a))
  ));

  // Return an ordered array of objects containing a user ID and that user's score
  const orderedUserObjects = rankedUserIds.map(rankedUserId => ({
      id: rankedUserId,
      score: answersLength(rankedUserId) + questionsLength(rankedUserId)
    })
  );

  // Return an array of users ranked by their score while accounting for duplicate scores
  const rankedUserObjects = orderedUserObjects.map((orderedUserObject, i) => {
    if (i > 0) {
      const prevOrderedUserObject = orderedUserObjects[i - 1];
      if (prevOrderedUserObject.score === orderedUserObject.score) {
        orderedUserObject.rank = prevOrderedUserObject.rank;
      } else {
        orderedUserObject.rank = i + 1;
      }
    } else {
      orderedUserObject.rank = 1;
    }

    return orderedUserObject;
  });

  // Get the rank of a user
  const getRank = (rankedUserId) => (
    rankedUserObjects[rankedUserIds.indexOf(rankedUserId)].rank
  );

  return (
    rankedUserIds.map(rankedUserId => (
      <Grid.Row key={rankedUserId} columns={5} className="entry">
        <Grid.Column className="rank">
          <span>{getRank(rankedUserId)}</span>
        </Grid.Column>
        <Grid.Column className="user">
          <img
            src={users[rankedUserId].avatarURL}
            title={`${users[rankedUserId].name}`}
            alt={`The avatar of ${users[rankedUserId].name}`}
          />
          <span>{users[rankedUserId].name}</span>
        </Grid.Column>
        <Grid.Column className="questions-asked">
          <span>{questionsLength(rankedUserId)}</span>
        </Grid.Column>
        <Grid.Column className="questions-answered">
          <span>{answersLength(rankedUserId)}</span>
        </Grid.Column>
        <Grid.Column className="score">
          <span>{answersLength(rankedUserId) + questionsLength(rankedUserId)}</span>
        </Grid.Column>
      </Grid.Row>
    ))
  );
}

// Leaderboard component
const Leaderboard = ({ authedUser, users }) => {
  if (!authedUser) {
    return <Login />;
  }

  document.title = "Leaderboard";

  return (
    <Container className="leaderboard">
    <Card>
      <Grid divided="vertically">
        {renderHeader()}
        {renderUsers(users)}
      </Grid>
      </Card>
    </Container>
  );
};

// Grab data from Redux store as props
const mapStateToProps = ({ authedUser, users }) => ({
  authedUser,
  users
});

// Connect component to Redux store
export default connect(mapStateToProps)(Leaderboard);
