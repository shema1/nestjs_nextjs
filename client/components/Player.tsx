import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import React, { ChangeEvent, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { playerSelector } from '../store/selectors';
import styles from '../styles/Player.module.scss';
import TrackProgress from './TrackProgress';
import { playerActionCreators } from "../store/actions-creators";

interface PlayerProps {

}

let audio

const Player: React.FC<PlayerProps> = () => {

  const dispatch = useDispatch();

  const { pause, volume, active, duration, currentTime } = useSelector(playerSelector.getPlayerState);

  const pauseTrack = () => dispatch(playerActionCreators.pauseTrack());
  const playTrack = () => dispatch(playerActionCreators.playTrack());
  const setVolume = (volume: number) => dispatch(playerActionCreators.setVolume(volume));
  const setCurrentTime = (time: number) => dispatch(playerActionCreators.setCurrentTime(time));
  const setDuration = (duration: number) => dispatch(playerActionCreators.setDuration(duration));

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    } else {
      setAudio();
      active && onPlayTrack();
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
        setDuration(audio.duration);
      }
      audio.ontimeupdate = () => {
        setCurrentTime(audio.currentTime);
      }
    }
  }

  const onStopTrack = () => {
    pauseTrack()
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

  return (
    !active ? null : (<div className={styles.player}>
      <IconButton onClick={pause ? onPlayTrack : onStopTrack}>
        {pause ? <PlayArrow /> : <Pause />}
      </IconButton>
      <Grid container direction="column" style={{ marginLeft: 20, width: 200 }}>
        <div>{active?.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{active?.artist}</div>
      </Grid>
      <TrackProgress formatValue={true} left={currentTime} right={duration} onChange={onChangeProgress} />
      <VolumeUp style={{ marginLeft: 'auto' }} />
      <TrackProgress left={volume} right={100} onChange={onChangeVolume} />
    </div>)
  );
};

export default Player;