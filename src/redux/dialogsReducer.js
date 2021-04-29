const ADD_MESSAGE = 'ADD-MESSAGE'


export const newMessageActionCreator = (newMessage) => ({type: `ADD-MESSAGE`, newMessage})

let initialState = {
    dialogsData : [
        {id:1, name: "Valera"},
        {id:2, name: "Misha"},
        {id:3, name: "Dasha"},
        {id:4, name: "Marta"},
        {id:5, name: "Dima"},
    ],
    messagesData : [
        {id:1, message: "Hi"},
        {id:2, message: "How are you?"},
        {id:3, message: "Hello"},
        {id:4, message: "Do you ok?"},
        {id:5, message: "Yo"},
    ],
}

const dialogsReducer = (state = initialState , action) => {

    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messagesData: [...state.messagesData, {id : 6, message : action.newMessage}],
            }
        default: return state
    }
}

export default dialogsReducer