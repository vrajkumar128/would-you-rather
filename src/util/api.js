import {
  _getUsers,
  _getQuestions,
  _saveUser,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA';

// Return initial data from database
export const getInitialData = () => Promise.all([
  _getUsers(), _getQuestions()
]);

// Save a user to database
export const saveUser = (user) => _saveUser(user);

// Save a question to database
export const saveQuestion = (question) => _saveQuestion(question);

// Save a question answer to database
export const saveQuestionAnswer = (info) => _saveQuestionAnswer(info);
