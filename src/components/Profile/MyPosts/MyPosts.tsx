import React from 'react'
import classes from './MyPosts.module.css'
import Post from './Post/Post'
import {Field, InjectedFormProps, reduxForm} from 'redux-form'
import {maxLengthCreator, required} from '../../utilities/validators'
import {Element} from '../../common/FormsControl/FormsControl'
import {PostDataType} from '../../../types/Types'

const TextArea = Element('textarea')
const maxLength50 = maxLengthCreator(50)

type MyPostsFormProps = {}

const PostForm: React.FC<InjectedFormProps<MyPostsFormValuesType, MyPostsFormProps> & MyPostsFormProps> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className={classes.newPost}>
        <div>
          <Field
            placeholder='How are you?'
            name='postArea'
            component={TextArea}
            cols="70"
            rows="3"
            validate={[required, maxLength50]}
          >
          </Field>
        </div>
        <div>
          <button>Add post</button>
        </div>
      </div>
    </form>
  )
}

const PostFormRedux = reduxForm<MyPostsFormValuesType, MyPostsFormProps>({
  form: 'myPost'
})(PostForm)

type MyPostsFormValuesType = {
  posts: Array<PostDataType>
  addPost: (postArea: string) => void
}
type AddPostFormType = {
  postArea: string
}

const MyPosts: React.FC<MyPostsFormValuesType> = (props) => {

  const postsElements = props.posts
    .map(post => <Post message={post.message} likesCount={post.likesCount} key={post.id}/>)

  const onAddPost = (values: AddPostFormType) => {
    props.addPost(values.postArea)
  }

  return (
    <div className={classes.postsBlock}>
      <div className={classes.newPost__block}>
        <h3>My posts</h3>
        <PostFormRedux onSubmit={onAddPost} />
      </div>

      <div className={classes.posts}>
        {postsElements}
      </div>
    </div>
  )
}

export default MyPosts