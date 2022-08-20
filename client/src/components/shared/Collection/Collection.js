import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';

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
  overflow: 'auto',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: 0,
  ...(open && {
    minWidth: SIDE_PANEL_WIDTH,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    width: SIDE_PANEL_WIDTH,
  }),
}));

const Collection = (props) => {
  const { children, onClose, open, sideContent, ...otherProps } = props;

  return (
    <Box sx={{ display: 'flex', height: ' 100%', overflow: 'hidden' }}>
      <Container open={open}>{children}</Container>
      <Panel elevation={3} open={open} square>
        {sideContent({ onClose, ...otherProps })}
      </Panel>
    </Box>
  );
};

Collection.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  sideContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export default Collection;
