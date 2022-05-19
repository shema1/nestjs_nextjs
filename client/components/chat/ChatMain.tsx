import { NextPage } from 'next';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ICaht } from '../../types/chat';
import _ from "lodash"
import { useTypedSelector } from '../../hooks/useTypedSelector';
import dayjs from 'dayjs'
import { Avatar } from '@mui/material';
interface ChatMainProps {
  onSend: (recipientId: string, message: string) => void,
  messages: any[]
  chats: ICaht[]
  selectedChat: string
}

const ChatMain: NextPage<ChatMainProps> = ({ onSend, selectedChat, chats }) => {


  const { currentUser } = useTypedSelector(state => state.auth);

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
  }

  useEffect(() => {

    scrollToBottom()
  }, [chats, messagesEndRef, selectedChat])


  const chat = useMemo(() => (
    _.find(chats, elem => elem._id === selectedChat)
  ), [selectedChat, chats])


  const sender = _.find(chat?.users, elem => elem._id === currentUser._id);

  const recipient = _.find(chat?.users, elem => elem._id !== currentUser._id);

  const [message, setMessage] = useState("")

  const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const sendNewMessage = () => {
    const recipient = _.find(chat?.users, elem => elem !== currentUser._id)
    onSend(recipient._id, message)
    setMessage("")
  }

  const renderMessages = () => {
    return _.map(chat?.messages, (elem, index) => (
      <li className="clearfix" key={`${elem.message}-${index}`}>
        <div className={`message-data ${currentUser._id === elem.sender ? "" : "align-right"}`}>
          <span className="message-data-time" >{dayjs(elem.sendDate).isValid() ? dayjs(elem.sendDate).format("HH:mm D MMM") : "10:10 AM, Today"}</span> &nbsp; &nbsp;
          <span className="message-data-name" >{currentUser._id === elem.sender ? sender?.name : recipient?.name}</span> <i className="fa fa-circle me"></i>
        </div>
        <div className={`message ${currentUser._id === elem.sender ? "my-message" : "other-message float-right"} `}>
          {elem.message}
        </div>
      </li>
    ))
  }



  return (
    <div className="chat">
      <div className="chat-header clearfix">
        {chat && (
          <div style={{display: "flex", alignItems: "center"}}>
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
      <div className="chat-message clearfix" onClick={scrollToBottom}>
        <textarea name="message-to-send" id="message-to-send" placeholder="Type your message" rows={3} value={message} onChange={(e) => onChangeMessage(e)}></textarea>
        <i className="fa fa-file-o"></i> &nbsp;&nbsp;&nbsp;
        <i className="fa fa-file-image-o"></i>
        <button onClick={sendNewMessage}>Send</button>
      </div>

    </div>
  );
};

export default ChatMain;