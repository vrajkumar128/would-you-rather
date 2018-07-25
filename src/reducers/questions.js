import { RECEIVE_QUESTIONS, ADD_QUESTION, ADD_QUESTION_ANSWER } from '../actions/questions';

// Questions reducer
export default (state = {}, action) => {
  const { authedUser, question, qid, answer} = action;

  switch (action.type) {
    case RECEIVE_QUESTIONS:
      // Return questions
      return {
        ...state,
        ...action.questions
      };

    case ADD_QUESTION:
      // Add a question
      return {
        ...state,
        [question.id]: question
      };

    case ADD_QUESTION_ANSWER:
      // Add an answer to a question
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: state[qid][answer].votes.concat([authedUser])
          }
        }
      };

    default:
      return state;
  }
}
