import {actionCreators, follow, unfollow} from './usersReducer'
import { usersAPI } from "../API/users-api"
import { APIResponseType, ResultCodesEnum } from "../API/api"


jest.mock('../API/users-api')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const result: APIResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {}
}

test('follow thunk test', async () => {

  usersAPIMock.follow.mockReturnValue(Promise.resolve(result))

  const thunk = follow(1)
  const dispatchMock = jest.fn()
  const getStateMock = jest.fn()

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actionCreators.setToggleFollow(true, 1))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actionCreators.followSuccess(1))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actionCreators.setToggleFollow(false, 1))
})

test('unfollow thunk test', async () => {

  usersAPIMock.unfollow.mockReturnValue(Promise.resolve(result))

  const thunk = unfollow(2)
  const dispatchMock = jest.fn()
  const getStateMock = jest.fn()

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
  expect(dispatchMock).toHaveBeenNthCalledWith(1, actionCreators.setToggleFollow(true, 2))
  expect(dispatchMock).toHaveBeenNthCalledWith(2, actionCreators.unfollowSuccess(2))
  expect(dispatchMock).toHaveBeenNthCalledWith(3, actionCreators.setToggleFollow(false, 2))
})