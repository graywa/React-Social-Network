import axios from "axios"
import {ProfileType, UserDataType} from "../types/Types"


const instance = axios.create({
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

type GetUsersResponseType = {
  items: Array<UserDataType>
  totalCount: number
  error: string
}
type FollowResponseType = {
  resultCode: ResultCodesEnum
  messages: Array<string>
  data: {}
}
type UnfollowResponseType = {
  resultCode: ResultCodesEnum
  messages: Array<string>
  data: {}
}

export const usersAPI = {
  getUsers(currentPage = 1, usersOnPage = 4) {
    return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${usersOnPage}`)
      .then(response => response.data)
  },
  follow(userId: number) {
    return instance.post<FollowResponseType>(`follow/${userId}`, {})
      .then(response => response.data)
  },
  unfollow(userId: number) {
    return instance.delete<UnfollowResponseType>(`follow/${userId}`)
      .then(response => response.data)
  },
}

type GetProfileResponseType = ProfileType

type UpdateUserStatusResponseType = {
  resultCode: ResultCodesEnum
  messages: Array<string>
  data: {}
}

export const profileAPI = {
  getProfile(userId: number | null) {
    return instance.get<GetProfileResponseType>(`profile/${userId}`)
      .then(response => response.data)
  },
  getUserStatus(userId: number) {
    return instance.get<String>(`profile/status/${userId}`)
      .then(response => response.data)
  },
  updateUserStatus(status: string) {
    return instance.put<UpdateUserStatusResponseType>(`profile/status`, {status: status})
  },
  savePhoto(photoFile: any) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instance.put('profile/photo', formData,
      {headers: {"Content-Type": "multipart/form-data"}})
  },
  saveProfile(profile: ProfileType) {
    return instance.put(`profile`, profile)
  },
}

type GetAuthResponseType = {
  data: { id: number | null, email: string, login: string }
  resultCode: ResultCodesEnum
  messages: Array<string>
}
type LoginResponseType = {
  data: { userId: number | null }
  resultCode: ResultCodesEnum & ResultCodeWithCaptchaEnum
  messages: Array<string>
}
type LogoutResponseType = {
  data: {}
  resultCode: ResultCodesEnum
  messages: Array<string>
}

export const authAPI = {
  getAuth() {
    return instance.get<GetAuthResponseType>(`auth/me`)
      .then(response => response.data)
  },
  login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
    return instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
      .then(response => response.data)
  },
  logout() {
    return instance.delete<LogoutResponseType>(`auth/login`)
      .then(response => response.data)
  }
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`)
      .then(response => response.data)
  }
}


