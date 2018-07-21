// Map strings to constants (better typo detection)
export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const UNSET_AUTHED_USER = "UNSET_AUTHED_USER";

// Set authenticated user action creator
export const setAuthedUser = (id) => ({
  type: SET_AUTHED_USER,
  id
});

// Unset authenticated user action creator
export const unsetAuthedUser = () => ({
  type: UNSET_AUTHED_USER
});
