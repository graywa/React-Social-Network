import {AppStateType} from "./redux-store"

export const getUsersData = (state: AppStateType) => {
  return state.usersPage.usersData
}

export const getUsersOnPage = (state: AppStateType) => {
  return state.usersPage.usersOnPage
}

export const getTotalUsers = (state: AppStateType) => {
  return state.usersPage.totalUsers
}

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage
}

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching
}

export const getFollowInProgress = (state: AppStateType) => {
  return state.usersPage.followInProgress
}

// export const getIsAuth = (state: AppStateType) => {
//   return state.usersPage.isAuth
// }