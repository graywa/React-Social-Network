import {profileAPI} from "../API/api"
import {stopSubmit} from "redux-form"
import {PhotosType} from "../types/Types"
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const ADD_POST = 'ADD-POST',
  SET_PROFILE = 'SET_PROFILE',
  SET_USER_STATUS = 'SET_USER_STATUS',
  DELETE_POST = 'DELETE_POST',
  SET_USER_PHOTO = 'SET_USER_PHOTO',
  SET_USER_AVA = 'SET_USER_AVA'

type PostDataType = {
  id: number
  message: string
  likesCount: number
}

type ContactType = {
  github: string
  vk: string
  facebook: string
  instagram: string
  twitter: string
  website: string
  youtube: string
  mainLink: string
}

type ProfileType = {
  userId: number
  lookingForAJob: boolean
  lookingForAJobDescription: string
  fullName: string
  contacts: ContactType
  photos: PhotosType
}

let initialState = {
  postsData: [
    {id: 1, message: "Why is it so difficult?", likesCount: 221},
    {id: 2, message: "I learn English sometimes", likesCount: 85},
    {id: 3, message: "Good morning night city ", likesCount: 4},
    {id: 4, message: "I played football every day ", likesCount: 33},
    {id: 5, message: "I'm twenty-five ", likesCount: 15},
  ] as Array<PostDataType>,
  newPostText: 'How are you?',
  profile: null as ProfileType | null,
  userAva: null as any,
  status: ''
}

type InitialStateType = typeof initialState

type ActionsTypes = AddPostActionType | DeletePostActionType | SetProfileActionType | SetUserAvaActionType |
    SetUserStatusActionType | SetUserPhotoActionType

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      return {...state, newPostText: '',
        postsData: [...state.postsData, {id: 6, message: action.newMessage, likesCount: 0}]}
    }
    case SET_PROFILE: {
      return {...state, profile: action.profile}
    }
    case SET_USER_AVA: {
      if(!action.profile) return {...state, userAva: null}
      return {...state, userAva: action.profile.photos.small}
    }
    case SET_USER_STATUS: {
      return {...state, status: action.status}
    }
    case DELETE_POST: {
      return {...state, postsData: state.postsData.filter(post => post.id !== action.id)}
    }
    case SET_USER_PHOTO: {
      return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
    }
    default:
      return state
  }
}

type AddPostActionType = {
  type: typeof ADD_POST
  newMessage: string
}
export const addPostActionCreator = (newMessage: string): AddPostActionType => {
  return {type: 'ADD-POST', newMessage}
}

type DeletePostActionType = {
  type: typeof DELETE_POST
  id: number
}
export const deletePost = (id: number): DeletePostActionType => {
  return {type: 'DELETE_POST', id}
}

type SetProfileActionType = {
  type: typeof SET_PROFILE
  profile: ProfileType
}
export const setProfile = (profile: ProfileType): SetProfileActionType => ({
  type: 'SET_PROFILE',
  profile,
})

type SetUserAvaActionType = {
  type: typeof SET_USER_AVA
  profile: ProfileType | null
}
export const setUserAva = (profile: ProfileType | null): SetUserAvaActionType => ({
  type: 'SET_USER_AVA',
  profile,
})

type SetUserStatusActionType = {
  type: typeof SET_USER_STATUS
  status: string
}
export const setUserStatus = (status: string): SetUserStatusActionType => ({
  type: 'SET_USER_STATUS',
  status,
})

type SetUserPhotoActionType = {
  type: typeof SET_USER_PHOTO
  photos: PhotosType
}
export const setUserPhoto = (photos: PhotosType): SetUserPhotoActionType => ({
  type: 'SET_USER_PHOTO',
  photos,
})

type ThunkType = ThunkAction<Promise<void>, AppStateType, any, ActionsTypes>

export const getUserProfile = (userId: number | null): ThunkType => {
  return async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setProfile(response.data))
  }
}

export const getUserAva = (userId: number): ThunkType => {
  return async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserAva(response.data))
  }
}

export const getUserStatus = (userId: number): ThunkType => {
  return async (dispatch) => {
    const response = await profileAPI.getUserStatus(userId)
    dispatch(setUserStatus(response.data))
  }
}

export const updateUserStatus = (status: string): ThunkType => {
  return async (dispatch) => {
    const response = await profileAPI.updateUserStatus(status)
    if (response.data.resultCode === 0) {
      dispatch(setUserStatus(status))
    }
  }
}

export const savePhoto = (file: any): ThunkType => {
  return async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
      dispatch(setUserPhoto(response.data.data.photos))
    }
  }
}

export const saveProfile = (profile: ProfileType): ThunkType => {
  return async (dispatch, getState) => {
    const userId = getState().authUser.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId))
    } else {
      let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
      dispatch(stopSubmit('editProfile', {_error: message}))
      return Promise.reject(message)
    }
  }
}


export default profileReducer