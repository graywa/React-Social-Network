import {stopSubmit} from 'redux-form'
import {BaseThunkType, InferActionsTypes} from './redux-store'
import { chatAPI, MessageType } from '../API/chat-api'
import { Dispatch } from 'redux'


type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actionCreators>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>

let initialState = {
  messages: [] as MessageType[]  
}

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SET_MESSAGES': {
      return {...state, 
        messages: [...state.messages, ...action.payload.messages]}
    }
    default:
      return state
  }
}

export const actionCreators = {
  setMessages : (messages: MessageType[]) => ({
    type: 'SET_MESSAGES',
    payload: {messages}
  } as const)
}

let _newMessagesHandler: ((messages: MessageType[]) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessagesHandler === null) {
    _newMessagesHandler = (messages) => {
      dispatch(actionCreators.setMessages(messages))
    }
  } 
  return _newMessagesHandler
}

export const getMessages = (): ThunkType => {
  return async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe(newMessageHandlerCreator(dispatch))
  }
}

export const stopGetMessages = (): ThunkType => {
  return async (dispatch) => {
    chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
    chatAPI.stop()
  }
}

export const sendMessage = (message: string): ThunkType => {
  return async (dispatch) => {
    chatAPI.sendMessage(message)
  }
}

export default chatReducer