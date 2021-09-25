import React, {useState} from 'react'
import classes from './Users.module.css'

type PropsType = {
  totalUsers: number
  usersOnPage: number
  portionSize: number
  currentPage: number

  onPageChanged: (p: number) => void
}


let Paginator: React.FC<PropsType> = (props) => {

  const pagesCount = Math.ceil(props.totalUsers / props.usersOnPage)
  const portionCount = Math.ceil(pagesCount/props.portionSize)

  let pages = []

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let [portionNumber, setPortionNumber] = useState(Math.ceil(props.currentPage/props.portionSize))
  const leftPage = props.portionSize * (portionNumber - 1) + 1
  const rightPage = props.portionSize * portionNumber

  return(
    <div className={classes.selectorNumbers}>
      { portionNumber > 1 && <span className={classes.btn__pages}
                                   onClick={ () => setPortionNumber(portionNumber - 1)}>...</span>
      }

      {pages
        .filter(p => p >= leftPage && p <= rightPage)
        .map(p => {
          return <span className={props.currentPage === p ? classes.selectedPage : classes.unselectedPage}
                       key={p}
                       onClick={ () => {props.onPageChanged(p)} }>{p}</span>
        })}

      { portionNumber < portionCount && <span className={classes.btn__pages}
                                              onClick={ () => setPortionNumber(portionNumber + 1) }>...</span>
      }
    </div>
  )
}

export default Paginator

