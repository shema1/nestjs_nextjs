import { Dispatch } from "react";
import { TrackAction, TrackActionTypes } from "../../types/track";
import axios from "axios";
import handleError from "../../services/handleError";


export const getTracks = () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      dispatch({ type: TrackActionTypes.GET_TRACKS_LOADING, payload: true })
      const response = await axios.get('http://localhost:5000/tracks')
      return dispatch({ type: TrackActionTypes.GET_TRACKS, payload: response.data })
    } catch (error) {
      handleError(error.message)
      return dispatch({ type: TrackActionTypes.GET_TRACKS_ERROR, payload: "Error" })
    }
  }
}

export const getTrack = (id) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      dispatch({ type: TrackActionTypes.GET_TRACK_LOADING, payload: true })
      const response = await axios.get(`http://localhost:5000/tracks/${id}`)
      return dispatch({ type: TrackActionTypes.GET_TRACK, payload: response.data })
    } catch (error) {
      handleError(error.message)
      return dispatch({ type: TrackActionTypes.GET_TRACK_ERROR, payload: "Error" })
    }
  }
}

export const removeTrack = (id) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      dispatch({ type: TrackActionTypes.REMOVE_TRACK_LOADING, payload: true })
      const response = await axios.delete(`http://localhost:5000/tracks/${id}`)
      return dispatch({ type: TrackActionTypes.REMOVE_TRACK, payload: response.data })
    } catch (error) {
      return dispatch({ type: TrackActionTypes.GET_TRACKS_ERROR, payload: "Error" })
    }
  }
}

export const createTrack = (params: FormData, callback: () => void) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.post(`http://localhost:5000/tracks/`, params)
        .then(() => {
          callback()
        })
    } catch (error) {
      return dispatch({ type: TrackActionTypes.GET_TRACKS_ERROR, payload: "Error" })
    }
  }
}