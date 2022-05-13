import * as PlayerActionCreators from '../actions-creators/player'
import * as TrackActionCreators from '../actions-creators/track'
import * as AuthActionCreators from '../actions-creators/auth'
import * as ChatActionCreators from '../actions-creators/chats'
import * as UserActionCreators from '../actions-creators/user'





export default {
  ...PlayerActionCreators,
  ...TrackActionCreators,
  ...AuthActionCreators,
  ...ChatActionCreators,
  ...UserActionCreators
}