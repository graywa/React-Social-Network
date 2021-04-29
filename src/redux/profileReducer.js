import {profileAPI} from "../API/api"
import {stopSubmit} from "redux-form";

const ADD_POST = 'ADD-POST',
  SET_PROFILE = 'SET_PROFILE',
  SET_USER_STATUS = 'SET_USER_STATUS',
  DELETE_POST = 'DELETE_POST',
  SET_USER_PHOTO = 'SET_USER_PHOTO',
  SET_USER_AVA = 'SET_USER_AVA'


let initialState = {
  postsData: [
    {id: 1, message: "Why is it so difficult?", likesCount: 221},
    {id: 2, message: "I learn English sometimes", likesCount: 85},
    {id: 3, message: "Good morning night city ", likesCount: 4},
    {id: 4, message: "I played football every day ", likesCount: 33},
    {id: 5, message: "I'm twenty-five ", likesCount: 15},
  ],
  newPostText: 'How are you?',
  profile: null,
  userAva: null,
  status: ''
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 6,
        message: action.newMessage,
        likesCount: 0,
      }
      let copyState = {...state}
      copyState.postsData = [...state.postsData]
      copyState.postsData.push(newPost)
      copyState.newPostText = ""
      return copyState
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
      return {...state, postsData: state.postsData.filter(post => post.id != action.id)}
    }
    case SET_USER_PHOTO: {
      return {...state, profile: {...state.profile, photos: action.photos}}
    }
    default:
      return state
  }
}

export const addPostActionCreator = (newMessage) => {
  return {type: 'ADD-POST', newMessage}
}

export const deletePost = (id) => {
  return {type: 'DELETE_POST', id}
}

export const setProfile = (profile) => ({
  type: 'SET_PROFILE',
  profile,
})

export const setUserAva = (profile) => ({
  type: 'SET_USER_AVA',
  profile,
})

export const setUserStatus = (status) => ({
  type: 'SET_USER_STATUS',
  status,
})

export const setUserPhoto = (photos) => ({
  type: 'SET_USER_PHOTO',
  photos,
})

export const getUserProfile = (userId) => {
  return async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setProfile(response.data))
  }
}

export const getUserAva = (userId) => {
  return async (dispatch) => {
    const response = await profileAPI.getProfile(userId)
    dispatch(setUserAva(response.data))
  }
}

export const getUserStatus = (userId) => {
  return async (dispatch) => {
    const response = await profileAPI.getUserStatus(userId)
    dispatch(setUserStatus(response.data))
  }
}

export const updateUserStatus = (status) => {
  return async (dispatch) => {
    const response = await profileAPI.updateUserStatus(status)
    if (response.data.resultCode === 0) {
      dispatch(setUserStatus(status))
    }
  }
}

export const savePhoto = (file) => {
  return async (dispatch) => {
    const response = await profileAPI.savePhoto(file)
    if (response.data.resultCode === 0) {
      dispatch(setUserPhoto(response.data.data.photos))
    }
  }
}

export const saveProfile = (profile) => {
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


export default profileReducer;