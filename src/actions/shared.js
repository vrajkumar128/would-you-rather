import { getInitialData, saveQuestion, saveQuestionAnswer } from '../util/api';
import { receiveUsers, addUserQuestion, addUserAnswer } from './users';
import { receiveQuestions, addQuestion, addQuestionAnswer } from './questions';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

// Retrieve initial data from database
export const handleInitialData = () => (
  async (dispatch) => {
    const [users, questions] = await getInitialData();

    dispatch(receiveUsers(users));
    dispatch(receiveQuestions(questions));
  }
);

// Add a question to the database w/ progress bar
export const handleAddQuestion = (info) => (
  async (dispatch) => {
    try {
      dispatch(showLoading());
      const question = await saveQuestion(info);

      dispatch(addQuestion(question));
      dispatch(addUserQuestion(question));
      dispatch(hideLoading());
    } catch (err) {
      console.error("Error: ", err);
      dispatch(hideLoading());
      alert("There was an error submitting the poll. Please try again")
    }
  }
);

// Add a question answer to the database w/ progress bar
export const handleAddQuestionAnswer = (info) => (
  async (dispatch) => {
    try {
      dispatch(showLoading());
      await saveQuestionAnswer(info);

      dispatch(addQuestionAnswer(info));
      dispatch(addUserAnswer(info))
      dispatch(hideLoading());
    } catch (err) {
      console.error("Error:", err);
      dispatch(hideLoading());
      alert("There was an error submitting your answer. Please try again");
    }
  }
);
