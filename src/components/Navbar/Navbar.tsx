import React, { useEffect, useState } from 'react'
import classes from './Navbar.module.css'
import {NavLink} from 'react-router-dom'

const Navbar:React.FC = () => {

  const [activeMenu, setActiveMenu] = useState(false)

  return (
    <div className={classes.nav}>
      <button className={activeMenu ? classes.burger_active : classes.burger}
       onClick={() => setActiveMenu(!activeMenu)}>
        <span></span></button>
      <NavbarList activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
    </div>    
  )
}

type PropsType = {
  activeMenu: boolean
  setActiveMenu: (active: boolean) => void
}

const NavbarList:React.FC<PropsType> = ({activeMenu, setActiveMenu}) => {

  return (
    <nav className={activeMenu ? classes.nav__list_active : classes.nav__list}
      onClick={() => setActiveMenu(false)} >      
      <div className={classes.item}>
        <NavLink to="/chat" activeClassName={classes.activeLink}>Chat</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/dialogs" activeClassName={classes.activeLink}>Messages</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/profile" activeClassName={classes.activeLink}>Profile</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/users" activeClassName={classes.activeLink}>Users</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/music" activeClassName={classes.activeLink}>Music</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/news" activeClassName={classes.activeLink}>News</NavLink>
      </div>
      <div className={classes.item}>
        <NavLink to="/settings" activeClassName={classes.activeLink}>Settings</NavLink>
      </div>
    </nav>
  )
}

export default Navbar