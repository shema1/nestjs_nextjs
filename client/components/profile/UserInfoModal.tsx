import { Avatar, Badge, Button, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useActions } from '../../hooks/useAction';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import Modal from '../Modal';
import _ from "lodash";
import FileUpload from '../FileUpload';

interface UserInfoModalProps {
  setIsOpenModal: (isOpen: boolean) => void,
  isOpen: boolean,
  userId?: string
}
const UserInfoModal: React.FC<UserInfoModalProps> = ({ setIsOpenModal, isOpen, userId }) => {

  const { currentUser } = useTypedSelector(state => state.auth);

  const { users } = useTypedSelector(state => state.user);

  const { getUser, updateUser } = useActions()

  const [userInfo, setUserInfo] = useState(null);

  const [picture, setPicture] = useState(null)

  const id = userId ? userId : currentUser?._id

  const userById = _.find(users, ["_id", id])

  const onCancel = () => {
    setIsOpenModal(false)
  }

  const onSaveData = () => {
    const formData: FormData = new FormData()
    _.forEach(userInfo, (value, key) => {
      formData.append(key, value)
    })
    if (picture) {
      formData.append("avatar", picture)
    }
    updateUser(formData, onCancel)
  }

  useEffect(() => {
    id && getUser(id)
  }, [id])


  useEffect(() => {
    (userById && id) && setUserInfo(userById)
  }, [userById, id])


  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
  }

  return (
    <Modal isOpen={isOpen} setIsOpenModal={setIsOpenModal}>
      <div>
        <div style={{ height: 100 }}>
          <FileUpload setFile={setPicture} accept="image/*">
            <IconButton>
              <Avatar alt={userInfo?.name + ' ' + userInfo?.lastName} src={picture ? URL.createObjectURL(picture) : `http://localhost:5000/${userInfo?.avatar}`} sx={{ width: 80, height: 80, }} />
            </IconButton>
          </FileUpload>
        </div>
        <TextField
          style={{ marginTop: 10 }}
          name="email"
          label="Email"
          disabled
          value={userInfo?.email || ""}
        />
        <TextField
          style={{ marginTop: 10 }}
          label="Name"
          name="name"
          onChange={onChange}
          value={userInfo?.name || ""}
        />
        <TextField
          style={{ marginTop: 10 }}
          label="LastName"
          name="lastName"
          onChange={onChange}
          value={userInfo?.lastName || ""}
        />
        <div>
          <Button variant="contained" style={{ marginTop: 20 }} onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="contained" style={{ marginTop: 20 }} onClick={onSaveData}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default UserInfoModal;