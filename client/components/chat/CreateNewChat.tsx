import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import UsersList from '../UsersList';
import _ from "lodash"
import { IUser } from '../../types/user';
import { ICaht } from '../../types/chat';
import { useDispatch, useSelector } from 'react-redux';
import { chatActionCreators, userActionCreators } from '../../store/actions-creators';
import { authSelector, chatSelector, userSelector } from '../../store/selectors';

interface CreateNewChatProps {
  setIsOpenModal: any,
  isOpen: boolean,
  selectChat: any
}
const CreateNewChat: React.FC<CreateNewChatProps> = ({ setIsOpenModal, isOpen, selectChat }) => {

  const dispatch = useDispatch();

  const getUsers = () => dispatch(userActionCreators.getUsers());
  const createChat = (params: any, callback: any) => dispatch(chatActionCreators.createChat(params, callback));

  const users = useSelector(userSelector.getUsersList);
  const currentUser = useSelector(authSelector.getUser);
  const chats = useSelector(chatSelector.getChatsList);

  const [selecteduser, setSelectedUser] = useState(null)

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