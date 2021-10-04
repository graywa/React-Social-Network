import {APIResponseType, instance, ResultCodesEnum, ResultCodeWithCaptchaEnum} from './api'

type AuthResponseType = {
  id: number | null
  email: string
  login: string
}
type LoginResponseType = {
  userId: number | null
}

export const authAPI = {
  getAuth() {
    return instance.get<APIResponseType<AuthResponseType>>(`auth/me`)
      .then(response => response.data)
  },
  login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
    return instance.post<APIResponseType<LoginResponseType, ResultCodesEnum | ResultCodeWithCaptchaEnum>>
    (`auth/login`, {email, password, rememberMe, captcha})
      .then(response => response.data)
  },
  logout() {
    return instance.delete(`auth/login`)
      .then(response => response.data)
  }
}