import {ResultCodesEnum, ResultCodeWithCaptchaEnum} from '../API/api'
import {stopSubmit} from 'redux-form'
import {actionCreatorsProfile} from './profileReducer'
import {ThunkAction} from 'redux-thunk'
import {AppStateType, BaseThunkType, InferActionsTypes} from './redux-store'
import {authAPI} from '../API/auth-api'
import {securityAPI} from '../API/security-api'


type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actionCreators>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>

let initialState = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
  captchaUrl: null
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'AUTH__USER':
    case 'CAPTCHA__URL': {
      // @ts-ignore
      return {...state, ...action.data}
    }
    default:
      return state
  }
}

export const actionCreators = {
  setAuthUser : (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: 'AUTH__USER',
    data: {userId, email, login, isAuth}
  } as const),
  setCaptchaUrl : (captchaUrl: string | null) => ({
    type: 'CAPTCHA__URL',
    data: {captchaUrl}
  } as const)
}

export const getAuthUser = (): ThunkType => {
  return async (dispatch) => {
    const data = await authAPI.getAuth()
    if (!data.resultCode) {
      let {id, email, login} = data.data
      dispatch(actionCreators.setAuthUser(id, email, login, true))
    }
  }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
  return async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUser())
    } else {
      if (response.resultCode === ResultCodeWithCaptchaEnum.WithCaptcha) dispatch(getCaptchaUrl())
      let message = response.messages.length > 0 ? response.messages[0] : 'Some error'
      dispatch(stopSubmit('login', {_error: message}))
    }
  }
}

export const getCaptchaUrl = (): ThunkType => {
  return async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.url
    dispatch(actionCreators.setCaptchaUrl(captchaUrl))
  }
}

export const logout = (): ThunkType => {
  return async (dispatch) => {
    const response = await authAPI.logout()
    if (!response.resultCode) {
      dispatch(actionCreators.setAuthUser(null, null, null, false))
      dispatch(actionCreatorsProfile.setUserAva(null))
    }
  }
}

export default authReducer