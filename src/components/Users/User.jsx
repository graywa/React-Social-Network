import React from 'react'
import classes from "./Users.module.css"
import {NavLink} from "react-router-dom"
import user__img from "../../img/users/user.png"

const User = (props) => {

  return (
    <div className={classes.container}>
      <div className={classes.user}>
        <div className={classes.img__container}>
          <NavLink to={'/profile/' + props.user.id}>
            <div>
              <img className={classes.user__img}
                   src={props.user.photos.small ? props.user.photos.small : user__img} alt=""/>
            </div>
          </NavLink>
          <div>
            {props.user.followed
              ? <button className={classes.btn}
                        disabled={props.followInProgress.some(id => id === props.user.id)}
                        onClick={() => {
                          props.unfollow(props.user.id)
                        }}>Unfollow</button>
              : <button className={classes.btn}
                        disabled={props.followInProgress.some(id => id === props.user.id)}
                        onClick={() => {
                          props.follow(props.user.id)
                        }}>Follow</button>}
          </div>
        </div>

        <div className={classes.user__info}>
          <div className={classes.user__info__item}>
            <div className={classes.user__name}>
              {props.user.name}
            </div>
            <div className={classes.user__status}>
              {props.user.status}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default User