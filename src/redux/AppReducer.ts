import {getAuthUser} from "./AuthReducer"

const SET__INITIALIZED = 'SET__INITIALIZED'

type InitialStateType = {
  initialized: boolean
}

let initialState: InitialStateType = {
  initialized: false,
}

const AppReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET__INITIALIZED: {
      return {...state, initialized: true}
    }
    default:
      return state
  }
}

type SetInitializedActionType = {
  type: typeof SET__INITIALIZED
}

export const setInitialized = (): SetInitializedActionType => ({
  type: 'SET__INITIALIZED'
})

export const initializeApp = () => async (dispatch: any) => {
  await dispatch(getAuthUser())
  dispatch(setInitialized())
}

export default AppReducer