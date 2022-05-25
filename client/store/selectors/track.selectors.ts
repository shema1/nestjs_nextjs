import _ from "lodash"
import { ITrack, TrackState } from "../../types/track";
import { RootState } from "../reducers";
const NAME = "track"


export const getTrackState = (state: RootState): TrackState => state[NAME];
export const getTrackList = (state: RootState): ITrack[] => getTrackState(state).tracks;
export const getTrackById = (state: RootState, id: string): ITrack | undefined => _.find(getTrackList(state), { '_id': id })