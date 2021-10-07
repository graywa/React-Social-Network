import React from 'react'
import classes from './Post.module.css'

type PropsType = {
  message: string
  likesCount: number
}

const Post: React.FC<PropsType> = (props) => {
  return <div className={classes.post__item}>
    <div>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzI1Jqd25IhJsMJf4wBCd_EDER193pS9_KjQ&usqp=CAU"
           alt=""/>
    </div>
    <div className={classes.post__content}>
      {props.message}
      <div>&#10084; {props.likesCount}</div>
    </div>
  </div>
}

export default Post