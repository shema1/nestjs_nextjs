import { Button, Grid, TextField } from "@mui/material";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useActions } from "../../hooks/useAction";
import MainLayout from "../../layouts/MainLayout";
import { ITrack } from "../../types/track";
import axios from "axios";
import { useInput } from "../../hooks/useInput";

interface TrackPageProps {
  serverTrack: ITrack
}

const TrackPage: React.FC<TrackPageProps> = ({ serverTrack }) => {

  const router = useRouter()
  const [track, setTrack] = useState<ITrack>(serverTrack);

  const username = useInput('');
  const comment = useInput('')

  const onBack = () => {
    router.back()
  }




  const addComment = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/tracks/comment`, {
        username: username.value,
        text: comment.value,
        trackId: track._id
      })
      setTrack({ ...track, comments: [...track.comments, response.data] })
    } catch (error) {
      console.log("error", error)
    }

  }

  return (
    <MainLayout>
      <Button variant="outlined" onClick={onBack} style={{ fontSize: 32 }}>
        Back
      </Button>
      <Grid container style={{ margin: '20px 0' }}>
        <img src={`http://localhost:5000/${track?.picture}`} width={200} height={200} />
        <div style={{ marginLeft: 20 }}>
          <h1>Track - {track?.name}</h1>
          <h1>Artist - {track?.artist}</h1>
          <h1>Listens - {track?.listens}</h1>
        </div>
      </Grid>
      <h1>Text</h1>
      <p>{track?.text}</p>
      <h1>Comments</h1>
      <Grid container >
        <TextField
          {...username}
          label="Name"
          fullWidth
        />
        <TextField
          {...comment}
          label="Comment"
          fullWidth
          multiline
          rows={4}
        />
        <Button onClick={addComment}>
          Send
        </Button>
      </Grid>
      <div>
        {track?.comments.map(comment =>
          <div key={comment?._id}>
            <div>Author - {comment?.username}</div>
            <div>{comment?.text}</div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default TrackPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get(`http://localhost:5000/tracks/${params.id}`)
  return {
    props: {
      serverTrack: response.data
    }
  }
}