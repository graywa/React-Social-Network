import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { MessageTypeAPI } from "../../API/chat-api"
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
  const status = useSelector((state: AppStateType) => state.chat.status)

  useEffect (() => {
    dispatch(getMessages())
    return () => {
      dispatch(stopGetMessages())
    }
  }, [])

  return (    
    <div style={{margin: '15px'}}>
      {status === 'error' && <h2>Some error. Please refresh page</h2>}       
      <Messages />
      <AddMessageForm />          
    </div>    
  )
}

const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages)
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)

  useEffect (() => { 
    if(isAutoScroll) messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})    
  }, [messages])

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget
    if (element.scrollHeight - element.scrollTop - 200 <= element.clientHeight) {      
      setIsAutoScroll(true)
    } else setIsAutoScroll(false)       
  }

  return (
    <div style={{margin: '0 0 25px', height: '400px', overflow: 'auto'}} onScroll={scrollHandler}>
      { messages.map((m, index) => <Message message={m} key={m.id} />) } 
      <div ref={messagesAnchorRef}></div>   
    </div>    
  )
}

const Message: React.FC<{message: MessageTypeAPI}> = React.memo(({message}) => {
  console.log('message render');
  
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
})

const AddMessageForm: React.FC = () => {

  const [message, setMessage] = useState('')

  const dispatch = useDispatch()
  const status = useSelector((state: AppStateType) => state.chat.status)
  
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
        <button disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
      </div>
    </div>    
  )
}

export default ChatPage