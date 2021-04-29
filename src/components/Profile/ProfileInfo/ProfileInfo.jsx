import React, {useState} from "react"
import Preloader from "../../common/Preloader/Preloader"
import classes from './ProfileInfo.module.css'
import job__img from './../../../img/job.jpg'
import noJob__img from './../../../img/noJob.png'
import ProfileStatusWithHooks from "./ProfileStatusWithHooks"
import user__img from "../../../img/users/user.png"
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {

  const [editMode, setEditMode] = useState(false)

  if (!props.profile) {
    return <Preloader/>
  }

  const onSelectPhoto = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData) => {
    props.saveProfile(formData).then(
      () => setEditMode(false)
    )
  }

  return <div>
    <div className={classes.container}>

      <div className={classes.userPhoto}>
        <img className={classes.userPhoto} src={props.profile.photos.large || user__img}/>
        <div >
          {props.isOwner && <label className={classes.labelInput}><input
            type="file" onChange={onSelectPhoto}/>Choose a photo</label>}
        </div>
      </div>
      { editMode
        ? <ProfileDataForm initialValues={props.profile}
                           onSubmit={onSubmit}
                           profile={props.profile}
        />
        : <ProfileData profile={props.profile}
                       isOwner={props.isOwner}
                       status={props.status}
                       updateUserStatus={props.updateUserStatus}
                       onEditMode={() => setEditMode(true)}
        /> }
    </div>

    <div className={classes.cover}>
      <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" alt=""/>
    </div>
  </div>
}

const ProfileData = (props) => {
  return <div className={classes.description}>
    <div>
      <b>Name:</b> {props.profile.fullName}
    </div>
    <div>
      <b>About me:</b> {props.profile.aboutMe}
    </div>
    <div>
      <ProfileStatusWithHooks
        status={props.status}
        updateUserStatus={props.updateUserStatus}
        isOwner={props.isOwner}
      />
      <div className={classes.contacts}>
        <b>Contacts:</b>
        {Object.keys(props.profile.contacts).map(key => {
          return <Contact
            key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
        })}
      </div>
      <div>
        <img src={props.profile.lookingForAJob ? job__img : noJob__img} alt=""/>{}
      </div>
      {props.profile.lookingForAJob && <div>
        <b>My professional skills:</b> {props.profile.lookingForAJobDescription}
      </div>}
    </div>
    {props.isOwner && <div><button onClick={props.onEditMode}>edit</button></div>}
  </div>
}


const Contact = ({contactTitle, contactValue}) => {
   return <div><a href={contactValue}>{contactTitle}</a></div>
}

export default ProfileInfo