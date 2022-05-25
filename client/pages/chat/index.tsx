import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs'
import { NextPage } from 'next';
import { io } from "socket.io-client";
import { useSelector } from 'react-redux';
import { authSelector, chatSelector } from '../../store/selectors';
import ChatUsersList from '../../components/chat/ChatUsersList';
import ChatMain from '../../components/chat/ChatMain';
import { useActions } from '../../hooks/useAction';
import ChatLayout from '../../layouts/ChatLayout';

const ENDPOINT = "http://localhost:5000/";

const Chat: NextPage = () => {
  const socket = io(ENDPOINT);

  const { getChats, setChatsFromSocket } = useActions()
  const currentUser = useSelector(authSelector.getUser);
  const chats = useSelector(chatSelector.getChatsList);

  const [selectedChat, setSelectedChat] = useState(null);

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
          <ChatUsersList chats={chats} selectChat={selectChat} selectedChat={selectedChat} />
          <ChatMain onSend={onSend} chats={chats} selectedChat={selectedChat} />
        </div>
      </div>
    </ChatLayout>
  );
};

export default Chat;