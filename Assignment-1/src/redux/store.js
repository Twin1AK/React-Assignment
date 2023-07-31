import { createStore, combineReducers } from 'redux';
import blogsReducer from './Reducers/blogsReducer';

// Import reducers
import coinsReducer from './Reducers/coinsReducer';
import usersReducer from './Reducers/usersReducer';

// Combine reducers
const rootReducer = combineReducers({
    coins: coinsReducer,
    users: usersReducer,
    blogs: blogsReducer
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;
