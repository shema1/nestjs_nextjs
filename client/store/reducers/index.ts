import { AnyAction, combineReducers } from "redux";
import { playerReducer } from "./playerReducer";
import { HYDRATE } from "next-redux-wrapper";
import { trackReducer } from "./trackReducer";
import { authReducer } from "./authReducer";
import { chatReducer } from "./chatReducer";


export const rootReducer = combineReducers({
  player: playerReducer,
  track: trackReducer,
  auth: authReducer,
  chat: chatReducer
})

export const reducer = (state, action: AnyAction) => {
  switch (action.type) {
    case HYDRATE:
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case 'TICK':
      return { ...state, tick: action.payload };
    default:
      return state;
  }
}

export type RootState = ReturnType<typeof rootReducer>