
import usersReducer, { actionCreators, InitialStateType } from "./usersReducer"

let state: InitialStateType

beforeEach(() => {
  state = {
    usersData: [
      {id: 0, name: 'Vlad0', status: 'status0', photos: {large: null, small: null}, followed: false},
      {id: 1, name: 'Vlad1', status: 'status1', photos: {large: null, small: null}, followed: false},
      {id: 2, name: 'Vlad2', status: 'status2', photos: {large: null, small: null}, followed: true},
      {id: 3, name: 'Vlad3', status: 'status3', photos: {large: null, small: null}, followed: false},
    ],
    usersOnPage: 20,
    totalUsers: 0,
    currentPage: 1,
    isFetching: false,
    followInProgress: [],
  }
})

test('follow success', () => {

  const newState = usersReducer(state, actionCreators.followSuccess(1))


  expect(newState.usersData[0].followed).toBeFalsy()
  expect(newState.usersData[1].followed).toBeTruthy()
})

test('unfollow success', () => {

  const newState = usersReducer(state, actionCreators.unfollowSuccess(2))


  expect(newState.usersData[0].followed).toBeFalsy()
  expect(newState.usersData[2].followed).toBeFalsy()
})