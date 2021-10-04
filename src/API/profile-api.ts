import {PhotosType, ProfileType} from '../types/Types'
import {instance, APIResponseType} from './api'


type SavePhotoResponseType = {
  photos: PhotosType
}

export const profileAPI = {
  getProfile(userId: number | null) {
    return instance.get<ProfileType>(`profile/${userId}`)
      .then(response => response.data)
  },
  getUserStatus(userId: number) {
    return instance.get<string>(`profile/status/${userId}`)
      .then(response => response.data)
  },
  updateUserStatus(status: string) {
    return instance.put<APIResponseType>(`profile/status`, {status: status})
  },
  savePhoto(photoFile: any) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instance.put<APIResponseType<SavePhotoResponseType>>('profile/photo', formData,
      {headers: {'Content-Type': 'multipart/form-data'}})
  },
  saveProfile(profile: ProfileType) {
    return instance.put<APIResponseType>(`profile`, profile)
  },
}