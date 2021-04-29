import {applyMiddleware, combineReducers, createStore} from "redux"
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

let store = createStore(reducers, applyMiddleware(thunkMiddleware))

window.store = store

export default store