import {usersAPI} from "../API/api"

const FOLLOW = 'FOLLOW',
  UNFOLLOW = 'UNFOLLOW',
  SET_USERS = 'SET_USERS',
  SET_CURRENT_PAGE = 'SET_CURRENT_PAGE',
  SET_TOTAL_USERS = 'SET_TOTAL_USERS',
  SET_TOGGLE = 'SET_TOGGLE',
  SET_TOGGLE_FOLLOW = 'SET_TOGGLE_FOLLOW'

let initialState = {
  usersData: [],
  usersOnPage: 20,
  totalUsers: 0,
  currentPage: 1,
  isFetching: false,
  followInProgress: [],
}

const usersReducer = (state = initialState, action) => {
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
          : state.followInProgress.filter(id => id != action.userId)
      }
    default:
      return state;
  }
}

export const followSuccess = (userId) => ({type: FOLLOW, userId})
export const unfollowSuccess = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setCurrentPage = (page) => ({type: SET_CURRENT_PAGE, page})
export const setTotalUsers = (usersCount) => ({type: SET_TOTAL_USERS, usersCount})
export const setToggle = (isFetching) => ({type: SET_TOGGLE, isFetching})
export const setToggleFollow = (isFetching, userId) => ({type: SET_TOGGLE_FOLLOW, isFetching, userId})

export const getUsers = (page, usersOnPage) => {
  return async (dispatch) => {
    dispatch(setToggle(true))
    dispatch(setCurrentPage(page))
    const data = await usersAPI.getUsers(page, usersOnPage)
    dispatch(setUsers(data.items));
    dispatch(setTotalUsers(data.totalCount))
    dispatch(setToggle(false))
  }
}

export const follow = (userId) => {
  return async (dispatch) => {
    dispatch(setToggleFollow(true, userId))
    const data = await usersAPI.follow(userId)
    if (data.resultCode === 0) {
      dispatch(followSuccess(userId))
    }
    dispatch(setToggleFollow(false, userId))
  }
}

export const unfollow = (userId) => {
  return async (dispatch) => {
    dispatch(setToggleFollow(true, userId))
    const data = await usersAPI.unfollow(userId)
    if (data.resultCode === 0) {
      dispatch(unfollowSuccess(userId))
    }
    dispatch(setToggleFollow(false, userId))
  }
}

export default usersReducer