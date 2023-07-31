import { createStore, combineReducers } from 'redux';

// Import reducers
import coinsReducer from './Reducers/coinsReducer';
import usersReducer from './Reducers/usersReducer';

// Combine reducers
const rootReducer = combineReducers({
    coins: coinsReducer,
    users: usersReducer
});

// Create the Redux store
const store = createStore(rootReducer);

export default store;
