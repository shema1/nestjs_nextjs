import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NextPage } from 'next';
import dayjs from 'dayjs'
import _ from "lodash"
import { ICaht } from '../../types/chat';
import { Avatar } from '@mui/material';
import { authSelector, chatSelector } from '../../store/selectors';
import { RootState } from '../../store/reducers';
import { chatActionCreators } from '../../store/actions-creators';

interface ChatMainProps {
  onSend: (recipientId: string, message: string) => void,
  chats: ICaht[]
  selectedChat: string
}

const ChatMain: NextPage<ChatMainProps> = ({ onSend, selectedChat, chats }) => {

  const dispatch = useDispatch();

  const readMessages = (chatId: string) => dispatch(chatActionCreators.readMessages(chatId))

  const currentUser = useSelector(authSelector.getUser);
  const chat = useSelector((state: RootState) => chatSelector.getChatById(state, selectedChat))

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [chats, messagesEndRef, selectedChat])

  useEffect(() => {
    const count = _.filter(chat?.messages, (elem) => elem.sender !== currentUser._id && elem.isRead === false);
    (selectedChat && count?.length) && readNewMessage()
  }, [selectedChat, chat])

  const readNewMessage = () => {
    readMessages(selectedChat)
  }

  // const [unreadMessagesIds, setUnreadMessagesIds] = useState([])

  // useEffect(() => {
  //   const messagesIds = _.filter(chat?.messages, (elem: ICaht) => elem.sender !== currentUser._id).map((elem: ICaht) => elem._id);
  //   setUnreadMessagesIds([...unreadMessagesIds, ...messagesIds]);
  // }, [chat])

  // const isNewMessage = (message: IMessage): string => {
  //   return (message.sender !== currentUser._id && _.includes(unreadMessagesIds, message._id)) ? "New" : ""
  // }

  const recipient = _.find(chat?.users, elem => elem._id !== currentUser._id);

  const [message, setMessage] = useState("")

  const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const sendNewMessage = () => {
    onSend(recipient?._id, message)
    setMessage("")
  }

  const renderMessages = () => {
    return _.map(chat?.messages, (elem, index) => (
      <li className="clearfix" key={`${elem.message}-${index}`}>
        <div className={`message-data ${currentUser._id === elem.sender ? "" : "align-right"}`}>
          {/* <span style={{ color: "#ff6b00", fontWeight: "900" }}>{isNewMessage(elem)}</span> <i className="fa fa-circle me"></i> */}
          <span className="message-data-time" >{dayjs(elem.sendDate).isValid() ? dayjs(elem.sendDate).format("HH:mm D MMM") : "10:10 AM, Today"}</span> &nbsp; &nbsp;
          <span className="message-data-name" >{currentUser._id === elem.sender ? "My" : recipient?.name}</span> <i className="fa fa-circle me"></i>
        </div>
        <div className={`message ${currentUser._id === elem.sender ? "my-message" : "other-message float-right"} `}>
          {elem.message}
        </div>
      </li>
    ))
  }

  return !selectedChat ?
    <div className="chat" style={{ height: "calc(100vh - 64px)", display: "flex", justifyContent: "center", alignItems: "center", fontSize: 20, color: "#0000005c" }}>
      select chat
    </div> : (
      <div className="chat">
        <div className="chat-header clearfix">
          {chat && (
            <div style={{ display: "flex", alignItems: "center" }}>
              <Avatar alt={recipient?.name + ' ' + recipient?.lastName} src={`http://localhost:5000/${recipient?.avatar}`} sx={{ width: 55, height: 55, }} />
              <div className="chat-about">
                <div className="chat-with">Chat with {recipient?.name} {recipient?.lastName}</div>
                <div className="chat-num-messages">already {chat?.messages.length} messages</div>
              </div>
            </div>
          )}
        </div>

        <div className="chat-history" >
          <ul >
            {renderMessages()}
            <li ref={messagesEndRef}></li>
          </ul>
        </div>
        <div className="chat-message clearfix" onClick={scrollToBottom} >
          <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows={3} value={message} onChange={(e) => onChangeMessage(e)}></textarea>
          <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
          <i className="fa fa-file-image-o"></i>
          <button onClick={sendNewMessage}>Send</button>
        </div>
      </div>
    );
};

export default ChatMain;