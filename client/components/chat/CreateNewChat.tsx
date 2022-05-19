import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Modal from '../Modal';
import UsersList from '../UsersList';


interface CreateNewChatProps {
  setIsOpenModal: any,
  isOpen: boolean,
  selectChat: any
}
const CreateNewChat: React.FC<CreateNewChatProps> = ({ setIsOpenModal, isOpen, selectChat }) => {


  const { getUsers, createChat } = useActions()
  const { users } = useTypedSelector(state => state.user);
  const { currentUser } = useTypedSelector(state => state.auth);

  const [selecteduser, setSelectedUser] = useState(null)

  useEffect(() => {
    getUsers()
  }, [])

  const callback = (id: string) => {
    selectChat(id)
    setIsOpenModal(false)
  }

  const createNewChat = () => {
    createChat({ sender: currentUser._id, recipient: selecteduser }, callback)
  }

  return (
    <Modal isOpen={isOpen} setIsOpenModal={setIsOpenModal}>
      <UsersList users={users} setSelectedUser={setSelectedUser} selecteduser={selecteduser} />
      <Button style={{ width: "100%" }} variant="contained" disabled={!selecteduser} onClick={createNewChat}>Create Chat</Button>
    </Modal>

  );
};

export default CreateNewChat;