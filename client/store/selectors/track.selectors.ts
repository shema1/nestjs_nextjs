import _ from "lodash"
import { ITrack, TrackActionTypes, TrackState } from "../../types/track";
import { RootState } from "../reducers";
const NAME = "track"


export const getTrackState = (state: RootState): TrackState => state[NAME];
export const getTrackList = (state: RootState): ITrack[] => getTrackState(state).tracks;
export const getTracksLoading = (state: RootState): any => getTrackState(state).trackLoading
export const getTrackById = (state: RootState, id: string): ITrack | undefined => _.find(getTrackList(state), { '_id': id })
export const tracksIsLoading = (state: RootState): boolean | undefined => _.get(getTracksLoading(state), TrackActionTypes.GET_TRACKS_LOADING)
export const removeTracksIsLoading = (state: RootState): boolean | undefined => _.get(getTracksLoading(state), TrackActionTypes.REMOVE_TRACK_LOADING)
