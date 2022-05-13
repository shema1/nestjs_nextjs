import { UserState, UserAction, UserActionTypes } from "../../types/user";
import _ from "lodash";

const initState: UserState = {
  users: [],
  errors: "",
  usersLoading: {}
}

export const userReducer = (state = initState, action: UserAction): UserState => {
  switch (action.type) {
    case UserActionTypes.GET_USERS:
      return {
        ...state,
        users: action.payload,
        usersLoading: { ...state.usersLoading, [UserActionTypes.GET_USERS_LOADING]: false }
      }
    case UserActionTypes.GET_USERS_LOADING:
      return {
        ...state,
        usersLoading: { ...state.usersLoading, [UserActionTypes.GET_USERS_LOADING]: true }
      }
    case UserActionTypes.GET_USERS_ERROR:
      return {
        ...state,
        errors: action.payload,
        usersLoading: { ...state.usersLoading, [UserActionTypes.GET_USERS_LOADING]: false }
      }

    case UserActionTypes.GET_USER:
      return {
        ...state,
        users: _.map(state.users, elem => elem._.id === action.payload._id ? action.payload : elem),
        usersLoading: { ...state.usersLoading, [UserActionTypes.GET_USER_LOADING]: false }
      }
    case UserActionTypes.GET_USER_LOADING:
      return {
        ...state,
        usersLoading: { ...state.usersLoading, [UserActionTypes.GET_USER_LOADING]: true }
      }
    case UserActionTypes.GET_USER_ERROR:
      return {
        ...state,
        errors: action.payload,
        usersLoading: { ...state.usersLoading, [UserActionTypes.GET_USER_LOADING]: false }
      }

    case UserActionTypes.UPDATE_USER:
      return {
        ...state,
        users: _.map(state.users, elem => elem._.id === action.payload._id ? action.payload : elem),
        usersLoading: { ...state.usersLoading, [UserActionTypes.UPDATE_USER_LOADING]: false }
      }
    case UserActionTypes.UPDATE_USER_LOADING:
      return {
        ...state,
        usersLoading: { ...state.usersLoading, [UserActionTypes.UPDATE_USER_LOADING]: true }
      }
    case UserActionTypes.UPDATE_USER_ERROR:
      return {
        ...state,
        errors: action.payload,
        usersLoading: { ...state.usersLoading, [UserActionTypes.UPDATE_USER_LOADING]: false }
      }
    case UserActionTypes.DELETE_USER:
      return {
        ...state,
        users: _.filter(state.users, elem => elem._.id !== action.payload),
        usersLoading: { ...state.usersLoading, [UserActionTypes.DELETE_USER_LOADING]: false }
      }
    case UserActionTypes.DELETE_USER_LOADING:
      return {
        ...state,
        usersLoading: { ...state.usersLoading, [UserActionTypes.DELETE_USER_LOADING]: true }
      }
    case UserActionTypes.DELETE_USER_ERROR:
      return {
        ...state,
        errors: action.payload,
        usersLoading: { ...state.usersLoading, [UserActionTypes.DELETE_USER_LOADING]: false }
      }
    default:
      return state
  }
}