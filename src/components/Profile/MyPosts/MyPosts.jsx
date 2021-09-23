import classes from "./MyPosts.module.css"
import Post from "./Post/Post"
import {Field, reduxForm} from "redux-form"
import {maxLengthCreator, required} from "../../utilities/validators"
import {Element} from "../../common/FormsControl/FormsControl"

const TextArea = Element('textarea')

const maxLength50 = maxLengthCreator(50)

const PostForm = (props) => {

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

const PostFormRedux = reduxForm({
  form: 'myPost'
}) (PostForm)


const MyPosts = (props) => {

  let postsElements = props.posts
    .map(post => <Post message={post.message} likesCount={post.likesCount} key={post.id}/>)

  let onAddPost = (values) => {
    props.addPost(values.postArea)
  }

  return (
    <div className={classes.postsBlock}>
      <div className={classes.newPost__block}>
        <h3>My posts</h3>
        <PostFormRedux
          onSubmit={onAddPost}
        />
      </div>

      <div className={classes.posts}>
        {postsElements}
      </div>
    </div>
  )
}

export default MyPosts