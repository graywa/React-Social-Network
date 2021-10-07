import React from 'react'
import Header from './Header'
import {logout} from '../../redux/authReducer'
import {connect} from 'react-redux'
import {getUserAva} from '../../redux/profileReducer'
import {AppStateType} from '../../redux/redux-store'


class HeaderContainer extends React.Component<PropsType> {

  refreshHeader() {
    let userId = this.props.userId
    if (userId != null) this.props.getUserAva(userId)
  }

  componentDidMount() {
    this.refreshHeader()
  }

  componentDidUpdate(prevProps: PropsType) {
    if (this.props.userId !== prevProps.userId) {
      this.refreshHeader()
    }
  }

  render() {
    return <Header {...this.props} />
  }
}

type MapPropsType = {
  userId: number | null
  userAva: string
  isAuth: boolean
  login: string | null
}
type DispatchPropsType = {
  getUserAva: (userId: number) => void
  logout: () => void
}
type PropsType = MapPropsType & DispatchPropsType


const mapStateToProps = (state: AppStateType) => ({
  userId: state.authUser.userId,
  isAuth: state.authUser.isAuth,
  login: state.authUser.login,
  userAva: state.profilePage.userAva
} )

export default connect<MapPropsType, DispatchPropsType, {}, AppStateType>(
  mapStateToProps, {logout, getUserAva})(HeaderContainer)