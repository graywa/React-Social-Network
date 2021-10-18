export type MessageType = {
  message: string
  photo: string
  userId: number
  userName: string
}

type SubscriberType = (messages: MessageType[]) => void

let subscribers = [] as SubscriberType[]

let ws: WebSocket | null = null

function createChannel () {
  ws?.removeEventListener('close', closeHandler)
  ws?.close()
  ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
  ws.addEventListener('close', closeHandler)
  ws.addEventListener('message', messageHandler)
} 

function closeHandler() {
  console.log('Web Socket closed')
  setTimeout(createChannel, 3000)      
}

function messageHandler (e: MessageEvent) {
  const newMessages = JSON.parse(e.data)
  subscribers.forEach(s => s(newMessages))
}  

export const chatAPI = {
  start() {    
    createChannel()
  },
  stop() {
    subscribers = []
    ws?.close()
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
  },
  subscribe(callback: SubscriberType) {    
    subscribers.push(callback)
    return () => {
      subscribers = subscribers.filter(s => s !== callback)
    }
  },
  unsubscribe(callback: SubscriberType) {
    subscribers = subscribers.filter(s => s !== callback)
  },
  sendMessage(message: string) {
    ws?.send(message)
  }
}