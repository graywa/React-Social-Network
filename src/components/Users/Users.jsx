import React from 'react'
import User from "./User"
import Paginator from "./Paginator"



let Users = (props) => {
  return <div>
    <Paginator usersOnPage={props.usersOnPage}
               totalUsers={props.totalUsers}
               currentPage={props.currentPage}
               onPageChanged={props.onPageChanged}
    />
    {
      props.usersData.map(u => <User user={u}
                                     key={u.id}
                                     followInProgress={props.followInProgress}
                                     follow={props.follow}
                                     unfollow={props.unfollow} />)
    }
  </div>
}

export default Users

