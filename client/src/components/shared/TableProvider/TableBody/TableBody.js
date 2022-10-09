import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';
import MuiTableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
import useTableState from '../useTableState';

const SelectableTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== 'selectable',
})(({ selectable, theme }) => ({
  ...(selectable && {
    cursor: 'pointer',
  }),
}));

export default function TableBody({
  color = 'default', // TODO - use color
  loadingRowsNumber = 4,
  setRowProps = () => ({}),
}) {
  const tableState = useTableState();
  const [lastClickedRowIndex, setLastClickedRowIndex] = React.useState();

  const comparator = React.useCallback(
    (a, b) => a === tableState.selector(b),
    [tableState]
  );

  const handleSelect = (event, row, rowIndex) => {
    if (tableState.selectable) {
      let selectedRows = [...tableState.state.selected];
      let selectingSubset = [tableState.selector(row)];

      const isUnselecting = Boolean(
        selectedRows.find((element) => element === tableState.selector(row))
      );

      if (tableState.selectable === 'multiple') {
        const shiftKey =
          event && event.nativeEvent ? event.nativeEvent.shiftKey : false;

        if (shiftKey && lastClickedRowIndex !== null) {
          const minIndex = Math.min(lastClickedRowIndex, rowIndex);
          const maxIndex = Math.max(lastClickedRowIndex, rowIndex);
          selectingSubset = tableState.rows
            .map((element, index) =>
              index >= minIndex && index <= maxIndex
                ? tableState.selector(element)
                : null
            )
            .filter((element) => Boolean(element));
        }
      }

      if (isUnselecting) {
        selectedRows = selectedRows.reduce((previousValue, currentValue) => {
          if (!selectingSubset.find((element) => element === currentValue)) {
            previousValue.push(currentValue);
          }
          return previousValue;
        }, []);
      } else {
        const filteredSelectingSubset = selectingSubset.reduce(
          (previousValue, currentValue) => {
            if (selectedRows.find((element) => element === currentValue)) {
              return previousValue;
            } else {
              previousValue.push(currentValue);
              return previousValue;
            }
          },
          []
        );
        selectedRows.push(...filteredSelectingSubset);
      }

      setLastClickedRowIndex(rowIndex);
      return tableState.onSelect(selectedRows);
    }
  };

  return tableState.loading ? (
    <MuiTableBody>
      {Array.from({ length: loadingRowsNumber }).map((row, rowIndex) => (
        <TableRow key={`row-${rowIndex}`}>
          {tableState.selectable === 'multiple' ? (
            <TableCell>
              <Skeleton />
            </TableCell>
          ) : null}
          {tableState.includedColumns
            .filter((column) => column.options.display)
            .map((column, columnIndex) => (
              <TableCell key={`cell-${columnIndex}`}>
                <Skeleton />
              </TableCell>
            ))}
        </TableRow>
      ))}
    </MuiTableBody>
  ) : (
    <MuiTableBody>
      {tableState.rows.map((row, rowIndex) => {
        // Determines if the current row is part of the tableState selection:
        const rowIsSelected = tableState.state.selected.find((element) =>
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
          <SelectableTableRow
            hover={Boolean(tableState.selectable) && !rowDisabled}
            key={`page-${tableState.controls.pagination.page}-row-${rowIndex}`}
            selectable={Boolean(tableState.selectable)}
            selected={Boolean(rowIsSelected)}
            {...additionalRowProps}
          >
            {tableState.selectable === 'multiple' ? (
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary" // TODO - variable color
                  checked={Boolean(rowIsSelected)}
                  inputProps={{
                    'aria-labelledby': `row-checkbox-${rowIndex}`,
                  }}
                  onChange={(event) => handleSelect(event, row, rowIndex)}
                />
              </TableCell>
            ) : null}
            {tableState.includedColumns
              .filter((column) => column.options.display)
              .map((column, columnIndex) => {
                // Get align and format options of the current column:
                const align = column.options.align || 'left';
                const formatter = column.options.format;
                // Get additional cell props:
                const setCellProps = column.options.setCellProps;
                const cellProps = setCellProps
                  ? setCellProps(row[column.attribute])
                  : {};
                const { className: cellClassName, ...additionalCellProps } =
                  cellProps;

                return (
                  <TableCell
                    align={align}
                    key={`cell-${columnIndex}`}
                    onClick={
                      rowDisabled ? undefined : () => tableState.onClick(row)
                    }
                    {...additionalCellProps}
                  >
                    {formatter
                      ? formatter(row[column.attribute])
                      : row[column.attribute]}
                  </TableCell>
                );
              })}
          </SelectableTableRow>
        );
      })}
    </MuiTableBody>
  );
}

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
