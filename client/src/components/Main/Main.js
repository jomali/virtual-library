import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

export default function Main({ onNew }) {
  return (
    <React.Fragment>
      <AppBar elevation={0}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Videogames
          </Typography>
          <Button onClick={onNew}>Add new</Button>
        </Toolbar>
      </AppBar>
      <Offset />
      <Divider />
    </React.Fragment>
  );
}
