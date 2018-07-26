import { RECEIVE_USERS, ADD_USER, ADD_USER_QUESTION, ADD_USER_ANSWER } from '../actions/users';

// Users reducer
export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:

      // Return users
      return {
        ...state,
        ...action.users
      };

    case ADD_USER:
      const { user } = action;

      // Add a user
      return {
        ...state,
        [user.id]: user
      };

    case ADD_USER_QUESTION:
      const { author, id } = action;

      // Add a question to the list of questions asked by a user
      return {
        ...state,
        [author]: {
          ...state[author],
          questions: state[author].questions.concat([id])
        }
      };

    case ADD_USER_ANSWER:
      const { authedUser, qid, answer } = action;

      // Set a user's answer to a question
      return {
        ...state,
        [authedUser]: {
          ...state[authedUser],
          answers: {
            ...state[authedUser].answers,
            [qid]: answer
            }
          }
        };

    default:
      return state;
  }
}
