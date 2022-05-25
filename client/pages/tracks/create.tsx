import { Button, Grid, TextField } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import FileUpload from "../../components/FileUpload";
import StepWrapper from "../../components/StepWrapper";
import { useInput } from "../../hooks/useInput";
import MainLayout from "../../layouts/MainLayout";
import { Image } from '@mui/icons-material';
import { useDispatch } from "react-redux";
import { trackActionCreators } from "../../store/actions-creators";

enum CREATE_FIELDS {
  name = "name",
  artist = "artist",
  text = "text"
}
interface CreateProps {

}

const Create: React.FC<CreateProps> = () => {

  const dispatch = useDispatch();

  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null);
  const [audio, setAudio] = useState(null);
  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');
  const router = useRouter();

  const createTrack = (params: FormData, callback: any) => dispatch(trackActionCreators.createTrack(params, callback));

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep(prev => prev + 1)
    } else {
      const formData: FormData = new FormData()
      formData.append('name', name.value)
      formData.append('text', text.value)
      formData.append('artist', artist.value)
      formData.append('picture', picture)
      formData.append('audio', audio)
      createTrack(formData, callback)
    }
  }

  const callback = () => {
    router.push('/tracks')
  }

  const back = () => {
    setActiveStep(prev => prev - 1)
  }

  return (
    <MainLayout>
      <StepWrapper activeStep={activeStep}>
        {activeStep === 0 &&
          <Grid container direction={"column"} style={{ padding: 20 }}>
            <TextField
              {...name}
              style={{ marginTop: 10 }}
              label="Track name"
            />
            <TextField
              {...artist}
              style={{ marginTop: 10 }}
              label="Author"
            />
            <TextField
              {...text}
              style={{ marginTop: 10 }}
              label="Text"
              multiline
              rows={3}
            />
          </Grid>
        }
        {activeStep === 1 &&
          <FileUpload setFile={setPicture} accept="image/*">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
              {!picture && <Image style={{ fontSize: 50 }} />}
              {picture && <img alt="img" width={200} height={200} src={URL.createObjectURL(picture)} />}
              <Button>Upload image</Button>
            </div>
          </FileUpload>
        }
        {activeStep === 2 &&
          <FileUpload setFile={setAudio} accept="audio/*">
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
              {audio && <p>{audio.name}</p>}
              <Button>Upload Track</Button>
            </div>
          </FileUpload>
        }
      </StepWrapper>
      <Grid container justifyContent="space-between">
        <Button onClick={back} disabled={activeStep === 0}>Back</Button>
        <Button onClick={next}>Next</Button>
      </Grid>
    </MainLayout>
  )
}

export default Create