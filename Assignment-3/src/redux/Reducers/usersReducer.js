import { ACTIONS } from "../Actions/actions";


const initialState = {
  users: [],
  loggedInUser: {}
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
      case ACTIONS.SET_LOGGED_IN_USER:
          return {
                ...state,
                loggedInUser: action.payload
            };

      
    default:
      return state;
  }
};

export default usersReducer;
