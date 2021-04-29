import React from "react";
import classes from "./MyPosts.module.css";
import Post from "./Post/Post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../utilities/validators";
import {Element} from "../../common/FormsControl/FormsControl";

const TextArea = Element('textarea')

const maxLength10 = maxLengthCreator(10)

const PostForm = (props) => {

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          name='postArea'
          component={TextArea}
          validate={[required, maxLength10]}
        >
        </Field>
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  )
}

const PostFormRedux = reduxForm({
  form: 'myPost'
}) (PostForm)


const MyPosts = (props) => {

  let postsElements = props.posts
    .map(post => <Post message={post.message} likesCount={post.likesCount} key={post.id}/>);

  let onAddPost = (values) => {
    props.addPost(values.postArea);
  }

  return (
    <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <PostFormRedux
        onSubmit={onAddPost}
      />
      <div className={classes.posts}>
        {postsElements};
      </div>
    </div>
  )
}

export default MyPosts;