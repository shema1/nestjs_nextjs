


import React, { useMemo } from 'react';
import { IUser } from '../types/user';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import _ from "lodash";
import { ListItemButton } from '@mui/material';
import { useActions } from '../hooks/useAction';
interface UsrsListProps {
  users?: IUser[]
}


const UsersList: React.FC<UsrsListProps> = () => {

  const {  } = useActions()

  const users = [];

  const renderUsers = useMemo(() => {
    return _.map(users, (elem: IUser) => (
      <ListItem key={elem._id} alignItems="flex-start">
        <ListItemButton>
          <ListItemAvatar>
            <Avatar alt={elem.name} src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={elem.name}
          />
        </ListItemButton>
      </ListItem>
    ))
  }, [users])
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