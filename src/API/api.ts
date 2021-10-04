import axios from 'axios'


export const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  withCredentials: true,
  headers: {
    'API-KEY': '4d4ce820-d6cb-4d21-ba42-f4ed879e398c'
  }
})

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeWithCaptchaEnum {
  WithCaptcha = 10
}
export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  resultCode: RC
  messages: Array<string>
}