import { getInitialData, saveQuestionAnswer } from '../util/api';
import { receiveUsers, addUserAnswer } from './users';
import { receiveQuestions, addQuestionAnswer } from './questions';

// Retrieve initial data from database
export const handleInitialData = () => (
  async (dispatch) => {
    const [users, questions] = await getInitialData();

    dispatch(receiveUsers(users));
    dispatch(receiveQuestions(questions));
  }
);

// Add a question answer to the database
export const handleAddQuestionAnswer = (info) => (
  async (dispatch) => {
    try {
      await saveQuestionAnswer(info);
      dispatch(addQuestionAnswer(info));
      dispatch(addUserAnswer(info));
    } catch (err) {
      console.error("Error:", err);
      alert("There was an error submitting your answer. Try again");
    }
  }
);
