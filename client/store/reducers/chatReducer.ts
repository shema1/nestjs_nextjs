import { ChatActionTypes, ChatsState, ChatActions } from "../../types/chat";
import _ from "lodash"
const initState: ChatsState = {
  chats: [],
  chatLoading: {},
  error: ""
}


export const chatReducer = (state = initState, action: ChatActions): ChatsState => {

  switch (action.type) {
    case ChatActionTypes.GET_CHATS:
      return { ...state, chats: action.payload, chatLoading: { ...state.chatLoading, [ChatActionTypes.GET_CHATS_LOADING]: false } }
    case ChatActionTypes.GET_CHATS_LOADING:
      return {
        ...state,
        chatLoading: { ...state.chatLoading, [ChatActionTypes.GET_CHATS_LOADING]: action.payload }
      }
    case ChatActionTypes.GET_CHATS_ERROR:
      return {
        ...state,
        chatLoading: { ...state.chatLoading, [ChatActionTypes.GET_CHATS_ERROR]: false },
        error: action.payload
      }

    case ChatActionTypes.SET_CHATS_FROM_SOCKETS:
      return {
        ...state,
        chats: [action.payload]
      }
    default:
      return state;
  }
}