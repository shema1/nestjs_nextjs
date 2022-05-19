import { NextPage } from 'next';
import React, { SyntheticEvent } from 'react';
import { ICaht } from '../../types/chat';
import _ from "lodash"
import { Button } from '@mui/material';
import Modal from '../Modal';
import UsersList from '../UsersList';
import CreateNewChat from './CreateNewChat';
interface ChatUsersListProps {
  chats: ICaht[]
  selectChat: (id: string) => void
}

const ChatUsersList: NextPage<ChatUsersListProps> = ({ chats, selectChat }) => {

  const [isOpenModal, setIsOpenModal] = React.useState(false);

  const closeChat = () => {
    selectChat("")
  }

  const openChat = (e: SyntheticEvent, id: string) => {
    e.stopPropagation()
    selectChat(id)
  }


  const handleOpenModal = () => setIsOpenModal(true);

  const renderChats = () => {
    return _.map(chats, elem => (
      <li className="clearfix" onClick={(e) => openChat(e, elem._id)}>
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg" alt="avatar" />
        <div className="about">
          <div className="name">Vincent Porter</div>
          <div className="status">
            <i className="fa fa-circle online"></i> online
          </div>
        </div>
      </li>
    ))
  }


  return (
    <div className="people-list" id="people-list">
      {isOpenModal && <CreateNewChat setIsOpenModal={setIsOpenModal} isOpen={isOpenModal} />}
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