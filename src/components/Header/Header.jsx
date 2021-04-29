import React from "react"
import classes from "./Header.module.css"
import {NavLink} from "react-router-dom"
import Preloader from "../common/Preloader/Preloader"

const Header = (props) => {

  return <header className={classes.header}>
    {props.userAva && <span><img className={classes.login__photo} src={props.userAva} alt=""/></span>}
    <div className={classes.auth__block}>
      {props.isAuth
        ? <div className={classes.login__container}>
          <div className={classes.login}>{props.login}</div>
          <button className={classes.btn} onClick={props.logout}>Logout</button>
        </div>
        : <div>
           <NavLink className={classes.login}  to={'/login'}>Login</NavLink>
        </div>}
    </div>
  </header>
}

export default Header