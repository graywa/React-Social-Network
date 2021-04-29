import React from "react";
import classes from "./Post.module.css";

const Post = (props) => {
    return <div className={classes.item}>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzI1Jqd25IhJsMJf4wBCd_EDER193pS9_KjQ&usqp=CAU" alt=""/>
        { props.message }
        <div>likes: { props.likesCount}</div>
    </div>
}

export default Post;