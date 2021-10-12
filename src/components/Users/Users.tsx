import React, {useEffect} from 'react'
import User from './User'
import Paginator from './Paginator'
import {UsersSearchForm} from './UsersSearchForm'
import {
  FilterType,
  follow,
  getUsers,
  unfollow,
} from '../../redux/usersReducer'
import {useDispatch, useSelector} from 'react-redux'
import {
  getCurrentPage,
  getFollowInProgress,
  getTotalUsers,
  getUsersData,
  getUsersFilter,
  getUsersOnPage,
} from '../../redux/usersSelectors'
import {useHistory} from 'react-router'

export const Users: React.FC = React.memo((props) => {
  const usersOnPage = useSelector(getUsersOnPage)
  const usersData = useSelector(getUsersData)
  const totalUsers = useSelector(getTotalUsers)
  const currentPage = useSelector(getCurrentPage)
  const followInProgress = useSelector(getFollowInProgress)
  const filter = useSelector(getUsersFilter)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    debugger
    const URLParams = new URLSearchParams(history.location.search)
    let actualPage = currentPage
    let actualFilter = filter

    if (!!URLParams.get('page')) actualPage = Number(URLParams.get('page'))
    if (!!URLParams.get('term'))
      actualFilter = {...actualFilter, term: URLParams.get('term') as string}
    if (!!URLParams.get('friend'))
      actualFilter = {
        ...actualFilter,
        friend:
          URLParams.get('friend') === 'null'
            ? null
            : URLParams.get('friend') === 'true'
              ? true
              : false,
      }

    dispatch(getUsers(actualPage, usersOnPage, actualFilter))
  }, [])

  useEffect(() => {
    debugger
    history.push({
      pathname: '/users',
      search: `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`,
    })
  }, [filter, currentPage])

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsers(1, usersOnPage, filter))
  }
  const onPageChanged = (page: number) => {
    dispatch(getUsers(page, usersOnPage, filter))
  }
  const followUser = (userId: number) => {
    dispatch(follow(userId))
  }
  const unfollowUser = (userId: number) => {
    dispatch(unfollow(userId))
  }

  const PaginatorWithProps = () => {
    return (
      <Paginator
        usersOnPage={usersOnPage}
        totalUsers={totalUsers}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        portionSize={15}
      />
    )
  }

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged}/>

      {PaginatorWithProps()}

      { usersData.length
        ? (usersData.map((u) => (
            <User
              user={u}
              key={u.id}
              followInProgress={followInProgress}
              follow={followUser}
              unfollow={unfollowUser}
            />
          )))
        : <h1 style={{textAlign: 'center'}}>Users not found</h1>
      }

      {PaginatorWithProps()}
    </div>
  )
})
