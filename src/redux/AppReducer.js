import {getAuthUser} from "./AuthReducer"

const SET__INITIALIZED = 'SET__INITIALIZED'

let initialState = {
  initialized: false,
}

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET__INITIALIZED: {
      return {...state, initialized: true}
    }
    default:
      return state
  }
}

export const setInitialized = () => ({
  type: 'SET__INITIALIZED'
})

export const initializeApp = () => async (dispatch) => {
  await dispatch(getAuthUser())
  dispatch(setInitialized())
}

export default AppReducer