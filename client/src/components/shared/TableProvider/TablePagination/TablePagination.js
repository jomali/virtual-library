import React from 'react';
import { styled } from '@mui/material/styles';
import MuiTablePagination from '@mui/material/TablePagination';
import PropTypes from 'prop-types';
import useTable from '../useTable';

const StyledTablePagination = styled(MuiTablePagination)(({ theme }) => ({
  ...theme.mixins.toolbar,
  display: 'flex',
  justifyContent: 'flex-end',
}));

const TablePagination = (props) => {
  const { rowsPerPageOptions = [50, 100, 250, 500] } = props;
  const table = useTable();

  return (
    <StyledTablePagination
      component="div"
      count={table.count}
      onPageChange={table.handleChangePage}
      onRowsPerPageChange={table.handleChangeRowsPerPage}
      page={table.filter.page}
      rowsPerPage={table.filter.rowsPerPage}
      rowsPerPageOptions={rowsPerPageOptions}
    />
  );
};

TablePagination.propTypes = {
  /**
   * Possible amounts of selectable rows per page.
   */
  rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
};

export default TablePagination;
