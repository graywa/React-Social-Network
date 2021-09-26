import {getAuthUser} from "./AuthReducer"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "./redux-store"

const SET__INITIALIZED = 'SET__INITIALIZED'

type InitialStateType = {initialized: boolean}

let initialState: InitialStateType = {initialized: false}

const AppReducer = (state = initialState, action: SetInitializedActionType): InitialStateType => {
  switch (action.type) {
    case SET__INITIALIZED: {
      return {...state, initialized: true}
    }
    default:
      return state
  }
}

type SetInitializedActionType = {type: typeof SET__INITIALIZED}

export const setInitialized = (): SetInitializedActionType => ({
  type: 'SET__INITIALIZED'
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, any, SetInitializedActionType>

export const initializeApp = ():ThunkType => async (dispatch: any) => {
  await dispatch(getAuthUser())
  dispatch(setInitialized())
}

export default AppReducer