import thunk from 'redux-thunk';
import {configureStore} from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import userReducer from './reducers/user.reducers';
import postReducers from './reducers/post.reducers';
import usersReducer from './reducers/users.reducer';
import{persistStore, persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage'


const rootReducer= combineReducers({
  userReducer,
  usersReducer,
  postReducers
  
})


const persistConfig = {
  key: 'root',
  storage
}; 

const persistedReducer = persistReducer(persistConfig, rootReducer)



export const store = configureStore({
  reducer:persistedReducer,
  middleware: [thunk]
})

export const persistor= persistStore(store);





