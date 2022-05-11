import { Button, Card, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import TrackList from "../../components/TrackList";
import { useActions } from "../../hooks/UseAction";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MainLayout from "../../layouts/MainLayout";
import { RootState } from '../../store/reducers';
import _ from "lodash"
import { TrackActionTypes } from "../../types/track";
const Tracks: NextPage<RootState> = () => {

  const router = useRouter();

  const { getTracks } = useActions()

  const { tracks, trackLoading } = useTypedSelector(state => state.track);

  const isLoadingTracks = _.get(trackLoading, TrackActionTypes.GET_TRACKS_LOADING)
  const isLoadingDeleteTrack = _.get(trackLoading, TrackActionTypes.REMOVE_TRACK_LOADING)


  const onClickAddTrack = () => {
    router.push('/tracks/create')
  }

  useEffect(() => {
    getTracks()
  }, [])

  return (
    <MainLayout>
      <Grid container justifyContent="center">
        <Card style={{ width: '80%' }}>
          <Box p={3}>
            <Grid container justifyContent="space-between" alignItems={"center"}>
              <h1>Track list</h1>
              <Button onClick={onClickAddTrack}>Add track</Button>
            </Grid>
          </Box>
          <TrackList tracks={tracks} loading={isLoadingTracks || isLoadingDeleteTrack} />
        </Card>
      </Grid>
    </MainLayout>
  )
}

export default Tracks
