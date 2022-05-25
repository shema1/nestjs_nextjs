import { ChatsState, ICaht } from "../../types/chat"
import { RootState } from "../reducers"
import _ from "lodash"

const NAME = "chat"


export const getChatState = (state: RootState): ChatsState => state[NAME];
export const getChatsList = (state: RootState): ICaht[] => getChatState(state).chats;
export const getChatById = (state: RootState, id: string): ICaht | undefined => _.find(getChatsList(state), { '_id': id })