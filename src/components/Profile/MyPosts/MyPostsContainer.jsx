import {actionCreatorsProfile} from '../../../redux/profileReducer'
import MyPosts from "./MyPosts"
import {connect} from "react-redux"
import {reset} from "redux-form"


let mapStateToProps = (state) => ({
  posts: state.profilePage.postsData,
  newPost: state.profilePage.newPostText
})

let mapDispatchToProps = (dispatch) => {
  return {
    addPost: (postArea) => {
      dispatch(actionCreatorsProfile.addPostActionCreator(postArea))
      dispatch(reset('myPost'))
    }
  }
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer