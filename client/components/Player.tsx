import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import React, { ChangeEvent, useEffect } from 'react';
import { useActions } from '../hooks/UseAction';
import { useTypedSelector } from '../hooks/useTypedSelector';
import styles from '../styles/Player.module.scss';
import TrackProgress from './TrackProgress';

interface PlayerProps {

}
let audio
const Player: React.FC<PlayerProps> = () => {

  const { pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player)

  const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack } = useActions()


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