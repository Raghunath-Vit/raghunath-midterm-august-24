import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';  
import authReducer from '../src/Components/reducers/AuthReducers'

const store = createStore(authReducer, applyMiddleware(thunk));

export default store;
