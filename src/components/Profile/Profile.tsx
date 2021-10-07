import React from 'react'
import ProfileInfo from './ProfileInfo/ProfileInfo'
import MyPostsContainer from './MyPosts/MyPostsContainer'
import {ProfileType} from '../../types/Types'
import {AppStateType} from '../../redux/redux-store'

type PropsType = {
  profile: ProfileType | null
  isOwner: boolean
  status: string
  savePhoto: (file: File) => void
  saveProfile: (profile: ProfileType) => Promise<any>
  updateUserStatus: (status: string) => void
}


const Profile: React.FC<PropsType> = (props) => {

  return <div>
    <ProfileInfo
      profile={props.profile}
      status={props.status}
      updateUserStatus={props.updateUserStatus}
      isOwner={props.isOwner}
      savePhoto={props.savePhoto}
      saveProfile={props.saveProfile}
    />
    {/*{props.isOwner && <MyPostsContainer store={props.store} />}*/}
    {props.isOwner && <MyPostsContainer />}
  </div>
}

export default Profile