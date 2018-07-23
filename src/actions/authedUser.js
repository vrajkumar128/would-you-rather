// Map strings to constants (better typo detection)
export const SET_AUTHED_USER = "SET_AUTHED_USER";
export const UNSET_AUTHED_USER = "UNSET_AUTHED_USER";

// Create a SET_AUTHED_USER action
export const setAuthedUser = (id) => ({
  type: SET_AUTHED_USER,
  id
});

// Create an UNSET_AUTHED_USER action
export const unsetAuthedUser = () => ({
  type: UNSET_AUTHED_USER
});
