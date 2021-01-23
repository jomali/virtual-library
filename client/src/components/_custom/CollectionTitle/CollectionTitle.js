import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

export default function CollectionTitle({ children }) {
  const classes = useStyles();
  return (
    <Typography className={classes.title} variant="subtitle1">
      {children}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: theme.typography.fontWeightBold,
  },
}));
