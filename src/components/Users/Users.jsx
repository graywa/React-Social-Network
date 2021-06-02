import React from 'react'
import User from "./User"
import Paginator from "./Paginator"


let Users = (props) => {

  const PaginatorWithProps = () => {
    return <Paginator usersOnPage={props.usersOnPage}
                      totalUsers={props.totalUsers}
                      currentPage={props.currentPage}
                      onPageChanged={props.onPageChanged}
                      portionSize={20}
    />
  }

  return <div>
    {PaginatorWithProps()}

    {
      props.usersData.map(u => <User user={u}
                                     key={u.id}
                                     followInProgress={props.followInProgress}
                                     follow={props.follow}
                                     unfollow={props.unfollow}/>)
    }

    {PaginatorWithProps()}
  </div>
}

export default Users

