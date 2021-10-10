import React from 'react'
import User from './User'
import Paginator from './Paginator'
import { UserDataType } from '../../types/Types'
import { UsersSearchForm } from './UsersSearchForm'
import { FilterType } from '../../redux/usersReducer'

type PropsType = {
  usersOnPage: number
  totalUsers: number
  currentPage: number
  usersData: Array<UserDataType>
  followInProgress: Array<number>
  onPageChanged: (page: number) => void
  onFilterChanged: (filter: FilterType) => void
  follow: (userId: number) => void
  unfollow: (userId: number) => void
}

let Users: React.FC<PropsType> = (props) => {
  
  const PaginatorWithProps = () => {
    return (
      <Paginator
        usersOnPage={props.usersOnPage}
        totalUsers={props.totalUsers}
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
        portionSize={20}
      />
    )
  }

  return (
    <div>
      <UsersSearchForm onFilterChanged={props.onFilterChanged}/>

      {PaginatorWithProps()}

      {props.usersData.map((u) => (
        <User
          user={u}
          key={u.id}
          followInProgress={props.followInProgress}
          follow={props.follow}
          unfollow={props.unfollow}
        />
      ))}

      {PaginatorWithProps()}
    </div>
  )
}

export default Users
