import React from 'react';
import TableCell from '@mui/material/TableCell';
import MuiTableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import useTable from '../useTable';

const TableHead = (props) => {
  const { color = 'default', setRowProps = () => ({}) } = props;

  const table = useTable();

  return (
    <MuiTableHead>
      <TableRow>
        {table.includedColumns
          .filter((column) => column.options.display)
          .map((column, index) => (
            <TableCell
              align={column.options.align || 'left'}
              key={index}
              padding={'normal'} // TODO
              sortDirection={false} // TODO
            >
              {Boolean(column.options.displayLabel) ? column.label : null}
            </TableCell>
          ))}
      </TableRow>
    </MuiTableHead>
  );
};

export default TableHead;
