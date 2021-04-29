export const getUsersData = (state) => {
  return state.usersPage.usersData
}

export const getUsersOnPage = (state) => {
  return state.usersPage.usersOnPage
}

export const getTotalUsers = (state) => {
  return state.usersPage.totalUsers
}

export const getCurrentPage = (state) => {
  return state.usersPage.currentPage
}

export const getIsFetching = (state) => {
  return state.usersPage.isFetching
}

export const getFollowInProgress = (state) => {
  return state.usersPage.followInProgress
}

export const getIsAuth = (state) => {
  return state.usersPage.isAuth
}