import { Box, CircularProgress, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { ITrack } from "../types/track";
import TrackItem from "./TrackItem";

interface TrackListProps {
  tracks: ITrack[];
  loading?: boolean
}

const TrackList: React.FC<TrackListProps> = ({ tracks, loading }) => {

  return (
    <Grid container direction="column" style={{ position: "relative", height: "60%" }}>
      <Box>
        {tracks.map(track =>
          <TrackItem
            key={track._id}
            track={track}
          />
        )}
      </Box>
      {loading && <div style={{ position: "absolute", backgroundColor: "#00000030", width: "100%", height: "100%" }}>
        <CircularProgress style={{ marginLeft: "47%", marginTop: 100 }} />
      </div>}
    </Grid>
  )
}

export default TrackList