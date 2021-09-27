import React from 'react'
import {connect} from 'react-redux'
import {
    follow,
    setCurrentPage,
    unfollow,
    setToggleFollow,
    getUsers
} from "../../redux/usersReducer"
import Users from "./Users"
import Preloader from "../common/Preloader/Preloader"
import {
    getCurrentPage,
    getFollowInProgress,
    //getIsAuth,
    getIsFetching,
    getTotalUsers,
    getUsersData,
    getUsersOnPage
} from "../../redux/usersSelectors"
import {AppStateType} from "../../redux/redux-store"
import {UserDataType} from "../../types/Types"

type OwnPropsType = {

}

type MapStatePropsType = {
    usersOnPage: number
    totalUsers: number
    currentPage: number
    usersData: Array<UserDataType>
    followInProgress: Array<number>
    isFetching: boolean
}

type MapDispatchPropsType = {
    onPageChanged: (page: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    getUsers: (currentPage: number, usersOnPage: number) => void
}

type PropsType =  MapStatePropsType & MapDispatchPropsType & OwnPropsType

class UsersContainer extends React.Component<PropsType>  {

    componentDidMount() {
       this.props.getUsers(this.props.currentPage, this.props.usersOnPage)
    }

    onPageChanged = (page: number) => {
        this.props.getUsers(page, this.props.usersOnPage)
    }

    render () {
        return <>
            {this.props.isFetching
            ? <Preloader />
            : <Users
                currentPage={this.props.currentPage}
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
        usersData: getUsersData(state),
        usersOnPage: getUsersOnPage(state),
        totalUsers: getTotalUsers(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followInProgress: getFollowInProgress(state),
        //isAuth: getIsAuth(state)
    }
}


//TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
export default connect< MapStatePropsType,  OwnPropsType, MapDispatchPropsType,  AppStateType > (mapStateToProps, {
    follow,
    unfollow,
    //setToggleFollow,
    getUsers,
}) (UsersContainer)

