import { TextField } from '@mui/material';
import React from 'react';
import { useInput } from '../../hooks/useInput';
import Modal from '../Modal';

interface UserInfoModalProps {
  setIsOpenModal: any,
  isOpen: boolean
}
const UserInfoModal: React.FC<UserInfoModalProps> = ({ setIsOpenModal, isOpen }) => {
  const email = useInput("")


  return (
    <Modal isOpen={isOpen} setIsOpenModal={setIsOpenModal}>
       <div>casdasdasda</div>
    </Modal>
  );
};

export default UserInfoModal;