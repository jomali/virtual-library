import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import Table from 'components/_generic/Table';

Collection.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
  selected: PropTypes.any, // TODO - adjust
};

export default function Collection(props) {
  const { columns, data, onSelect, selected } = props;
  const classes = useStyles();

  return (
    <Paper className={clsx(classes.paperBody, classes.paperBorder)}>
      <Table
        className={classes.paperBorder}
        columns={columns}
        data={data}
        onClick={onSelect}
        selected={selected}
      />
    </Paper>
  );
}

const PAPER_RADIUS_MULTIPLIER = 3;

const useStyles = makeStyles((theme) => ({
  paperBody: {
    display: 'flex',
    flexGrow: 1,
  },
  paperBorder: {
    borderRadius: theme.shape.borderRadius * PAPER_RADIUS_MULTIPLIER,
    [theme.breakpoints.down('xs')]: {
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderTopLeftRadius: theme.shape.borderRadius * PAPER_RADIUS_MULTIPLIER,
      borderTopRightRadius: theme.shape.borderRadius * PAPER_RADIUS_MULTIPLIER,
    },
  },
}));
