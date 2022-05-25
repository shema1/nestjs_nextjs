import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { Box } from "@mui/system";
import _ from "lodash"
import { Button, Card, Grid } from "@mui/material";
import TrackList from "../../components/TrackList";
import MainLayout from "../../layouts/MainLayout";
import { RootState } from '../../store/reducers';
import { getTracks } from "../../store/actions-creators/track";
import { useDispatch, useSelector } from "react-redux";
import { trackSelector } from "../../store/selectors";

const Tracks: NextPage<RootState> = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const getTracksList = () => dispatch(getTracks());

  const tracks = useSelector(trackSelector.getTrackList);

  const isLoadingTracks = useSelector(trackSelector.tracksIsLoading);
  const isLoadingDeleteTrack = useSelector(trackSelector.removeTracksIsLoading);

  const onClickAddTrack = () => {
    router.push('/tracks/create')
  }

  useEffect(() => {
    getTracksList();
  }, []);

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
