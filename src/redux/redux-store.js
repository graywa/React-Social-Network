import {applyMiddleware, combineReducers, compose, createStore} from "redux"
import { reducer as formReducer } from 'redux-form'
import dialogsReducer from "./dialogsReducer"
import profileReducer from "./profileReducer"
import usersReducer from "./usersReducer"
import AuthReducer from "./AuthReducer"
import thunkMiddleware from "redux-thunk"
import AppReducer from "./AppReducer"


let reducers = combineReducers({
  dialogsPage: dialogsReducer,
  profilePage: profileReducer,
  usersPage: usersReducer,
  authUser: AuthReducer,
  form: formReducer,
  app: AppReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(reducers, composeEnhancers( (applyMiddleware(thunkMiddleware)) ))

//let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store