import React from 'react'
import preloader from "../../../img/users/preloader.svg"
import classes from './Preloader.module.css'

let Preloader = () => {
    return <div className={classes.preloader}>
         <img src={preloader} alt="" />
    </div>
}

export default Preloader