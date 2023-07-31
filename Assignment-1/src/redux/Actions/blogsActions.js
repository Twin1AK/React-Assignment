import { ACTIONS } from "./actions";

export const setSelectedBlog = (selectedBlog) => ({
  type: ACTIONS.SET_SELECTED_BLOG,
  payload: { selectedBlog },
});

export const setUserBlogs = (userBlogs) => ({
  type: ACTIONS.SET_USER_BLOGS,
  payload: { userBlogs },
});