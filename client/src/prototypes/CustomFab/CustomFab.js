import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';

export default function CustomFab(props) {
  const classes = useStyles();
  const theme = useTheme();

  const fabs = [
    {
      color: 'primary',
      className: classes.fab,
      icon: <AddIcon />,
      label: 'Add',
    },
    {
      color: 'secondary',
      className: classes.fab,
      icon: <EditIcon />,
      label: 'Edit',
    },
  ];

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  return (
    <>
      {fabs.map((fab, index) => (
        <Zoom
          key={`fab-${index}`}
          in={0 === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${0 === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab aria-label={fab.label} className={fab.className} color={fab.color}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));
