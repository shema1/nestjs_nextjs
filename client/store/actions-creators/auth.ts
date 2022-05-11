import { Dispatch } from "react";
import axios from "axios";
import { AuthAction, AuthActionTypes, ILogin, ISignUp } from "../../types/auth";
import handleError from "../../services/handleError";
import { toast } from 'react-toastify';



export const login = (params: ILogin, callback: () => void) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', params)
      callback()
      return dispatch({ type: AuthActionTypes.LOGIN, payload: response.data })
    } catch (error) {
      handleError(error)
    }
  }
}

export const registration = (params: ISignUp, callback: () => void) => {
  return async () => {
    try {
      await axios.post('http://localhost:5000/auth/registration', params)
      toast.success("Success");
      callback()
    } catch (error) {
      handleError(error)
    }
  }
}

export const logout = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    try {
      return dispatch({ type: AuthActionTypes.LOGOUT })
    } catch (error) {
      console.log(error)
    }
  }
}