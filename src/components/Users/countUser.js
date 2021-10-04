import {usersAPI} from '../../API/users-api'


let userWidthPhoto = 0
let users = 0

export let countUsers = () => {
  for(let i = 101; i < 118; i++) {
     setTimeout(() => {
       usersAPI.getUsers(i, 100).then(response => {
         for (let user of response.items) {
           ++users
           if(user.photos.small != null) {
             ++userWidthPhoto
           }
         }
         console.log('withPhoto', userWidthPhoto)
         console.log('users', users)
       })
     }, 500)
  }
}

