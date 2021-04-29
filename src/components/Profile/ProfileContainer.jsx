import React from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {getUserProfile, getUserStatus, savePhoto, updateUserStatus, saveProfile} from '../../redux/profileReducer'
import {Redirect, withRouter} from 'react-router-dom'
import {withAuthRedirect} from '../HOC/withAuthRedirect'
import {compose} from 'redux'


class ProfileContainer extends React.Component {

  refreshProfile () {
    let userId = this.props.match.params.userId
    if (!userId) userId = this.props.userId
    if (!userId)  this.props.history.push('/login')
    this.props.getUserProfile(userId)
    this.props.getUserStatus(userId)
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.match.params.userId != prevProps.match.params.userId) {
      this.refreshProfile()
    }
  }

  render() {
    return <Profile {...this.props}
      isOwner={!this.props.match.params.userId}
    />
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  userId: state.authUser.userId,
})

export default compose(
  connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
  withRouter,
  withAuthRedirect
)(ProfileContainer)

