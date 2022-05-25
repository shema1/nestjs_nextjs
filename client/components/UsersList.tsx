


import React, { useMemo } from 'react';
import { IUser } from '../types/user';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import _ from "lodash";
import { ListItemButton } from '@mui/material';

interface UsrsListProps {
  users?: IUser[],
  setSelectedUser?: (id: string) => void,
  selecteduser?: string
}


const UsersList: React.FC<UsrsListProps> = ({ users, setSelectedUser, selecteduser }) => {

  const onSelectUser = (id: string) => {
    setSelectedUser(id)
  }

  const renderUsers = useMemo(() => {
    return _.map(users, (elem: IUser) => (
      <ListItemButton key={elem._id} alignItems="flex-start" style={{ backgroundColor: selecteduser === elem._id ? "#0000ff26" : "#fff" }} onClick={() => onSelectUser(elem._id)}>
        <ListItemAvatar>
          <Avatar alt={elem.name} src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary={elem.name}
        />
      </ListItemButton>
    ))
  }, [users, selecteduser])

  return (
    <div>
      <h2>User List</h2>
      <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
        {renderUsers}
      </List>
    </div>
  );
};

export default UsersList;