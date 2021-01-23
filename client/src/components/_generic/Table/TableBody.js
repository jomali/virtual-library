import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { fade, makeStyles } from '@material-ui/core/styles';
import MuiTableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import PropTypes from 'prop-types';

TableBody.propTypes = {
  ariaLabelSelectOne: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      align: PropTypes.oneOf(['center', 'left', 'right']),
      attribute: PropTypes.string.isRequired,
      format: PropTypes.func,
      style: PropTypes.object,
    })
  ),
  data: PropTypes.array,
  hover: PropTypes.bool,
  multiple: PropTypes.bool,
  onClick: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selected: PropTypes.arrayOf(PropTypes.number),
};

export default function TableBody(props) {
  const {
    onClick,
    page,
    rowsPerPage,
    selected,
    ariaLabelSelectOne = 'select row',
    columns = [],
    data = [],
    hover = true,
    multiple = false,
  } = props;

  const classes = useStyles();

  return (
    <MuiTableBody>
      {data
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, i) => {
          const isSelected = selected.includes(row.id);
          return (
            <TableRow
              hover={hover}
              key={i}
              onClick={() => (onClick ? onClick(row) : null)}
              selected={isSelected}
              style={onClick ? { cursor: 'pointer' } : null}
            >
              {!!multiple && !!onClick ? (
                <TableCell
                  className={clsx({
                    [classes.tableCell]: true,
                    [classes.tableCellSelected]: isSelected,
                  })}
                  padding="checkbox"
                >
                  <Checkbox
                    checked={isSelected}
                    inputProps={{ 'aria-label': ariaLabelSelectOne }}
                  />
                </TableCell>
              ) : null}
              {columns.map((column, index) => {
                const value = row[column.attribute];
                return (
                  <TableCell
                    align={column.align || 'left'}
                    className={clsx({
                      [classes.tableCell]: true,
                      [classes.tableCellSelected]: isSelected,
                    })}
                    key={`${column.attribute}-${index}`}
                    style={column.style}
                  >
                    {column.format && value !== null
                      ? column.format(value)
                      : value}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
    </MuiTableBody>
  );
}

const useStyles = makeStyles((theme) => ({
  tableCell: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  tableCellSelected: {
    backgroundColor: fade(theme.palette.secondary.main, 0.1),
    borderBottom: 0,
    borderTop: `1px solid ${theme.palette.background.paper}`,
  },
}));
