import { IUser } from '../../types/user'
import { RootState } from '../reducers'
import { AuthState } from '../../types/auth'

const NAME = 'auth'

export const getAuthState = (state: RootState): AuthState => state[NAME];
export const getUser = (state: RootState): IUser => getAuthState(state).currentUser
export const getAccessToken = (state: RootState): string => getAuthState(state).access_token


