import React from "react";
import classes from "./Profile.module.css";
import MyPosts from "./MyPosts/MyPosts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {Redirect} from "react-router-dom";

const Profile = (props) => {
    return <div>
        <ProfileInfo
          profile={props.profile}
          status={props.status}
          updateUserStatus={props.updateUserStatus}
          isOwner={props.isOwner}
          savePhoto={props.savePhoto}
          saveProfile={props.saveProfile}
        />
        <MyPostsContainer store={props.store}/>
    </div>
}

export default Profile;