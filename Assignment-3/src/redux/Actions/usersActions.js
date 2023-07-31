import { ACTIONS } from "./actions";

export const setLoggedInUser = (loggedInUser) => ({
  type: ACTIONS.SET_LOGGED_IN_USER,
  payload: { loggedInUser },
});
