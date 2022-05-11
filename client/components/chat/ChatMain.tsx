import { NextPage } from 'next';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ICaht } from '../../types/chat';
import _ from "lodash"
import { useTypedSelector } from '../../hooks/useTypedSelector';
import dayjs from 'dayjs'
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
    console.log("test", messagesEndRef.current.scrollIntoView)
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" })
  }

  useEffect(() => {

    scrollToBottom()
  }, [chats, messagesEndRef, selectedChat])


  const chat = useMemo(() => (
    _.find(chats, elem => elem._id === selectedChat)
  ), [selectedChat, chats])

  const [message, setMessage] = useState("")

  const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
  }

  const sendNewMessage = () => {
    const recipientId = _.find(chat?.users, elem => elem !== currentUser._id)
    onSend(recipientId, message)
    setMessage("")
  }

  const renderMessages = () => {
    console.log("messages", chat)
    return _.map(chat?.messages, (elem, index) => (
      <li className="clearfix" key={`${elem.message}-${index}`}>
        <div className={`message-data ${currentUser._id === elem.sender ? "" : "align-right"}`}>
          <span className="message-data-time" >{dayjs(elem.sendDate).isValid()? dayjs(elem.sendDate).format("HH:mm D MMM"): "10:10 AM, Today" }</span> &nbsp; &nbsp;
          <span className="message-data-name" >Olia</span> <i className="fa fa-circle me"></i>
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
          <>
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
            <div className="chat-about">
              <div className="chat-with">Chat with Vincent Porter</div>
              <div className="chat-num-messages">already {chat?.messages.length} messages</div>
            </div>
            <i className="fa fa-star"></i>
          </>
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