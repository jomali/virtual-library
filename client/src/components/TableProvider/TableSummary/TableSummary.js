import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import useTableState from '../useTableState';

const StyledTableSummary = styled('div')(({ theme }) => ({
  ...theme.mixins.toolbar,
  alignItems: 'center',
  display: 'flex',
  justifyContent: 'flex-end',
  margin: theme.spacing(0, 2),
}));

export default function TableSummary() {
  const tableState = useTableState();

  const page = tableState.controls.pagination.page + 1;

  return (
    <StyledTableSummary>
      <Typography gutterBottom variant="body2">{`${
        page * tableState.controls.pagination.rowsPerPage -
        tableState.controls.pagination.rowsPerPage +
        1
      } – ${page * tableState.count}`}</Typography>
    </StyledTableSummary>
  );
}

TableSummary.propTypes = {};
