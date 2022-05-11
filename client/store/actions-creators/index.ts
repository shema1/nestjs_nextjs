import * as PlayerActionCreators from '../actions-creators/player'
import * as TrackActionCreators from '../actions-creators/track'
import * as AuthActionCreators from '../actions-creators/auth'
import * as ChatActionCreators from '../actions-creators/chats'




export default {
  ...PlayerActionCreators,
  ...TrackActionCreators,
  ...AuthActionCreators,
  ...ChatActionCreators
}