import React from 'react'
import classes from './Header.module.css'
import {NavLink} from 'react-router-dom'

type MapPropsType = {
  userAva: string | null
  isAuth: boolean
  login: string | null
}
type DispatchPropsType = {
  logout: () => void
}

const Header: React.FC<MapPropsType & DispatchPropsType> = (props) => {

  return <header className={classes.header}>
    <div className={classes.auth__block}>
      {props.isAuth
        ? <div className={classes.login__container}>
          <NavLink to={'/profile/'}>
            {props.userAva && <span><img className={classes.user__ava} src={props.userAva} alt=""/></span>}
          </NavLink>
          <div className={classes.login}>
            <div>{props.login}</div>
            <button className={classes.btn} onClick={props.logout}>Logout</button>
          </div>
          </div>
        : <div>
          <NavLink className={classes.login} to={'/login'}>Login</NavLink>
        </div>}
    </div>
  </header>
}

export default Header