import { IUser } from "./user"



export interface ICaht {
  _id: string,
  messages: IMessage[],
  sender: string,
  recipient: string,
  users: IUser[]
}

export interface IMessage {
  _id: string
  chatId: string
  message: string
  sender: string
  recipient: string
  sendDate: string
  isRead: boolean
}

export interface ChatsState {
  chats: ICaht[],
  chatLoading: {
    [key: string]: boolean
  },
  error: string
}

export interface CreateChatDto {
  sender: string
  recipient: string
}

export enum ChatActionTypes {
  GET_CHATS = 'GET_CHATS',
  CREATE_CHAT = 'CREATE_CHAT',
  GET_CHATS_LOADING = 'GET_CHATS_LOADING',
  GET_CHATS_ERROR = 'GET_CHATS_ERROR',
  SET_CHATS_FROM_SOCKETS = 'SET_CHATS_FROM_SOCKETS',
  READ_MESSAGES = 'READ_MESSAGES'
}

interface getChatsActions {
  type: ChatActionTypes.GET_CHATS,
  payload: ICaht[]
}

interface createChatActions {
  type: ChatActionTypes.CREATE_CHAT,
  payload: ICaht
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

interface readMessages {
  type: ChatActionTypes.READ_MESSAGES,
  payload: ICaht
}


export type ChatActions = getChatsActions | getChatsLoadingActions | getChatsErrorActions | setChatsFromSocketErrorActions | createChatActions | readMessages