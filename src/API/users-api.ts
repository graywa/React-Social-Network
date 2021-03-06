import {instance, APIResponseType} from './api'
import {UserDataType} from '../types/Types'

type GetUsersResponseType = {
  items: Array<UserDataType>
  totalCount: number
  error: string | null
}

export const usersAPI = {
  getUsers(currentPage = 1, usersOnPage = 10, term: string = '', friend: null | boolean = null) {
    return instance.get<GetUsersResponseType>(`users?page=${currentPage}&count=${usersOnPage}&term=${term}` + (friend === null 
      ? '' : `&friend=${friend}`))
      .then(response => response.data)
  },
  follow(userId: number) {
    return instance.post<APIResponseType>(`follow/${userId}`, {})
      .then(response => response.data)
  },
  unfollow(userId: number) {
    return instance.delete<APIResponseType>(`follow/${userId}`)
      .then(response => response.data)
  },
}