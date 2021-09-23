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
    getIsAuth,
    getIsFetching,
    getTotalUsers,
    getUsersData,
    getUsersOnPage
} from "../../redux/usersSelector"


class UsersContainer extends React.Component  {

    componentDidMount() {
       this.props.getUsers(this.props.currentPage, this.props.usersOnPage)
    }

    onPageChanged = (page) => {
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
                getUsers={this.props.getUsers}
            />}
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        usersData: getUsersData(state),
        usersOnPage: getUsersOnPage(state),
        totalUsers: getTotalUsers(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followInProgress: getFollowInProgress(state),
        isAuth: getIsAuth(state)
    }
}

export default connect (mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    //setToggleFollow,
    getUsers,
}) (UsersContainer)

