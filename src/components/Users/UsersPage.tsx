import React from 'react'
import {useSelector} from 'react-redux'
import {Users} from './Users'
import Preloader from '../common/Preloader/Preloader'
import {getIsFetching} from '../../redux/usersSelectors'


export const UsersPage:React.FC = React.memo((props) => {
  
  const isFetching = useSelector(getIsFetching)

  return <>
  {isFetching ? <Preloader /> : null}
  <Users />    
</>
})


