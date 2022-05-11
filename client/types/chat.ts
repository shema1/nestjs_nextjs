


export interface ICaht {
  _id: string,
  mesage: IMessage[],
  sender: string,
  recipient: string
}

export interface IMessage {
  message: string
  sender: string
  recipient: string
  sendDate: string
}

export interface ChatsState {
  chats: ICaht[],
  chatLoading: {
    [key: string]: boolean
  },
  error: string
}

export enum ChatActionTypes {
  GET_CHATS = 'GET_CHATS',
  GET_CHATS_LOADING = 'GET_CHATS_LOADING',
  GET_CHATS_ERROR = 'GET_CHATS_ERROR',
  SET_CHATS_FROM_SOCKETS = 'SET_CHATS_FROM_SOCKETS'
}

interface getChatsActions {
  type: ChatActionTypes.GET_CHATS,
  payload: ICaht[]
}

interface getChatsLoadingActions {
  type: ChatActionTypes.GET_CHATS_LOADING,
  payload: boolean
}

interface getChatsErrorActions {
  type: ChatActionTypes.GET_CHATS_ERROR,
  payload: string
}

interface setChatsFromSocketErrorActions {
  type: ChatActionTypes.SET_CHATS_FROM_SOCKETS,
  payload: ICaht
}


export type ChatActions = getChatsActions | getChatsLoadingActions | getChatsErrorActions | setChatsFromSocketErrorActions