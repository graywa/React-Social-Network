import React, { useEffect, useState } from "react"

type MessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

const ChatPage: React.FC = (props) => {
  return (
    <div>      
      <Chat />
    </div>
  )
}

const Chat: React.FC = (props) => {  
  const [wsChannel, setWsChannel] = useState<WebSocket | null>(null)

  useEffect(() => {
    let ws: WebSocket

    function closeHandler() {
      console.log('Web Socket closed')
      setTimeout(createChannel, 3000)      
    }

    function createChannel () {
      ws?.removeEventListener('close', closeHandler)
      ws?.close()
      ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
      ws.addEventListener('close', closeHandler)  
      setWsChannel(ws)          
    }  

    createChannel()

    return () => {
      ws.removeEventListener('close', closeHandler)
      ws.close()
    }
  }, [])

  return (
    <div style={{margin: '15px'}}>
      <Messages wsChannel={wsChannel}/>
      <AddMessageForm wsChannel={wsChannel}/>
    </div>    
  )
}

const Messages: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
  const [messages, setMessages] = useState<MessageType[]>([])

  useEffect(() => {
    wsChannel?.addEventListener('message', messageHandler)
    
    function messageHandler (e: MessageEvent) {
      const newMessages = JSON.parse(e.data)
      setMessages(prev => [...prev, ...newMessages])
    }    

    return () => {
      wsChannel?.removeEventListener('message', messageHandler)
    }  
  }, [wsChannel])

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

const AddMessageForm: React.FC<{wsChannel: WebSocket | null}> = ({wsChannel}) => {
  const [message, setMessage] = useState('')
  const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')

  useEffect(() => {
    const openHandler = () => {
      setReadyStatus('ready')
    }

    wsChannel?.addEventListener('open', openHandler)
    
    return () => {
      wsChannel?.removeEventListener('open', openHandler)
    }
  }, [wsChannel])
  
  const sendMessage = () => {
    if(!message) return
    wsChannel?.send(message)
    setMessage('')
  }
  
  return (
    <div>
      <textarea value={message} onChange={(e => setMessage(e.currentTarget.value))}
       style={{resize:'none'}}>{message}
      </textarea>
      <div>
        <button disabled={!wsChannel || readyStatus !== 'ready'} onClick={sendMessage}>Send</button>
      </div>
    </div>    
  )
}









export default ChatPage