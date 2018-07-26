// Generate a unique ID number
const generateUID = () => (
  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
);

// Format a user-added user for saving to the database
export const formatUser = ({ id, name, avatarURL }) => ({
  id,
  name,
  avatarURL: avatarURL || "https://svgshare.com/i/7aS.svg",
  answers: {},
  questions: []
});

// Format a user-added question for saving to the database
export const formatQuestion = ({ optionOneText, optionTwoText, author }) => ({
  id: generateUID(),
  timestamp: Date.now(),
  author,
  optionOne: {
    votes: [],
    text: optionOneText,
  },
  optionTwo: {
    votes: [],
    text: optionTwoText,
  }
});
