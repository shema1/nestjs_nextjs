import { AuthAction, AuthActionTypes, AuthState } from "../../types/auth";

const initState: AuthState = {
  isLogin: false,
  currentUser: null,
  access_token: ""
}

export const authReducer = (state = initState, action: AuthAction): AuthState => {
  switch (action.type) {

    case AuthActionTypes.LOGIN:
      return {
        ...state,
        isLogin: true,
        access_token: action.payload.access_token,
        currentUser: action.payload.user
      }
    case AuthActionTypes.LOGOUT:
      return { access_token: "", isLogin: false, currentUser: null }
    default:
      return state;
  }
}