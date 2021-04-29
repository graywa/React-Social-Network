import profileReducer from "./profileReducer";
import dialogsReducer from "./dialogsReducer";

const UPDATE_NEW_USER = 'UPDATE_NEW_USER',
  ADD_USER = 'ADD_USER'


let store = {
  _state: {
    profilePage: {
      postsData: [
        {id: 1, message: "Postim fignu", likesCount: 221},
        {id: 2, message: "I lern English sometimes", likesCount: 85},
        {id: 3, message: " ", likesCount: 4},
        {id: 4, message: " ", likesCount: 33},
        {id: 5, message: " ", likesCount: 15},
      ],
      newPostText: 'New Post',
    },
    dialogsPage: {
      dialogsData: [
        {id: 1, name: "Valera"},
        {id: 2, name: "Misha"},
        {id: 3, name: "Dasha"},
        {id: 4, name: "Marta"},
        {id: 5, name: "Dima"},
      ],
      newUser: 'User',
      messagesData: [
        {id: 1, message: "Hi"},
        {id: 2, message: "How are you?"},
        {id: 3, message: "Hello"},
        {id: 4, message: "Do you ok?"},
        {id: 5, message: "Yo"},
      ],
      newMessageText: 'Hi dear!',
    }
  },
  _callSubscriber() {
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReducer(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);

    this._callSubscriber(this._state);

    if (action.type === ADD_USER) {
      let newUser = {
        id: 6,
        name: this._state.dialogsPage.newUser,
      }
      this._state.dialogsPage.dialogsData.push(newUser);
      this._state.dialogsPage.dialogsData.newUser = '';

    } else if (action.type === UPDATE_NEW_USER) {
      this._state.dialogsPage.newUser = action.newText;
      this._callSubscriber(this._state);
    }
  }
}

window.store = store;

export default store;