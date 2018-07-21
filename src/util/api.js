import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer
} from './_DATA';

// Retrieve initial data
export const getInitialData = () => Promise.all([
  _getUsers(), _getQuestions()
]);

// Save a question to database
export const saveQuestion = (question) => _saveQuestion(question);

// Save a question answer to database
export const saveQuestionAnswer = (answer) => _saveQuestionAnswer(answer);
