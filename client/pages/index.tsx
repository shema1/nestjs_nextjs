import React, { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { RouteGuard } from '../components/RouteGuard';
import { io } from "socket.io-client";
import { Button } from "@mui/material";
const ENDPOINT = "http://localhost:5000/";

const Index = () => {
  const [response, setResponse] = useState("");

  const socket = io(ENDPOINT);
  useEffect(() => {
    console.log("work")
    socket.on("newChat", data => {
      console.log("newChat", data)
      setResponse(data);
    });

    return () => {
      socket.on("disconnect", () => {
        console.log("disconnect")
      })
    }
  }, []);

  const onSend = () => {
    socket.emit("chat", { message: "test", sender: "user1", recipient: "user2" })
  }

  return (
    <MainLayout >
      <div >
        Test  It's
        <Button onClick={onSend}>asdasd</Button>
      </div>
    </MainLayout>
  )
}

export default Index

