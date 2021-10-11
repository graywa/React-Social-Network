import React, { useEffect } from 'react'
import User from './User'
import Paginator from './Paginator'
import { UsersSearchForm } from './UsersSearchForm'
import { FilterType, follow, getUsers, unfollow } from '../../redux/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentPage, getFollowInProgress, getTotalUsers, getUsersData, getUsersFilter, getUsersOnPage } from '../../redux/usersSelectors'

export const Users: React.FC = React.memo((props) => {
  
  const usersOnPage = useSelector(getUsersOnPage)
  const usersData = useSelector(getUsersData)
  const totalUsers = useSelector(getTotalUsers)
  const currentPage = useSelector(getCurrentPage)
  const followInProgress = useSelector(getFollowInProgress)
  const filter = useSelector(getUsersFilter)

  const dispatch = useDispatch()

   useEffect(() => {    
     dispatch(getUsers(currentPage, usersOnPage, filter))
   }, [])

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

      {usersData.map((u) => (
        <User
          user={u}
          key={u.id}
          followInProgress={followInProgress}
          follow={followUser}
          unfollow={unfollowUser}
        />
      ))}

      {PaginatorWithProps()}
    </div>
  )
})
