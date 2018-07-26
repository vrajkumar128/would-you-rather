import { saveUser } from '../util/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

// Map strings to constants (better typo detection)
export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER = "ADD_USER";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";
export const ADD_USER_ANSWER = "ADD_USER_ANSWER";

// Create a RECEIVE_USERS action
export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
});

// Create an ADD_USER action
const addUser = (user) => ({
  type: ADD_USER,
  user
});

// Create an ADD_USER_QUESTION action
export const addUserQuestion = ({ author, id }) => ({
  type: ADD_USER_QUESTION,
  author,
  id
});

// Create an ADD_QUESTION_ANSWER actions
export const addUserAnswer = ({ authedUser, qid, answer }) => ({
  type: ADD_USER_ANSWER,
  authedUser,
  qid,
  answer
});

// Add a user to the database
export const handleAddUser = (info) => (
  async (dispatch) => {
    try {
      dispatch(showLoading());
      const formattedUser = await saveUser(info);

      dispatch(addUser(formattedUser));
      dispatch(hideLoading());
    } catch (err) {
      console.err("Error:", err);
      dispatch(hideLoading());
      alert('There was an error adding the user. Please try again');
    }
  }
);
