

export interface IUser {
  _id: string;
  name: string;
  email: string;
}


export interface UserState {
  users: IUser[],
  errors: string
  usersLoading: {
    [key: string]: boolean
  }
}

export enum UserActionTypes {
  GET_USERS = "GET_USERS",
  GET_USERS_LOADING = "GET_USERS_LOADING",
  GET_USERS_ERROR = "GET_USERS_ERROR",
  GET_USER = "GET_USER",
  GET_USER_LOADING = "GET_USER_LOADING",
  GET_USER_ERROR = "GET_USER_ERROR",
  UPDATE_USER = "UPDATE_USER",
  UPDATE_USER_LOADING = "UPDATE_USER_LOADING",
  UPDATE_USER_ERROR = "UPDATE_USER_ERROR",
  DELETE_USER = "DELETE_USER",
  DELETE_USER_LOADING = "DELETE_USER_LOADING",
  DELETE_USER_ERROR = "DELETE_USER_ERROR",
}

export interface GetUsersAction {
  type: UserActionTypes.GET_USERS,
  payload: IUser[]
}

export interface GetUsersLoadingAction {
  type: UserActionTypes.GET_USERS_LOADING,
  payload: boolean
}
export interface GetUsersErrorAction {
  type: UserActionTypes.GET_USERS_ERROR,
  payload: string
}

export interface GetUserAction {
  type: UserActionTypes.GET_USER,
  payload: IUser
}

export interface GetUserLoadingAction {
  type: UserActionTypes.GET_USER_LOADING,
  payload: boolean
}
export interface GetUserErrorAction {
  type: UserActionTypes.GET_USER_ERROR,
  payload: string
}

export interface UpdateUserAction {
  type: UserActionTypes.UPDATE_USER,
  payload: IUser
}

export interface UpdateUserLoadingAction {
  type: UserActionTypes.UPDATE_USER_LOADING,
  payload: boolean
}
export interface UpdateUserErrorAction {
  type: UserActionTypes.UPDATE_USER_ERROR,
  payload: string
}

export interface DeleteUserAction {
  type: UserActionTypes.DELETE_USER,
  payload: string
}

export interface DeleteUserLoadingAction {
  type: UserActionTypes.DELETE_USER_LOADING,
  payload: boolean
}
export interface DeleteUserErrorAction {
  type: UserActionTypes.DELETE_USER_ERROR,
  payload: string
}


export type UserAction =
  GetUsersAction
  | GetUsersLoadingAction
  | GetUsersErrorAction
  | GetUserAction
  | GetUserLoadingAction
  | GetUserErrorAction
  | UpdateUserAction
  | UpdateUserLoadingAction
  | UpdateUserErrorAction
  | DeleteUserAction
  | DeleteUserLoadingAction
  | DeleteUserErrorAction
