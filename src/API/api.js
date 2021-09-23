import * as axios from "axios"

const instance = axios.create({
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  withCredentials: true,
  headers: {
    'API-KEY': '4d4ce820-d6cb-4d21-ba42-f4ed879e398c'
  }
});

export const usersAPI = {
  getUsers(currentPage = 1, usersOnPage = 4) {
    return instance.get(`users?page=${currentPage}&count=${usersOnPage}`)
      .then(response => response.data)
  },
  follow(userId) {
    return instance.post(`follow/${userId}`, {})
      .then(response => response.data)
  },
  unfollow(userId) {
    return instance.delete(`follow/${userId}`)
      .then(response => response.data)
  },
}

export const profileAPI = {
  getProfile(userId) {
    return instance.get(`profile/${userId}`)
  },
  getUserStatus(userId) {
    return instance.get(`profile/status/${userId}`)
  },
  updateUserStatus(status) {
    return instance.put(`profile/status`, {status: status})
  },
  savePhoto(photoFile) {
    const formData = new FormData()
    formData.append('image', photoFile)
    return instance.put('profile/photo', formData,
      {headers: {"Content-Type": "multipart/form-data"}})
  },
  saveProfile(profile) {
    return instance.put(`profile`, profile)
  },
}

export const authAPI = {
  getAuth() {
    return instance.get(`auth/me`)
      .then(response => response.data)
  },
  login(email, password, rememberMe = false, captcha) {
    return instance.post(`auth/login`, {email, password, rememberMe, captcha})
  },
  logout() {
    return instance.delete(`auth/login`)
  }
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.get(`security/get-captcha-url`)
  }
}


