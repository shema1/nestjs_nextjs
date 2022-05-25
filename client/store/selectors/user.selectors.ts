import { IUser, UserState } from "../../types/user";
import { RootState } from "../reducers";
import _ from "lodash"

const NAME = "user";

export const getUserState = (state: RootState): UserState => state[NAME];
export const getUsersList = (state: RootState): IUser[] => getUserState(state).users;
export const getUserById = (state: RootState, id: string): IUser | undefined => _.find(getUsersList(state), { '_id': id })