import {stopSubmit} from 'redux-form'
import {PhotosType, PostDataType, ProfileType} from '../types/Types'
import {AppStateType, BaseThunkType, InferActionsTypes} from './redux-store'
import {profileAPI} from '../API/profile-api'




let initialState = {
  postsData: [
    {id: 1, message: 'Why is it so difficult?', likesCount: 221},
    {id: 2, message: 'I learn English sometimes', likesCount: 85},
    {id: 3, message: 'Good morning night city ', likesCount: 4},
    {id: 4, message: 'I played football every day ', likesCount: 33},
    {id: 5, message: 'I\'m twenty_five ', likesCount: 15},
  ] as Array<PostDataType>,
  newPostText: 'How are you?',
  profile: null as ProfileType | null,
  userAva: null as any,
  status: ''
}

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actionCreatorsProfile>
type ThunkType = BaseThunkType<ActionsTypes | ReturnType<typeof stopSubmit>>

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case 'ADD_POST': {
      return {
        ...state, newPostText: '',
        postsData: [...state.postsData, {id: 6, message: action.newMessage, likesCount: 0}]
      }
    }
    case 'SET_PROFILE': {
      return {...state, profile: action.profile}
    }
    case 'SET_USER_AVA': {
      if (!action.profile) return {...state, userAva: null}
      return {...state, userAva: action.profile.photos.small}
    }
    case 'SET_USER_STATUS': {
      return {...state, status: action.status}
    }
    case 'DELETE_POST': {
      return {...state, postsData: state.postsData.filter(post => post.id !== action.id)}
    }
    case 'SET_USER_PHOTO': {
      return {...state, profile: {...state.profile, photos: action.photos} as ProfileType}
    }
    default:
      return state
  }
}

export const actionCreatorsProfile = {
  addPostActionCreator: (newMessage: string) => {return {type: 'ADD_POST', newMessage} as const},
  deletePost: (id: number) => {return {type: 'DELETE_POST', id} as const},
  setProfile: (profile: ProfileType) => ({type: 'SET_PROFILE', profile} as const),
  setUserAva: (profile: ProfileType | null) => ({type: 'SET_USER_AVA', profile} as const),
  setUserStatus: (status: string) => ({type: 'SET_USER_STATUS', status} as const),
  setUserPhoto: (photos: PhotosType) => ({type: 'SET_USER_PHOTO', photos} as const)
}

export const getUserProfile = (userId: number | null): ThunkType => {
  return async (dispatch) => {
    const data = await profileAPI.getProfile(userId)
    dispatch(actionCreatorsProfile.setProfile(data))
  }
}

export const getUserAva = (userId: number): ThunkType => {
  return async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(actionCreatorsProfile.setUserAva(response))
  }
}

export const getUserStatus = (userId: number): ThunkType => {
  return async (dispatch) => {
    const response = await profileAPI.getUserStatus(userId)
    dispatch(actionCreatorsProfile.setUserStatus(response))
  }
}

export const updateUserStatus = (status: string): ThunkType => {
  return async (dispatch) => {
    const response = await profileAPI.updateUserStatus(status)
    if (response.data.resultCode === 0) {
      dispatch(actionCreatorsProfile.setUserStatus(status))
    }
  }
}

export const savePhoto = (file: File): ThunkType => {
  return async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
      dispatch(actionCreatorsProfile.setUserPhoto(response.data.data.photos))
    }
  }
}

export const saveProfile = (profile: ProfileType): ThunkType => {
  return async (dispatch, getState) => {
    const userId = getState().authUser.userId
    const response = await profileAPI.saveProfile(profile)
    if (response.data.resultCode === 0) {
      if (userId !== null) {
        dispatch(getUserProfile(userId))
      } else {
        throw new Error('userId can not be null')
      }
    } else {
      let message = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error'
      dispatch(stopSubmit('editProfile', {_error: message}))
      return Promise.reject(message)
    }
  }
}


export default profileReducer