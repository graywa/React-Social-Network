import {usersAPI} from "../API/api"
import { PhotosType } from "../types/Types"

const FOLLOW = 'FOLLOW',
  UNFOLLOW = 'UNFOLLOW',
  SET_USERS = 'SET_USERS',
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  SET_TOTAL_USERS = 'SET_TOTAL_USERS',
  SET_TOGGLE = 'SET_TOGGLE',
  SET_TOGGLE_FOLLOW = 'SET_TOGGLE_FOLLOW'

type InitialStateType = typeof initialState

type UserDataType = {
  id: number
  name: string
  status: string
  photos: Array<PhotosType>
  followed: boolean
}

let initialState = {
  usersData: [] as Array<UserDataType>,
  usersOnPage: 20,
  totalUsers: 0,
  currentPage: 1,
  isFetching: false,
  followInProgress: [] as Array<number>,
}

const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        usersData: state.usersData.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: true};
          }
          return u
        })
      };
    case UNFOLLOW:
      return {
        ...state,
        usersData: state.usersData.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: false};
          }
          return u
        })
      };
    case SET_USERS:
      return {
        ...state,
        usersData: [...action.users]
      }
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page
      }
    case SET_TOTAL_USERS:
      return {
        ...state,
        totalUsers: action.usersCount
      }
    case SET_TOGGLE:
      return {
        ...state,
        isFetching: action.isFetching
      }
    case SET_TOGGLE_FOLLOW:
      return {
        ...state,
        followInProgress: action.isFetching
          ? [...state.followInProgress, action.userId]
          : state.followInProgress.filter(id => id !== action.userId)
      }
    default:
      return state;
  }
}

type FollowSuccessType = {
  type: typeof FOLLOW
  userId: number
}

export const followSuccess = (userId: number): FollowSuccessType => ({type: FOLLOW, userId})

type UnfollowSuccessType = {
  type: typeof UNFOLLOW
  userId: number
}

export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({type: UNFOLLOW, userId})

type SetUsersType = {
  type: typeof SET_USERS
  users: Array<UserDataType>
}

export const setUsers = (users: Array<UserDataType>): SetUsersType => ({type: SET_USERS, users})

type SetCurrentPageType = {
  type: typeof SET_CURRENT_PAGE
  page: number
}

export const setCurrentPage = (page: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, page})

type SetTotalUsersType = {
  type: typeof SET_TOTAL_USERS
  usersCount: number
}

export const setTotalUsers = (usersCount: number): SetTotalUsersType => ({type: SET_TOTAL_USERS, usersCount})

type SetToggleType = {
  type: typeof SET_TOGGLE
  isFetching: boolean
}

export const setToggle = (isFetching: boolean): SetToggleType => ({type: SET_TOGGLE, isFetching})

type SetToggleFollowType = {
  type: typeof SET_TOGGLE_FOLLOW
  isFetching: boolean
  userId: number
}

export const setToggleFollow = (isFetching: boolean, userId: number): SetToggleFollowType => ({type: SET_TOGGLE_FOLLOW, isFetching, userId})

export const getUsers = (page: number, usersOnPage: number) => {
  return async (dispatch: any) => {
    dispatch(setToggle(true))
    dispatch(setCurrentPage(page))
    const data = await usersAPI.getUsers(page, usersOnPage)
    dispatch(setUsers(data.items));
    dispatch(setTotalUsers(data.totalCount))
    dispatch(setToggle(false))
  }
}

export const follow = (userId: number) => {
  return async (dispatch: any) => {
    dispatch(setToggleFollow(true, userId))
    const data = await usersAPI.follow(userId)
    if (data.resultCode === 0) {
      dispatch(followSuccess(userId))
    }
    dispatch(setToggleFollow(false, userId))
  }
}

export const unfollow = (userId: number) => {
  return async (dispatch: any) => {
    dispatch(setToggleFollow(true, userId))
    const data = await usersAPI.unfollow(userId)
    if (data.resultCode === 0) {
      dispatch(unfollowSuccess(userId))
    }
    dispatch(setToggleFollow(false, userId))
  }
}

export default usersReducer

