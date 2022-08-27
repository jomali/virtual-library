import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import MuiTableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useTable from '../useTableState';

export default function TableHead({
  color = 'default',
  setRowProps = () => ({}),
}) {
  const tableState = useTable();

  const handleSelectAll = () => {
    if (tableState.selected.length === 0) {
      const updatedValues = tableState.rows
        .filter((element, index) => {
          const disabledRow = setRowProps(element, index).disabled;
          return !disabledRow;
        })
        .map((element) => tableState.selector(element));
      tableState.onSelect(updatedValues);
    } else {
      tableState.onSelect([]);
    }
  };

  return (
    <MuiTableHead>
      <TableRow>
        {tableState.selectable === 'multiple' ? (
          <TableCell padding="checkbox">
            <Checkbox
              checked={
                tableState.rows.filter(
                  (element, index) => !setRowProps(element, index).disabled
                ).length === tableState.selected.length &&
                tableState.rows.filter(
                  (element, index) => !setRowProps(element, index).disabled
                ).length > 0
              }
              color="primary" // TODO - variable color
              disabled={
                !tableState.rows.filter(
                  (element, index) => !setRowProps(element, index).disabled
                ).length
              }
              indeterminate={
                tableState.rows.filter(
                  (element, index) => !setRowProps(element, index).disabled
                ).length !== tableState.selected.length &&
                tableState.rows.filter(
                  (element, index) => !setRowProps(element, index).disabled
                ).length > 0 &&
                tableState.selected.length > 0
              }
              inputProps={{ 'aria-label': 'select all' }} // TODO - i18n
              onChange={handleSelectAll}
            />
          </TableCell>
        ) : null}
        {tableState.includedColumns
          .filter((column) => column.options.display)
          .map((column, index) => (
            <TableCell
              align={column.options.align || 'left'}
              key={index}
              padding={'normal'} // TODO
              sortDirection={false} // TODO
            >
              {column.options.displayLabel ? column.label : null}
            </TableCell>
          ))}
      </TableRow>
    </MuiTableHead>
  );
}
