import React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import PropTypes from 'prop-types';

MainAppBar.propTypes = {
  title: PropTypes.string.isRequired,
};

export default function MainAppBar(props) {
  const { title } = props;
  const classes = useStyles();

  return (
    <MuiAppBar elevation={0} position="relative">
      <Toolbar className={classes.toolbar}>
        <IconButton
          aria-label="menu"
          className={classes.buttonMenu}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Typography color="textPrimary" variant="h6">
          {title}
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  buttonMenu: {
    display: 'none', // TODO
    marginRight: theme.spacing(2),
  },
  toolbar: {
    backgroundColor: theme.palette.background.default,
  },
}));
