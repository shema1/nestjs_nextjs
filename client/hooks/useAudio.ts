import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { pauseTrack, playTrack, setCurrentTime, setVolume } from "../store/actions-creators/player";
import { useTypedSelector } from "./useTypedSelector";


let audio

export const useAudio = () => {

  const { pause, active, duration, currentTime } = useSelector(state => state!.player)

  const [trackTime, setTrackTime] = useState(currentTime);
  const [trackDuration, setTrackDuration] = useState(duration)


  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    }
    else {
      setAudio();
    }
  }, [active])


  useEffect(() => {
    if (active) {
      pause ? audio.pause() : audio.play()
    }
  }, [pause, active])

  const setAudio = () => {
    if (active) {
      audio.src = `http://localhost:5000/${active.audio}`;
      audio.onloadedmetadata = () => {
        setTrackDuration(audio.duration);
      }
      audio.ontimeupdate = () => {
        setTrackTime(audio.currentTime);
      }
    }
  }

  const onStopTrack = () => {
    pauseTrack(trackTime)
  }

  const onPlayTrack = () => {
    playTrack()
  }

  const onChangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value))
    audio.volume = Number(Number(e.target.value) / 100)
  }

  const onChangeProgress = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value))
    audio.currentTime = Number(e.target.value)
  }

  return {
    onPlayTrack,
    onStopTrack,
    onChangeVolume,
    onChangeProgress,
    trackDuration,
    trackTime
  }
}