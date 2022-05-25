import { AnyAction, combineReducers } from "redux";
import { playerReducer } from "./playerReducer";
import { HYDRATE } from "next-redux-wrapper";
import { trackReducer } from "./trackReducer";
import { authReducer } from "./authReducer";
import { chatReducer } from "./chatReducer";
import { userReducer } from "./userReducer";


export const rootReducer = combineReducers({
  player: playerReducer,
  track: trackReducer,
  auth: authReducer,
  chat: chatReducer,
  user: userReducer
})

export type RootState = ReturnType<typeof rootReducer>