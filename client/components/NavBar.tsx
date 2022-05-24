import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PersonIcon from '@mui/icons-material/Person';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useRouter } from "next/router";
import { Button } from '@mui/material';
import { useActions } from '../hooks/useAction';
import UserInfoModal from './profile/UserInfoModal';


const menuItems = [
  { text: 'Home', href: '/' },
  { text: 'Track list', href: '/tracks' },
  { text: 'Albums list', href: '/albums' },
  { text: 'Chat', href: '/chat' },
  { text: 'Users', href: '/users' }
]

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [isOpenProfileModal, setIsOpenProfileModal] = useState(false);

  const router = useRouter()
  const { logout } = useActions()

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const onLogout = () => {
    logout()
    router.push({
      pathname: '/login'
    })
  }

  const openProfileInfo = () => {
    setIsOpenProfileModal(true)
  }

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
          <div style={{ marginLeft: "auto", display: 'flex', alignContent: "center" }}>
            <IconButton onClick={openProfileInfo}>
              <PersonIcon />
            </IconButton>
            <Button style={{ color: "#fff" }} onClick={onLogout}>
              Log out
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          {menuItems.map(({ text, href }, index) => (
            <ListItem button key={href} onClick={() => router.push(href)}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      {isOpenProfileModal && <UserInfoModal isOpen={isOpenProfileModal} setIsOpenModal={setIsOpenProfileModal} />}
    </div>
  );
}
