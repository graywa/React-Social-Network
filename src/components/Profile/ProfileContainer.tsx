import React from 'react'
import Profile from './Profile'
import {connect} from 'react-redux'
import {getUserProfile, getUserStatus, savePhoto, updateUserStatus, saveProfile} from '../../redux/profileReducer'
import {Redirect, RouteComponentProps, withRouter} from 'react-router-dom'
import {withAuthRedirect} from '../HOC/withAuthRedirect'
import {compose} from 'redux'
import {AppStateType} from '../../redux/redux-store'
import {ProfileType} from '../../types/Types'


type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  getUserProfile: (userId: number) => void
  getUserStatus: (userId: number) => void
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
  updateUserStatus: (status: string) => void
}
type PathParamsType = {
  userId: string
}

type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

class ProfileContainer extends React.Component<PropsType> {

  refreshProfile () {
    let userId: number | null = +this.props.match.params.userId
    if (!userId) userId = this.props.userId
    if (!userId)  this.props.history.push('/login')
    this.props.getUserProfile(userId as number)
    this.props.getUserStatus(userId as number)
  }

  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps: PropsType) {
    if(this.props.match.params.userId !== prevProps.match.params.userId) {
      this.refreshProfile()
    }
  }

  render() {
    return <Profile {...this.props}
      isOwner={!this.props.match.params.userId}
    />
  }
}

let mapStateToProps = (state: AppStateType) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  userId: state.authUser.userId,
})

export default compose<React.ComponentType>(
  connect(mapStateToProps, {getUserProfile, getUserStatus, updateUserStatus, savePhoto, saveProfile}),
  withRouter,
  withAuthRedirect
)(ProfileContainer)