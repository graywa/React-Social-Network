import {Action, applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {reducer as formReducer} from 'redux-form'
import dialogsReducer from './dialogsReducer'
import profileReducer from './profileReducer'
import usersReducer from './usersReducer'
import AuthReducer from './authReducer'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import appReducer from './appReducer'
import chatReducer from './chatReducer'


let rootReducer = combineReducers({
  dialogsPage: dialogsReducer,
  profilePage: profileReducer,
  usersPage: usersReducer,
  authUser: AuthReducer,
  chat: chatReducer,
  form: formReducer,
  app: appReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers((applyMiddleware(thunkMiddleware))))

//let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store

export default store