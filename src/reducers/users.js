import { RECEIVE_USERS, ADD_USER, ADD_USER_ANSWER } from '../actions/users';

// Users reducer
export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      };

    case ADD_USER:
      return {

      };

    case ADD_USER_ANSWER:
      const { authedUser, qid, answer } = action;

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
