import {InferActionsTypes} from './redux-store'


export const actionCreators = {
    newMessageAC : (newMessage: string) => ({type: 'ADD-MESSAGE', newMessage} as const)
}

export type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actionCreators>

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


const dialogsReducer = (state = initialState , action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case 'ADD-MESSAGE':
            return {
                ...state,
                messagesData: [...state.messagesData, {id: 6, message: action.newMessage}],
            }
        default: return state
    }
}

export default dialogsReducer