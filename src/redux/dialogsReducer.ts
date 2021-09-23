const ADD_MESSAGE = 'ADD-MESSAGE'

type NewMessageActionType = {
    type: typeof ADD_MESSAGE
    newMessage: string
}

export const newMessageActionCreator = (newMessage: string): NewMessageActionType => ({type: `ADD-MESSAGE`, newMessage})

type DialogDataType = {
    id: number
    name: string
}

type MessageDataType = {
    id: number
    message: string
}

type InitialStateType = {
    dialogsData : Array<DialogDataType>
    messagesData : Array<MessageDataType>
}

let initialState: InitialStateType = {
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


const dialogsReducer = (state = initialState , action: any): InitialStateType => {

    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                messagesData: [...state.messagesData, {id: 6, message: action.newMessage}],
            }
        default: return state
    }
}

export default dialogsReducer