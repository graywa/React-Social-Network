import {getAuthUser} from './authReducer'
import {BaseThunkType, InferActionsTypes} from './redux-store'


let initialState = {
  initialized: false
}

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actionCreators>
type ThunkType = BaseThunkType<ActionsTypes>

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'SET__INITIALIZED': {
      return {...state, initialized: true}
    }
    default:
      return state
  }
}



export const actionCreators = {
  setInitialized : () => ({type: 'SET__INITIALIZED'} as const)
}

export const initializeApp = (): ThunkType => async (dispatch) => {
  await dispatch(getAuthUser())
  dispatch(actionCreators.setInitialized())
}

export default appReducer