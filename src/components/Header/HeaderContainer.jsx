import React from "react"
import Header from "./Header"
import {logout, setAuthUser} from "../../redux/AuthReducer"
import {connect} from "react-redux"
import {getUserAva} from "../../redux/profileReducer";


class HeaderContainer extends React.Component {

  refreshHeader() {
    let userId = this.props.userId
    if(userId != null) this.props.getUserAva(userId)
  }

  componentDidMount() {
    this.refreshHeader()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.userId != prevProps.userId) {
      this.refreshHeader()
    }
  }

  render() {
    return <Header {...this.props} />
  }
}

const mapStateToProps = (state) => ({
  userId: state.authUser.userId,
  isAuth: state.authUser.isAuth,
  login: state.authUser.login,
  userAva: state.profilePage.userAva
})

export default connect(mapStateToProps, {setAuthUser, logout, getUserAva})(HeaderContainer)