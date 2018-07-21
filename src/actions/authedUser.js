// Map strings to constants (better typo detection)
export const SET_AUTHED_USER = "SET_AUTHED_USER";

// Set authenticated user action creator
export const setAuthedUser = (id) => ({
  type: SET_AUTHED_USER,
  id
});
