import React from 'react';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { styled, useTheme } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { IconButton, Tooltip } from 'components/shared/MuiCustomizations';

const SIDE_PANEL_WIDTH = 450;

const Container = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  display: 'flex',
  flexGrow: 1,
  overflow: 'auto',
}));

const Panel = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ open, theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  maxWidth: SIDE_PANEL_WIDTH,
  minWidth: 0,
  transition: `${theme.transitions.create('min-width', {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  })}`,
  ...(open && {
    transition: `${theme.transitions.create('min-width', {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen,
    })}`,
    minWidth: SIDE_PANEL_WIDTH,
  }),
}));

export default function Collection({
  children,
  onClose,
  onOpenMenu,
  open,
  sideContent,
  title,
  ...otherProps
}) {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', height: ' 100%', overflow: 'hidden' }}>
      <Container open={open} sx={{ display: 'flex', flexDirection: 'column' }}>
        <AppBar elevation={0} position="static">
          <Toolbar>
            {/* <Tooltip title="Open menu">
              <IconButton
                aria-label="menu"
                color="inherit"
                edge="start"
                onClick={onOpenMenu}
                sx={{ mr: 2 }}
              >
                <MenuRoundedIcon />
              </IconButton>
            </Tooltip> */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>

            <Box
              sx={{
                right: (theme) => theme.spacing(3),
                position: 'absolute',
              }}
            >
              <Fade
                in={!open}
                timeout={theme.transitions.duration.leavingScreen}
              >
                <Tooltip title="Add new element">
                  <IconButton aria-label={'add-new-element'} edge="end">
                    <AddRoundedIcon />
                  </IconButton>
                </Tooltip>
              </Fade>
            </Box>
          </Toolbar>
        </AppBar>
        <Divider />
        {children}
      </Container>
      <div style={{ display: 'flex', height: ' 100%', overflow: 'hidden' }}>
        <Transition
          in={open}
          timeout={theme.transitions.duration.enteringScreen}
        >
          {(state) => (
            <>
              <Divider orientation="vertical" />
              <Panel elevation={0} open={open} square>
                {state === 'entered' ? (
                  sideContent({ onClose, ...otherProps })
                ) : (
                  <span />
                )}
              </Panel>
            </>
          )}
        </Transition>
      </div>
    </Box>
  );
}

Collection.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  sideContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};
