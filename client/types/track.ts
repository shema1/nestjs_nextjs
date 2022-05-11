import { IComment } from "./comment";

export interface ITrack {
  _id: string;
  name: string;
  artist: string;
  text: string;
  listens: number;
  picture: string;
  audio: string;
  comments: IComment[];
}

export interface TrackState {
  tracks: ITrack[];
  error: string;
  trackLoading: {
    [key: string]: boolean
  }
}

export enum TrackActionTypes {
  GET_TRACKS = 'GET_TRACKS',
  GET_TRACKS_LOADING = 'GET_TRACKS_LOADING',
  GET_TRACKS_ERROR = 'GET_TRACKS_ERROR',
  GET_TRACK = 'GET_TRACK',
  GET_TRACK_LOADING = 'GET_TRACK_LOADING',
  GET_TRACK_ERROR = 'GET_TRACK_ERROR',
  REMOVE_TRACK = 'REMOVE_TRACK',
  REMOVE_TRACK_LOADING = 'REMOVE_TRACK_LOADING',
  CREATE_TRACK = 'CREATE_TRACK'
}


export interface CreateTrack {
  name: string;
  artist: string;
  text: string;
  picture: any | null;
  audio: any | null;
}
interface getTracksAction {
  type: TrackActionTypes.GET_TRACKS;
  payload: ITrack[];
}

interface getTracksLoadingAction {
  type: TrackActionTypes.GET_TRACKS_LOADING;
  payload: boolean;
}

interface getTracksErrorAction {
  type: TrackActionTypes.GET_TRACKS_ERROR;
  payload: string;
}
interface getTrackAction {
  type: TrackActionTypes.GET_TRACK;
  payload: ITrack;
}

interface getTrackErrorAction {
  type: TrackActionTypes.GET_TRACK_ERROR;
  payload: string;
}

interface getTrackLoadingAction {
  type: TrackActionTypes.GET_TRACK_LOADING;
  payload: boolean;
}
interface removeTrackAction {
  type: TrackActionTypes.REMOVE_TRACK;
  payload: string;
}

interface removeTrackLoadingAction {
  type: TrackActionTypes.REMOVE_TRACK_LOADING;
  payload: boolean;
}
interface createTrackAction {
  type: TrackActionTypes.CREATE_TRACK;
  payload: ITrack
}



export type TrackAction =
  getTracksAction
  | getTracksLoadingAction
  | getTrackAction
  | getTrackLoadingAction
  | getTrackErrorAction
  | getTracksErrorAction
  | removeTrackAction
  | removeTrackLoadingAction
  | createTrackAction;