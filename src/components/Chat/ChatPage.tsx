import React, { useEffect, useState } from "react"

const wsChat = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')

type MessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

const ChatPage: React.FC = (props) => {
  return (
    <div>
      Chat
      <Chat />
    </div>
  )
}

const Chat: React.FC = (props) => {
  return (
    <div style={{margin: '15px'}}>
      <Messages />
      <AddMessageForm />
    </div>    
  )
}

const Messages: React.FC = (props) => {

  const [messages, setMessages] = useState<MessageType[]>([])

  useEffect(() => {
    wsChat.addEventListener('message', (e: MessageEvent) => {
      const newMessages = JSON.parse(e.data)
      setMessages(prev => [...prev, ...newMessages])   
  })   
  }, [])

  return (
    <div style={{margin: '0 0 25px',height: '400px', overflow: 'auto'}}>
      { messages.map((m: MessageType) => <Message message={m} key={m.userId} />) }    
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

const AddMessageForm: React.FC = (props) => {

  const [message, setMessage] = useState('')

  const sendMessage = () => {
    if(!message) return
    wsChat.send(message)
    setMessage('')
  }

  return (
    <div>
      <textarea value={message} onChange={(e => setMessage(e.currentTarget.value))}
       style={{resize:'none'}}>{message}
      </textarea>
      <div>
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>    
  )
}









export default ChatPage