import { NextPage } from 'next';
import React, { SyntheticEvent } from 'react';
import { ICaht } from '../../types/chat';
import _ from "lodash"
import { Avatar, Button } from '@mui/material';
import Modal from '../Modal';
import UsersList from '../UsersList';
import CreateNewChat from './CreateNewChat';
import { useTypedSelector } from '../../hooks/useTypedSelector';
interface ChatUsersListProps {
  chats: ICaht[]
  selectChat: (id: string) => void
}

const ChatUsersList: NextPage<ChatUsersListProps> = ({ chats, selectChat }) => {

  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const { currentUser } = useTypedSelector(state => state.auth);


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
    console.log("chat", chat)
    const senderMessages = _.filter(chat.messages, (elem) => elem.sender !== currentUser._id);
    console.log("senderMessages", senderMessages);
    const count = _.filter(senderMessages, (elem) => elem.isRead === false);
    console.log("count", count);
    return count?.length
  }

  const getUserAvatar = (chat: ICaht) => {
    const recipient = _.find(chat?.users, elem => elem._id !== currentUser._id);
    return recipient.avatar ? `http://localhost:5000/${recipient.avatar}` : null
  }
  const handleOpenModal = () => setIsOpenModal(true);

  const renderChats = () => {
    return _.map(chats, elem => (
      <li className="clearfix" onClick={(e) => openChat(e, elem._id)}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar alt={getUserName(elem)} src={getUserAvatar(elem)} sx={{ width: 55, height: 55, }} />
          <div className="about">
            <div className="name">{getUserName(elem)}</div>
            <div className="status">
              <i className="fa fa-circle online"></i> online {getUnreadMessagesCount(elem)}
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