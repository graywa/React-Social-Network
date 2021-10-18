import {stopSubmit} from 'redux-form'
import {BaseThunkType, InferActionsTypes} from './redux-store'
import { chatAPI, MessageTypeAPI, StatusType } from '../API/chat-api'
import { Dispatch } from 'redux'
import { v4 as uuidv4 } from 'uuid'


type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actionCreators>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>
export type MessageType = MessageTypeAPI & {id: string}

let initialState = {
  messages: [] as MessageType[],
  status: 'ready' as StatusType  
}

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SET_MESSAGES': {
      return {...state, 
        messages: [...state.messages, ...action.payload.messages]
        .map( el => ({...el, id: uuidv4()}) )
        .filter((el, index, array) => index > array.length - 100)
      }
    }
    case 'SET_STATUS': {
      return {...state, 
        status: action.payload.status}
    }
    default:
      return state
  }
}

export const actionCreators = {
  setMessages : (messages: MessageTypeAPI[]) => ({
    type: 'SET_MESSAGES',
    payload: {messages}
  } as const),
  setStatus : (status: StatusType) => ({
    type: 'SET_STATUS',
    payload: {status}
  } as const)
}

let _newMessagesHandler: ((messages: MessageTypeAPI[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessagesHandler === null) {
    _newMessagesHandler = (messages) => {
      dispatch(actionCreators.setMessages(messages))
    }
  } 
  return _newMessagesHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actionCreators.setStatus(status))
    }
  } 
  return _statusChangedHandler
}

export const getMessages = (): ThunkType => {
  return async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
  }
}

export const stopGetMessages = (): ThunkType => {
  return async (dispatch) => {
    chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
  }
}

export const sendMessage = (message: string): ThunkType => {
  return async (dispatch) => {
    chatAPI.sendMessage(message)
  }
}

export default chatReducer