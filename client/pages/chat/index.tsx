import { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ChatUsersList from '../../components/chat/ChatUsersList';
import ChatMain from '../../components/chat/ChatMain';
import { useActions } from '../../hooks/useAction';
import ChatLayout from '../../layouts/ChatLayout';
import dayjs from 'dayjs'
const ENDPOINT = "http://localhost:5000/";

const Chat: NextPage = () => {
  const socket = io(ENDPOINT);

  const { currentUser } = useTypedSelector(state => state.auth);
  const { chats } = useTypedSelector(state => state.chat);

  const { getChats, setChatsFromSocket } = useActions()

  const [selectedChat, setSelectedChat] = useState(null)

  useEffect(() => {
    getChats()
    socket.on("newChat", data => {
      setChatsFromSocket(data)
    });

    return () => {
      socket.on("disconnect", () => {
        console.log("disconnect")
      })
    }
  }, []);



  const messages = []

  const selectChat = (id: string) => {
    setSelectedChat(id)
  }
  const onSend = (recipientId: string, message: string) => {
    socket.emit("chat", {
      chatId: selectedChat,
      message: message,
      sender: currentUser._id,
      recipient: recipientId,
      sendDate: dayjs().format()
    })
  }

  return (
    <ChatLayout>
      <div className="main">
        <div className="container clearfix">
          <ChatUsersList chats={chats} selectChat={selectChat} />
          <ChatMain onSend={onSend} messages={messages} chats={chats} selectedChat={selectedChat} />
        </div>
      </div>
    </ChatLayout>
  );
};

export default Chat;