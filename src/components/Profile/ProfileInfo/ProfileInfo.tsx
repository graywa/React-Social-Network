import React, {ChangeEvent, useState} from 'react'
import Preloader from '../../common/Preloader/Preloader'
import classes from './ProfileInfo.module.css'
import job__img from './../../../img/job.jpg'
import noJob__img from './../../../img/noJob.png'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import user__img from '../../../img/users/user.png'
import ProfileDataForm from './ProfileDataForm'
import {ContactType, ProfileType} from '../../../types/Types'


type PropsType = {
  profile: ProfileType | null
  isOwner: boolean
  status: string
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
  updateUserStatus: (status: string) => void
}

const ProfileInfo: React.FC<PropsType> = (props) => {

  const [editMode, setEditMode] = useState(false)

  if (!props.profile) {
    return <Preloader/>
  }

  const onSelectPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  const onSubmit = (formData: ProfileType) => {
    props.saveProfile(formData).then(
      () => setEditMode(false)
    )
  }

  return <div>
    <div className={classes.container}>

      <div>
        <img className={classes.userPhoto} src={props.profile.photos.large || user__img}/>
        <div>
          {props.isOwner && <label className={classes.labelInput}><input
            type="file" onChange={onSelectPhoto}/>choose a photo</label>}
        </div>
      </div>
      {editMode
        ? <ProfileDataForm initialValues={props.profile}
                           onSubmit={onSubmit}
                           profile={props.profile}
        />
        : <ProfileData profile={props.profile}
                       isOwner={props.isOwner}
                       status={props.status}
                       updateUserStatus={props.updateUserStatus}
                       onEditMode={() => setEditMode(true)}
        />}
    </div>

    <div className={classes.cover}>
      <img className={classes.cover__img} src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
           alt=""/>
    </div>
  </div>
}

type ProfileDataProps = {
  profile: ProfileType
  status: string
  isOwner: boolean
  updateUserStatus: (status: string) => void
  onEditMode: () => void
}

const ProfileData: React.FC<ProfileDataProps> = (props) => {
  return <div className={classes.description}>
    <div>
      <b>Name:</b> {props.profile.fullName}
    </div>
    <div>
      <b>About me:</b> {props.profile.aboutMe}
    </div>
    <div>
      <div className={classes.status}>
        <ProfileStatusWithHooks
          status={props.status}
          updateUserStatus={props.updateUserStatus}
          isOwner={props.isOwner}
        />
      </div>
      <div className={classes.contacts}>
        <b>Contacts:</b>
        {Object.keys(props.profile.contacts).map(key => {
          return <Contact
            key={key} contactTitle={key} contactValue={props.profile.contacts[key as keyof ContactType]}/>
        })}
      </div>
      <div>
        <img src={props.profile.lookingForAJob ? job__img : noJob__img} alt=""/>{}
      </div>
      {props.profile.lookingForAJob && <div>
        <b>My professional skills:</b> {props.profile.lookingForAJobDescription}
      </div>}
    </div>
    {props.isOwner && <div className={classes.btnSave}>
      <button onClick={props.onEditMode}>edit</button>
    </div>}
  </div>
}

type ContactProps = {
  contactTitle: string
  contactValue: string
}

const Contact: React.FC<ContactProps> = ({contactTitle, contactValue}) => {
  return <div className={classes.contact}><a href={contactValue}>{contactTitle}</a></div>
}

export default ProfileInfo