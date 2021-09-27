export type PhotosType = {
    small: string | null
    large: string | null
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

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactType
    photos: PhotosType
}

export type UserDataType = {
    id: number
    name: string
    status: string
    photos: Array<PhotosType>
    followed: boolean
}