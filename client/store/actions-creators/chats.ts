import { Dispatch } from "react"
import { ChatActions, ChatActionTypes, ICaht } from "../../types/chat"
import axios from "axios";
import handleError from "../../services/handleError";

export const getChats = () => {
  return async (dispatch: Dispatch<ChatActions>) => {
    try {
      dispatch({ type: ChatActionTypes.GET_CHATS_LOADING, payload: true })
      const response = await axios.get('http://localhost:5000/chat')
      return dispatch({ type: ChatActionTypes.GET_CHATS, payload: response.data })
    } catch (error) {
      // handleError(error.message)
      return dispatch({ type: ChatActionTypes.GET_CHATS_ERROR, payload: "Error" })
    }
  }
}

export const setChatsFromSocket = (data: ICaht) => {
  return async (dispatch: Dispatch<ChatActions>) => {
    try {
      dispatch({ type: ChatActionTypes.SET_CHATS_FROM_SOCKETS, payload: data })
    } catch (error) {
      console.log("error", error)
    }
  }
}