import React from 'react';
import MuiTable from '@mui/material/Table';
import MuiTableContainer from '@mui/material/TableContainer';
import PropTypes from 'prop-types';
import TableBody from '../TableBody';
import TableHead from '../TableHead';

export default function TableContents({
  headProps = {},
  bodyProps = {},
  ...otherProps
}) {
  return (
    <MuiTableContainer sx={{ height: '100%' }}>
      <MuiTable stickyHeader>
        <TableHead {...headProps} {...otherProps} />
        <TableBody {...bodyProps} {...otherProps} />
      </MuiTable>
    </MuiTableContainer>
  );
}

TableContents.propTypes = {
  headProps: PropTypes.object,
  bodyProps: PropTypes.shape({
    /**
     * Determines if two given elements are equal.
     */
    comparator: PropTypes.func,
    /**
     * If `true` or `multiple`, the user can clic on table rows to select them:
     * - `true`: only one item can be selected any given time. When the user
     *    clics on a new item, the previous one is deselected.
     * - `multiple`: multiple items can be selected any given time. When the user
     *    clics on a new item, it is added to the selected array.
     */
    selectable: PropTypes.oneOf([false, true, 'multiple']),
  }),
  /**
   * Set additional props of a given table row.
   * @param {Object} row - The current row to be processed
   * @param {Number} index - Index of the current row to be processed
   * @param {Boolean} selected - True if the current row is selected
   */
  setRowProps: PropTypes.func,
};
