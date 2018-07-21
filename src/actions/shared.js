import { getInitialData } from '../util/api';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';

// Retrieve initial data from server (w/ corresponding progress bar)
export const handleInitialData = () =>
  async (dispatch) => {
    const { users, questions } = await getInitialData();

    dispatch(receiveUsers(users));
    dispatch(receiveQuestions(questions));
};
