import {actionCreatorsProfile} from '../../../redux/profileReducer'
import MyPosts, {DispatchPropsFormType, MapPropsFormType} from './MyPosts'
import {connect} from 'react-redux'
import {reset} from 'redux-form'
import {AppStateType} from '../../../redux/redux-store'


let mapStateToProps = (state: AppStateType) => ({
  posts: state.profilePage.postsData,
})

// let mapDispatchToProps = (dispatch) => {
//   return {
//     addPost: (postArea) => {
//       dispatch(actionCreatorsProfile.addPostActionCreator(postArea))
//       dispatch(reset('myPost'))
//     }
//   }
// }

const MyPostsContainer = connect<MapPropsFormType, DispatchPropsFormType, {}, AppStateType>(mapStateToProps, {
  addPost: actionCreatorsProfile.addPostActionCreator
})(MyPosts)

export default MyPostsContainer