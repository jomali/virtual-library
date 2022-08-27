import React from 'react';
import { styled } from '@mui/material/styles';
import MuiTablePagination from '@mui/material/TablePagination';
import PropTypes from 'prop-types';
import useTableState from '../useTableState';

const StyledTablePagination = styled(MuiTablePagination)(({ theme }) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  justifyContent: 'flex-end',
}));

export default function TablePagination({
  rowsPerPageOptions = [50, 100, 250, 500],
}) {
  const tableState = useTableState();

  return (
    <StyledTablePagination
      component="div"
      count={tableState.count}
      onPageChange={tableState.handleChangePage}
      onRowsPerPageChange={tableState.handleChangeRowsPerPage}
      page={tableState.filter.page}
      rowsPerPage={tableState.filter.rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
    />
  );
}

TablePagination.propTypes = {
  /**
   * Possible amounts of selectable rows per page.
   */
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
};
