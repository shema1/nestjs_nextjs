import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { Box } from "@mui/system";
import _ from "lodash"
import { Button, Card, Grid } from "@mui/material";
import TrackList from "../../components/TrackList";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import MainLayout from "../../layouts/MainLayout";
import { RootState } from '../../store/reducers';
import { TrackActionTypes } from "../../types/track";
import { getTracks } from "../../store/actions-creators/track";
import useActionDeps from "../../hooks/useActionDeps";

const Tracks: NextPage<RootState> = () => {

  const router = useRouter();

  const getTracksList = useActionDeps(() => getTracks())
  const { tracks, trackLoading } = useTypedSelector(state => state.track);

  const isLoadingTracks = _.get(trackLoading, TrackActionTypes.GET_TRACKS_LOADING)
  const isLoadingDeleteTrack = _.get(trackLoading, TrackActionTypes.REMOVE_TRACK_LOADING)


  const onClickAddTrack = () => {
    router.push('/tracks/create')
  }

  useEffect(() => {
    getTracksList();
  })

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
