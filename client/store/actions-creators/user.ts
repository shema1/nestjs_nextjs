import axios from "axios"
import { Dispatch } from "react"
import handleError from "../../services/handleError"
import { UserAction, UserActionTypes } from "../../types/user"


export const getUsers = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.GET_USERS_LOADING, payload: true })
      const response = await axios.get('http://localhost:5000/users')
      return dispatch({ type: UserActionTypes.GET_USERS, payload: response.data })
    } catch (error) {
      handleError(error.message)
      return dispatch({ type: UserActionTypes.GET_USERS_ERROR, payload: "Error" })
    }
  }
}

export const getUser = (id: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.GET_USER_LOADING, payload: true })
      const response = await axios.get(`http://localhost:5000/users/${id}`)
      return dispatch({ type: UserActionTypes.GET_USER, payload: response.data })
    } catch (error) {
      handleError(error.message)
      return dispatch({ type: UserActionTypes.GET_USER_ERROR, payload: "Error" })
    }
  }
}

export const deleteUser = (id: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.DELETE_USER_LOADING, payload: true })
      const response = await axios.delete(`http://localhost:5000/users/${id}`)
      return dispatch({ type: UserActionTypes.DELETE_USER, payload: response.data })
    } catch (error) {
      return dispatch({ type: UserActionTypes.DELETE_USER_ERROR, payload: "Error" })
    }
  }
}

export const updateUser = (params: any) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      dispatch({ type: UserActionTypes.UPDATE_USER_LOADING, payload: true })
      const response = await axios.delete(`http://localhost:5000/users`, params)
      return dispatch({ type: UserActionTypes.UPDATE_USER, payload: response.data })
    } catch (error) {
      return dispatch({ type: UserActionTypes.DELETE_USER_ERROR, payload: "Error" })
    }
  }
}