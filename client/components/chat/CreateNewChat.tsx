import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Modal from '../Modal';
import UsersList from '../UsersList';
import _ from "lodash"
import { IUser } from '../../types/user';
import { ICaht } from '../../types/chat';

interface CreateNewChatProps {
  setIsOpenModal: any,
  isOpen: boolean,
  selectChat: any
}
const CreateNewChat: React.FC<CreateNewChatProps> = ({ setIsOpenModal, isOpen, selectChat }) => {


  const { getUsers, createChat } = useActions()
  const { users } = useTypedSelector(state => state.user);
  const { currentUser } = useTypedSelector(state => state.auth);
  const { chats } = useTypedSelector(state => state.chat);

  const [selecteduser, setSelectedUser] = useState(null)

  // const isContainInChat = (chat: ICaht) => {
  //   return (chat?.sender || chat.recipient) === currentUser?._id ? false || true
  // }

  const userList = _.filter(users, (elem: IUser) => elem?._id !== currentUser?._id)

  useEffect(() => {
    getUsers();
  }, [])

  const callback = (id: string) => {
    selectChat(id);
    setIsOpenModal(false);
  }

  const isContainInChat = () => {
    return _.find(chats, (elem: ICaht) => _.find(elem.users, ["_id", currentUser._id]) && _.find(elem.users, ["_id", selecteduser]))
  }

  const createNewChat = () => {
    const existChat = isContainInChat()
    if (existChat) {
      callback(existChat._id)
    } else {
      createChat({ sender: currentUser._id, recipient: selecteduser }, callback);
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpenModal={setIsOpenModal}>
      <UsersList users={userList} setSelectedUser={setSelectedUser} selecteduser={selecteduser} />
      <Button style={{ width: "100%" }} variant="contained" disabled={!selecteduser} onClick={createNewChat}>Create Chat</Button>
    </Modal>

  );
};

export default CreateNewChat;