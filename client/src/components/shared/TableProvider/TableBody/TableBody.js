import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import MuiTableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import useTable from '../useTable';

const TableBody = (props) => {
  const { loadingRowsNumber = 4, setRowProps = () => ({}) } = props;

  const table = useTable();

  const comparator = React.useCallback(
    (a, b) => a === table.selector(b),
    [table]
  );

  const visibleColumns = table.includedColumns.filter(
    (column) => column.options.display
  );

  return table.loading ? (
    <MuiTableBody>
      {Array.from({ length: loadingRowsNumber }).map((row, rowIndex) => (
        <TableRow key={`row-${rowIndex}`}>
          {visibleColumns.map((column, columnIndex) => (
            <TableCell key={`cell-${columnIndex}`}>
              <Skeleton />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </MuiTableBody>
  ) : (
    <MuiTableBody>
      {table.rows.map((row, rowIndex) => {
        // Determines if the current row is part of the table selection:
        const rowIsSelected = table.selected.find((element) =>
          comparator(element, row)
        );
        // Get additional row props:
        const rowProps = setRowProps(row, rowIndex, Boolean(rowIsSelected));
        const {
          className: rowClassName,
          disabled: rowDisabled,
          ...additionalRowProps
        } = rowProps;
        return (
          <TableRow
            hover={Boolean(table.selectable) && !rowDisabled}
            key={`page-${table.filter.page}-row-${rowIndex}`}
            selected={Boolean(rowIsSelected)}
            {...additionalRowProps}
          >
            {visibleColumns.map((column, columnIndex) => {
              // Get align and format options of the current column:
              const align = column.options.align || 'left';
              const formatter = column.options.format;
              // Get additional cell props:
              const setCellProps = column.options.setCellProps;
              const cellProps = Boolean(setCellProps)
                ? setCellProps(row[column.attribute])
                : {};
              const { className: cellClassName, ...additionalCellProps } =
                cellProps;

              return (
                <TableCell
                  align={align}
                  key={`cell-${columnIndex}`}
                  onClick={
                    rowDisabled ? undefined : () => table.handleClick(row)
                  }
                  {...additionalCellProps}
                >
                  {Boolean(formatter)
                    ? formatter(row[column.attribute])
                    : row[column.attribute]}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </MuiTableBody>
  );
};

TableBody.propTypes = {
  /**
   * The color of the component. It supports those theme colors that make sense
   * for this component.
   */
  color: PropTypes.oneOf(['default', 'primary', 'secondary']),
  /**
   * Determines the default number of rows which will display an animation
   * when loading.
   */
  loadingRowsNumber: PropTypes.number,
  /**
   * Set additional props of a given table row.
   * @param {Object} row - The current row to be processed
   * @param {Number} index - Index of the current row to be processed
   * @param {Boolean} selected - True if the current row is selected
   */
  setRowProps: PropTypes.func,
};

export default TableBody;
