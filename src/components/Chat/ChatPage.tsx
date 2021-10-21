import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { MessageTypeAPI } from '../../API/chat-api'
import {
  getMessages,
  sendMessage,
  stopGetMessages,
} from '../../redux/chatReducer'
import { AppStateType } from '../../redux/redux-store'
import styles from './ChatPage.module.css'

const ChatPage: React.FC = () => {
  return (
    <div>
      <Chat />
    </div>
  )
}

const Chat: React.FC = React.memo(() => {
  const dispatch = useDispatch()
  const status = useSelector((state: AppStateType) => state.chat.status)

  useEffect(() => {
    dispatch(getMessages())
    return () => {
      dispatch(stopGetMessages())
    }
  }, [])

  return (
    <div className={styles.chat} >
      {status === 'error' && <h2>Some error. Please refresh page</h2>}
      <Messages />
      <AddMessageForm />
    </div>
  )
})

const Messages: React.FC = () => {
  const messages = useSelector((state: AppStateType) => state.chat.messages)
  const messagesAnchorRef = useRef<HTMLDivElement>(null)
  const [isAutoScroll, setIsAutoScroll] = useState(true)

  useEffect(() => {
    if (isAutoScroll)
      messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const element = e.currentTarget
    if (
      element.scrollHeight - element.scrollTop - 200 <=
      element.clientHeight
    ) {
      setIsAutoScroll(true)
    } else setIsAutoScroll(false)
  }

  return (
    <div className={styles.messages} onScroll={scrollHandler}
    >
      {messages.map((m, index) => (
        <Message message={m} key={m.id} />
      ))}
      <div ref={messagesAnchorRef}></div>
    </div>
  )
}

const Message: React.FC<{ message: MessageTypeAPI }> = React.memo(({ message }) => {

  const ownUserId = useSelector((state: AppStateType) => state.authUser.userId)

  console.log(ownUserId)
  
    
    return (
      <div className={ownUserId === message.userId ? styles.message_owner : styles.message}>        
        <NavLink to={`/profile/${message.userId}`}>
          <img className={styles.message__ava} 
          src={message.photo} alt='avatar' />
        </NavLink>
        <div className={styles.message__content}>
          <h3 className={styles.message__user}>{message.userName}</h3>
          <p>{message.message}</p> 
        </div>               
      </div>
    )
  }
)

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
    <div className={styles.form}>
      <div className={styles.form__text}>
        <textarea value={message} onChange={(e) => setMessage(e.currentTarget.value)}>
          {message}
        </textarea>
      </div>
      
      <div className={styles.form__button}>
        <button disabled={status !== 'ready'} onClick={sendMessageHandler}>
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatPage
