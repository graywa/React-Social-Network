import React from 'react'
import {connect} from 'react-redux'
import {
  follow,
  unfollow,
  getUsers,
  FilterType
} from '../../redux/usersReducer'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader'
import {
  getCurrentPage,
  getFollowInProgress,
  //getIsAuth,
  getIsFetching,
  getTotalUsers,
  getUsersData,
  getUsersFilter,
  getUsersOnPage
} from '../../redux/usersSelectors'
import {AppStateType} from '../../redux/redux-store'
import {UserDataType} from '../../types/Types'


type MapStatePropsType = {
  filter: FilterType
  usersOnPage: number
  totalUsers: number
  currentPage: number
  usersData: Array<UserDataType>
  followInProgress: Array<number>
  isFetching: boolean
}

type DispatchPropsType = {
  //onPageChanged: (page: number) => void
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  getUsers: (currentPage: number, usersOnPage: number, filter: FilterType) => void
}

type PropsType = MapStatePropsType & DispatchPropsType

class UsersContainer extends React.Component<PropsType> {

  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.usersOnPage, this.props.filter)
  }

  onPageChanged = (page: number) => {
    this.props.getUsers(page, this.props.usersOnPage, this.props.filter)
  }

  onFilterChanged = (filter: FilterType) => {
    this.props.getUsers(1, this.props.usersOnPage, filter)
  }

  render() {
    return <>
      {this.props.isFetching
        ? <Preloader />
        : <Users
            currentPage={this.props.currentPage}
            onFilterChanged={this.onFilterChanged}
            onPageChanged={this.onPageChanged}
            follow={this.props.follow}
            unfollow={this.props.unfollow}
            totalUsers={this.props.totalUsers}
            usersOnPage={this.props.usersOnPage}
            usersData={this.props.usersData}
            followInProgress={this.props.followInProgress}
            //getUsers={this.props.getUsers}
        />}
    </>
  }
}

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    filter: getUsersFilter(state),
    usersData: getUsersData(state),
    usersOnPage: getUsersOnPage(state),
    totalUsers: getTotalUsers(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followInProgress: getFollowInProgress(state),
  }
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
export default connect<MapStatePropsType, DispatchPropsType, {}, AppStateType>(
  mapStateToProps, {
  follow,
  unfollow,
  getUsers,
})(UsersContainer)

