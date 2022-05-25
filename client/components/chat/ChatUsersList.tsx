import React, { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { NextPage } from 'next';
import _ from "lodash"
import { Avatar, Badge, Button } from '@mui/material';
import { ICaht } from '../../types/chat';
import CreateNewChat from './CreateNewChat';
import { authSelector } from '../../store/selectors';
interface ChatUsersListProps {
  chats: ICaht[]
  selectChat: (id: string) => void
  selectedChat: string
}

const ChatUsersList: NextPage<ChatUsersListProps> = ({ chats, selectChat, selectedChat }) => {

  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const currentUser = useSelector(authSelector.getUser);

  const closeChat = () => {
    selectChat("")
  }

  const openChat = (e: SyntheticEvent, id: string) => {
    e.stopPropagation()
    selectChat(id)
  }

  const getUserName = (chat: ICaht) => {
    const recipient = _.find(chat?.users, elem => elem._id !== currentUser._id);
    return recipient.name + " " + recipient.lastName
  }

  const getUnreadMessagesCount = (chat: ICaht) => {
    const senderMessages = _.filter(chat.messages, (elem) => elem.sender !== currentUser._id);
    const count = _.filter(senderMessages, (elem) => elem.isRead === false);
    return count?.length
  }

  const getUserAvatar = (chat: ICaht) => {
    const recipient = _.find(chat?.users, elem => elem._id !== currentUser._id);
    return recipient.avatar ? `http://localhost:5000/${recipient.avatar}` : null
  }

  const handleOpenModal = () => setIsOpenModal(true);

  const renderChats = () => {
    return _.map(chats, elem => (
      <li className="clearfix" onClick={(e) => openChat(e, elem._id)} style={{ backgroundColor: elem._id === selectedChat ? "#0000ff91" : "" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Badge color="secondary" badgeContent={getUnreadMessagesCount(elem)}>
            <Avatar alt={getUserName(elem)} src={getUserAvatar(elem)} sx={{ width: 55, height: 55, }} />
          </Badge>
          <div className="about">
            <div className="name">{getUserName(elem)}</div>
            <div className="status">
              <i className="fa fa-circle online"></i> online
            </div>
          </div>
        </div>
      </li>
    ))
  }


  return (
    <div className="people-list" id="people-list">
      {isOpenModal && <CreateNewChat setIsOpenModal={setIsOpenModal} isOpen={isOpenModal} selectChat={selectChat} />}
      <div className="chat-add">
        <Button variant="contained" onClick={handleOpenModal}>+ Add new chat</Button>
      </div>
      <ul className="list" onClick={closeChat}>
        {renderChats()}
      </ul>
    </div>
  );
};

export default ChatUsersList;