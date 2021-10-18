import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MessageType } from "../../API/chat-api"
import { getMessages, sendMessage, stopGetMessages } from "../../redux/chatReducer"
import { AppStateType } from "../../redux/redux-store"


const ChatPage: React.FC = (props) => {
  return (
    <div>      
      <Chat />
    </div>
  )
}

const Chat: React.FC = (props) => {  

  const dispatch = useDispatch()

  useEffect (() => {
    dispatch(getMessages())
    return () => {
      dispatch(stopGetMessages())
    }
  }, [])

  return (
    <div style={{margin: '15px'}}>
      <Messages />
      <AddMessageForm />
    </div>    
  )
}

const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages)

  return (
    <div style={{margin: '0 0 25px', height: '400px', overflow: 'auto'}}>
      { messages.map((m: MessageType, index) => <Message message={m} key={index} />) }    
    </div>    
  )
}

const Message: React.FC<{message: MessageType}> = ({message}) => {
  return (
    <div>
      <img src={message.photo} alt="avatar" style={{width: '50px'}}/> 
      <div>
        <b>{message.userName}</b>
      </div>
      <br />
      <div>{message.message}</div>
      <hr />
    </div>    
  )
}

const AddMessageForm: React.FC = () => {

  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  
  const sendMessageHandler = () => {
    if (!message) return
    dispatch(sendMessage(message))
    setMessage('')
  }
  
  return (
    <div>
      <textarea value={message} onChange={(e => setMessage(e.currentTarget.value))}
       style={{resize:'none'}}>{message}
      </textarea>
      <div>
        <button disabled={false} onClick={sendMessageHandler}>Send</button>
      </div>
    </div>    
  )
}

export default ChatPage