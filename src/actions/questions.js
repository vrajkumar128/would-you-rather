// Map strings to constants (better typo detection)
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_QUESTION_ANSWER = "ADD_QUESTION_ANSWER";

// Create a RECEIVE_QUESTIONS action
export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions
});

// Create an ADD_QUESTION action
export const addQuestion = (question) => ({
  type: ADD_QUESTION,
  question
});

// Create an ADD_QUESTION_ANSWER action
export const addQuestionAnswer = ({ authedUser, qid, answer }) => ({
  type: ADD_QUESTION_ANSWER,
  authedUser,
  qid,
  answer
});
