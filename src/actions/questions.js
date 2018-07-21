// Map strings to constants (better typo detection)
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

// Receive questions action creator
export const receiveQuestions = (questions) => ({
  type: RECEIVE_QUESTIONS,
  questions
});
