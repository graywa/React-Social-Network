export type MessageTypeAPI = {
  message: string
  photo: string
  userId: number
  userName: string
}
export type StatusType = 'pending' | 'ready' | 'error'

type MessagesReceivedSubscriberType = (messages: MessageTypeAPI[]) => void
type StatusChangedSubscriberType = (status: StatusType) => void

let subscribers = {
  'messages-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[]
}

let ws: WebSocket | null = null
type EventsNamesType = 'messages-received' | 'status-changed'

function notifySubscribersAboutStatus (status: StatusType) {
  subscribers['status-changed'].forEach(s => s(status))
} 

function createChannel () {
  cleanUp()
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  notifySubscribersAboutStatus('pending')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
  ws.addEventListener('open', openHandler)
  ws.addEventListener('error', errorHandler)
} 

function closeHandler() {
  console.log('Web Socket closed')
  notifySubscribersAboutStatus('pending')
  setTimeout(createChannel, 3000)      
}

function messageHandler (e: MessageEvent) {
  const newMessages = JSON.parse(e.data)
  subscribers['messages-received'].forEach(s => s(newMessages))
}  

function openHandler() {
  notifySubscribersAboutStatus('ready')
}

function errorHandler() {
  notifySubscribersAboutStatus('error')
}

function cleanUp() {
  ws?.removeEventListener('close', closeHandler)
  ws?.removeEventListener('message', messageHandler)
  ws?.removeEventListener('open', openHandler)
  ws?.removeEventListener('error', errorHandler)
}

export const chatAPI = {
  start() {    
    createChannel()
  },
  stop() {
    subscribers['messages-received'] = []
    subscribers['status-changed'] = []
    ws?.close()
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
  },
  subscribe(event: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) { 
    // @ts-ignore   
    subscribers[event].push(callback)
    return () => {
      // @ts-ignore
      subscribers[event] = subscribers[event].filter(s => s !== callback)
    }
  },
  unsubscribe(event: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) {
    // @ts-ignore
    subscribers[event] = subscribers[event].filter(s => s !== callback)
  },
  sendMessage(message: string) {
    ws?.send(message)
  }
}