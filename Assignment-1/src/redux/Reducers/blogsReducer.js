import { ACTIONS } from "../Actions/actions";


const initialState = {
  userBlogs: [],
  selectedBlog: {}
};

const blogsReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
      case ACTIONS.SET_SELECTED_BLOG:
          return {
                ...state,
                selectedBlog: action.payload
      };
    case ACTIONS.SET_USER_BLOGS:
      return {
        ...state,
        userBlogs: action.payload
      }

      
    default:
      return state;
  }
};

export default blogsReducer;
