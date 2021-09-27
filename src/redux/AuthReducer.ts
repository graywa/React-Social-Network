import {authAPI, ResultCodesEnum, ResultCodeWithCaptchaEnum, securityAPI} from "../API/api"
import {stopSubmit} from "redux-form"
import {setUserAva} from "./profileReducer"
import {ThunkAction} from "redux-thunk"
import {AppStateType} from "./redux-store"

const AUTH__USER = 'AUTH__USER',
  CAPTCHA__URL = 'CAPTCHA__URL'

type InitialStateType = {
  userId: number | null
  login: string | null
  email: string | null
  isAuth: boolean
  captchaUrl: string | null
}

let initialState: InitialStateType = {
  userId: null,
  login: null,
  email: null,
  isAuth: false,
  captchaUrl: null
}

type ActionsTypes = SetAuthUserType | SetCapthaUrlType

const setAuthReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case AUTH__USER:
    case CAPTCHA__URL: {

      // @ts-ignore
      return {...state, ...action.data}
    }
    default:
      return state
  }
}

type SetAuthUserDataType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}

type SetAuthUserType = {
  type: typeof AUTH__USER
  data: SetAuthUserDataType
}
export const setAuthUser = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserType => ({
  type: 'AUTH__USER',
  data: {userId, email, login, isAuth}
})

type SetCapthaUrlType = {
  type: typeof CAPTCHA__URL
  data:  {captchaUrl: string}
}
export const setCaptchaUrl = (captchaUrl:  string ): SetCapthaUrlType => ({
  type: 'CAPTCHA__URL',
  data: {captchaUrl}
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionsTypes>

export const getAuthUser = (): ThunkType => {
  return async (dispatch) => {
    const data = await authAPI.getAuth()
    if (!data.resultCode) {
      let {id, email, login} = data.data
      dispatch(setAuthUser(id, email, login, true))
    }
  }
}

export const login = (email: string, password:string, rememberMe: boolean, captcha: string): ThunkType => {
  return async (dispatch) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUser())
    } else {
      if(response.resultCode === ResultCodeWithCaptchaEnum.WithCaptcha) dispatch(getCaptchaUrl())
      let message = response.messages.length > 0 ? response.messages[0] : 'Some error'
      // @ts-ignore
      dispatch(stopSubmit('login', {_error: message}))
    }
  }
}

export const getCaptchaUrl = (): ThunkType => {
  return async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.url
    dispatch(setCaptchaUrl(captchaUrl))
  }
}

export const logout = (): ThunkType => {
  return async (dispatch) => {
    const response = await authAPI.logout()
    if (!response.resultCode) {
      dispatch(setAuthUser(null, null, null, false))
      // @ts-ignore
      dispatch(setUserAva(null))
    }
  }
}

export default setAuthReducer