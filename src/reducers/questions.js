import { RECEIVE_QUESTIONS } from '../actions/questions';

// Questions reducer
export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions
      };
    default:
      return state;
  }
}
