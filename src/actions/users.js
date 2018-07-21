// Map strings to constants (better typo detection)
export const RECEIVE_USERS = "RECEIVE_USERS";

// Receive users action creator
export const receiveUsers = (users) => ({
  type: RECEIVE_USERS,
  users
});
