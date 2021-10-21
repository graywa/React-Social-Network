import {actionCreatorsProfile} from '../../../redux/profileReducer'
import MyPosts, {DispatchPropsType, MapPropsType} from './MyPosts'
import {connect} from 'react-redux'
import {AppStateType} from '../../../redux/redux-store'


const mapStateToProps = (state: AppStateType) => ({
  posts: state.profilePage.postsData,
})

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addPost: actionCreatorsProfile.addPostActionCreator
})(MyPosts)

export default MyPostsContainer