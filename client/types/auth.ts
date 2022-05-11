import { IUser } from "./user"


export interface AuthState {
  isLogin: boolean,
  currentUser: IUser,
  access_token: string
}


export interface ILogin {
  email: string;
  password: string
}

export interface ISignUp {
  email: string;
  name: string;
  password: string
}

export enum AuthActionTypes {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
  SIGNUP = "SIGNUP"
}

interface LoginAction {
  type: AuthActionTypes.LOGIN
  payload: { 
    access_token:string, 
    user: {
      _id: string,
      name: string,
      email: string
    }}
}

interface SignupAction {
  type: AuthActionTypes.SIGNUP
  payload: IUser
}

interface LogoutAction {
  type: AuthActionTypes.LOGOUT
}

export type AuthAction = LoginAction | LogoutAction | SignupAction
