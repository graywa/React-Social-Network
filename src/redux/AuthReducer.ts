import {authAPI, securityAPI} from "../API/api"
import {stopSubmit} from "redux-form"
import {setUserAva} from "./profileReducer"

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

const setAuthReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case AUTH__USER:
    case CAPTCHA__URL: {
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
  data: string
}

export const setCaptchaUrl = (captchaUrl: string): SetCapthaUrlType => ({
  type: 'CAPTCHA__URL',
  data: captchaUrl
})

export const getAuthUser = () => {
  return async (dispatch: any) => {
    const data = await authAPI.getAuth()
    if (!data.resultCode) {
      let {id, email, login} = data.data
      dispatch(setAuthUser(id, email, login, true))
    }
  }
}

export const login = (email: string, password:string, rememberMe: boolean, captcha: string) => {
  return async (dispatch: any) => {
    const response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
      dispatch(getAuthUser())
    } else {
      if(response.data.resultCode === 10) dispatch(getCaptchaUrl())
      let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
      dispatch(stopSubmit('login', {_error: message}))
    }
  }
}

export const getCaptchaUrl = () => {
  return async (dispatch: any) => {
    const response = await securityAPI.getCaptchaUrl()
    const captchaUrl = response.data.url
    dispatch(setCaptchaUrl(captchaUrl))
  }
}

export const logout = () => {
  return async (dispatch: any) => {
    const response = await authAPI.logout()
    if (!response.data.resultCode) {
      dispatch(setAuthUser(null, null, null, false))
      dispatch(setUserAva(null))
    }
  }
}

export default setAuthReducer