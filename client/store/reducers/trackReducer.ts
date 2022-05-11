import { TrackAction, TrackActionTypes, TrackState } from "../../types/track";
import _ from "lodash";
const initState: TrackState = {
  tracks: [],
  error: "",
  trackLoading: {}
}

export const trackReducer = (state = initState, action: TrackAction): TrackState => {
  switch (action.type) {
    case TrackActionTypes.GET_TRACKS:
      return {
        ...state,
        tracks: action.payload,
        trackLoading: { ...state.trackLoading, [TrackActionTypes.GET_TRACKS_LOADING]: false }
      }
    case TrackActionTypes.GET_TRACKS_LOADING:
      return {
        ...state,
        trackLoading: { ...state.trackLoading, [TrackActionTypes.GET_TRACKS_LOADING]: action.payload }
      }
    case TrackActionTypes.GET_TRACKS_ERROR:
      return {
        ...state,
        trackLoading: { ...state.trackLoading, [TrackActionTypes.GET_TRACKS_LOADING]: false },
        error: action.payload
      }
    case TrackActionTypes.GET_TRACK:
      return {
        ...state,
        tracks: [...state.tracks, action.payload],
        trackLoading: { ...state.trackLoading, [TrackActionTypes.GET_TRACK_LOADING]: false }
      }
    case TrackActionTypes.GET_TRACK_LOADING:
      return {
        ...state,
        trackLoading: { ...state.trackLoading, [TrackActionTypes.GET_TRACK_LOADING]: action.payload }
      }
    case TrackActionTypes.GET_TRACK_ERROR:
      return {
        ...state,
        trackLoading: { ...state.trackLoading, [TrackActionTypes.GET_TRACK_LOADING]: false },
        error: action.payload
      }
    case TrackActionTypes.REMOVE_TRACK:
      return {
        ...state,
        tracks: _.filter(state.tracks, elem => elem._id !== action.payload),
        trackLoading: { ...state.trackLoading, [TrackActionTypes.REMOVE_TRACK_LOADING]: false }
      }
    case TrackActionTypes.REMOVE_TRACK_LOADING:
      return {
        ...state,
        trackLoading: { ...state.trackLoading, [TrackActionTypes.REMOVE_TRACK_LOADING]: action.payload }
      }
    default:
      return state;
  }
}