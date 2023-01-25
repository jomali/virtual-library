import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import MuiTableCell from '@mui/material/TableCell';
import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';
import useTable from '../useTableState';

const StyledTableRow = styled(MuiTableRow, {
  shouldForwardProp: (prop) => prop !== 'topRadius',
})(({ theme, topRadius }) => ({
  ...(topRadius && {
    '& th:first-child': {
      borderTopLeftRadius: theme.shape.borderRadius,
    },
    '& th:last-child': {
      borderTopRightRadius: theme.shape.borderRadius,
    },
  }),
}));

export default function TableHead({
  color = 'default',
  setRowProps = () => ({}),
  topRadius,
}) {
  const tableState = useTable();

  const handleSelectAll = () => {
    if (tableState.state.selected.length === 0) {
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
      <StyledTableRow topRadius={topRadius}>
        {tableState.selectable === 'multiple' ? (
          <MuiTableCell padding="checkbox">
            <Checkbox
              checked={
                tableState.rows.filter(
                  (element, index) => !setRowProps(element, index).disabled
                ).length === tableState.state.selected.length &&
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
                ).length !== tableState.state.selected.length &&
                tableState.rows.filter(
                  (element, index) => !setRowProps(element, index).disabled
                ).length > 0 &&
                tableState.state.selected.length > 0
              }
              inputProps={{ 'aria-label': 'select all' }} // TODO - i18n
              onChange={handleSelectAll}
            />
          </MuiTableCell>
        ) : null}
        {tableState.includedColumns
          .filter((column) => column.options.display)
          .map((column, index) => (
            <MuiTableCell
              align={column.options.align || 'left'}
              key={index}
              padding={'normal'} // TODO
              sortDirection={false} // TODO
            >
              {column.options.displayLabel ? column.label : null}
            </MuiTableCell>
          ))}
      </StyledTableRow>
    </MuiTableHead>
  );
}
