import { Card, Grid, IconButton } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { ITrack } from "../types/track";
import styles from '../styles/TrackItem.module.scss'
import { Delete, Pause, PlayArrow } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { playerSelector } from "../store/selectors";
import { playerActionCreators, trackActionCreators } from "../store/actions-creators";

interface TrackItemProps {
  track: ITrack
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {

  const router = useRouter();
  const dispatch = useDispatch();

  const { pause, active } = useSelector(playerSelector.getPlayerState);

  const pauseTrack = () => dispatch(playerActionCreators.pauseTrack());
  const playTrack = () => dispatch(playerActionCreators.playTrack());
  const setActiveTrack = (track: ITrack) => dispatch(playerActionCreators.setActiveTrack(track));
  const removeTrack = (id: string) => dispatch(trackActionCreators.removeTrack(id));

  const openTrackInfo = () => {
    router.push(`/tracks/${track._id}`)
  }

  const onPlay = (e: SyntheticEvent) => {
    e.stopPropagation();
    (!active || track._id !== active?._id) && setActiveTrack(track);
    playTrack();
  }

  const onPause = (e: SyntheticEvent) => {
    e.stopPropagation();
    pauseTrack()
  }

  const deleteTrack = (e: SyntheticEvent, id: string) => {
    e.stopPropagation()
    removeTrack(id)
  }


  return (
    <Card className={styles.track} onClick={openTrackInfo}>
      <IconButton onClick={(active && track._id === active?._id && !pause) ? onPause : onPlay}>
        {(active && track._id === active?._id && !pause) ? <Pause /> : <PlayArrow />}
      </IconButton>
      <img alt="img" width={70} height={70} src={`http://localhost:5000/${track.picture}`} />
      <Grid container direction="column" style={{ marginLeft: 20, width: 200 }}>
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
      </Grid>
      <IconButton onClick={(e) => deleteTrack(e, track._id)} style={{ marginLeft: "auto" }}>
        <Delete />
      </IconButton>
    </Card>
  )

}

export default TrackItem