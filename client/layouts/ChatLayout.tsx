import { Container } from "@mui/material";
import React, { ReactNode } from "react";
import NavBar from "../components/NavBar";
import Player from "../components/Player";

interface ChatLayoutType {
  children: ReactNode
}

const ChatLayout: React.FC<ChatLayoutType> = ({ children }) => {

  return (
    <>
      <NavBar />
      <div style={{ marginTop: 64, height: 'calc(100vh - 65px)' }}>
        {children}
      </div>
      <Player />
    </>
  )
}

export default ChatLayout;