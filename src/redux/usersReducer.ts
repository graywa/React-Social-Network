import {UserDataType} from '../types/Types'
import {BaseThunkType, InferActionsTypes} from './redux-store'
import {usersAPI} from '../API/users-api'


const initialState = {
  usersData: [] as Array<UserDataType>,
  usersOnPage: 30,
  totalUsers: 0,
  currentPage: 1,
  isFetching: false,
  followInProgress: [] as Array<number>,
  filter: {
    term: '',
    friend: null as null | boolean
  }
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionsTypes = InferActionsTypes<typeof actionCreators>
type ThunkType = BaseThunkType<ActionsTypes>

const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        usersData: state.usersData.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: true}
          }
          return u
        })
      }
    case 'UNFOLLOW':
      return {
        ...state,
        usersData: state.usersData.map(u => {
          if (u.id === action.userId) {
            return {...u, followed: false}
          }
          return u
        })
      }
    case 'SET_USERS':
      return {
        ...state,
        usersData: [...action.users]
      }
    case 'SET_CURRENT_PAGE' :
      return {
        ...state,
        currentPage: action.page
      }
    case 'SET_TOTAL_USERS' :
      return {
        ...state,
        totalUsers: action.usersCount
      }
    case 'SET_TOGGLE' :
      return {
        ...state,
        isFetching: action.isFetching
      }
    case 'SET_FILTER' :
      return {
        ...state,
        filter: action.payload.filter
      }
    case 'SET_TOGGLE_FOLLOW':
      return {
        ...state,
        followInProgress: action.isFetching
          ? [...state.followInProgress, action.userId]
          : state.followInProgress.filter(id => id !== action.userId)
      }
    default:
      return state
  }
}

export const actionCreators = {
  followSuccess: (userId: number) => ({type: 'FOLLOW', userId} as const),
  unfollowSuccess: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
  setUsers: (users: Array<UserDataType>) => ({type: 'SET_USERS', users} as const),
  setCurrentPage: (page: number) => ({type: 'SET_CURRENT_PAGE', page} as const),
  setTotalUsers: (usersCount: number) => ({type: 'SET_TOTAL_USERS', usersCount} as const),
  setFilter: (filter: FilterType) => ({type: 'SET_FILTER', payload: {filter}} as const),
  setToggle: (isFetching: boolean) => ({type: 'SET_TOGGLE', isFetching} as const),
  setToggleFollow: (isFetching: boolean, userId: number) => ({type: 'SET_TOGGLE_FOLLOW', isFetching, userId} as const)
}


export const getUsers = (page: number, usersOnPage: number, filter: FilterType): ThunkType => {
  return async (dispatch) => {
    dispatch(actionCreators.setToggle(true))
    dispatch(actionCreators.setCurrentPage(page))
    dispatch(actionCreators.setFilter(filter))
    const data = await usersAPI.getUsers(page, usersOnPage, filter.term, filter.friend)
    dispatch(actionCreators.setUsers(data.items))
    dispatch(actionCreators.setTotalUsers(data.totalCount))
    dispatch(actionCreators.setToggle(false))
  }
}

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actionCreators.setToggleFollow(true, userId))
    const data = await usersAPI.follow(userId)
    if (data.resultCode === 0) {
      dispatch(actionCreators.followSuccess(userId))
    }
    dispatch(actionCreators.setToggleFollow(false, userId))
  }
}

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    dispatch(actionCreators.setToggleFollow(true, userId))
    const data = await usersAPI.unfollow(userId)
    if (data.resultCode === 0) {
      dispatch(actionCreators.unfollowSuccess(userId))
    }
    dispatch(actionCreators.setToggleFollow(false, userId))
  }
}

export default usersReducer

