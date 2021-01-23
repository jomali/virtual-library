import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import clsx from 'clsx';
import PropTypes from 'prop-types';

TableHead.propTypes = {
  ariaLabelSelectAll: PropTypes.string,
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  columns: PropTypes.arrayOf(
    PropTypes.exact({
      align: PropTypes.oneOf(['center', 'left', 'right']),
      attribute: PropTypes.string.isRequired,
      format: PropTypes.func,
      label: PropTypes.string.isRequired,
      style: PropTypes.object,
      sum: PropTypes.bool,
    })
  ),
  data: PropTypes.array,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  selected: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  size: PropTypes.oneOf(['medium', 'small']),
};

export default function TableHead(props) {
  const {
    onChange,
    ariaLabelSelectAll = 'select all rows',
    color = 'default',
    columns = [],
    data = [],
    multiple = false,
    selected = [],
    size = 'medium',
  } = props;

  const classes = useStyles();
  const numRows = data.length;
  const numSelected = selected.length;

  // It's only called if 'onChange' is not null:
  const handleSelectAll = (event) => {
    const clear =
      !event.target.checked || (numSelected > 0 && numSelected < numRows);
    onChange(clear ? [] : data.map((row) => row.id));
  };

  return (
    <MuiTableHead>
      <TableRow>
        {multiple && onChange ? (
          // TODO - set checkbox color; top-left border
          <TableCell
            className={clsx({
              [classes.tableHeaderPrimaryColor]: color === 'primary',
              [classes.tableHeaderSecondaryColor]: color === 'secondary',
            })}
            padding="checkbox"
            size={size}
          >
            <Checkbox
              checked={numRows > 0 && numSelected === numRows}
              className={classes.checkboxHeader}
              indeterminate={numSelected > 0 && numSelected < numRows}
              inputProps={{ 'aria-label': ariaLabelSelectAll }}
              onChange={handleSelectAll}
            />
          </TableCell>
        ) : null}
        {columns.map((column, index) => (
          <TableCell
            align={column.align ? column.align : 'left'}
            className={clsx({
              [classes.tableCell]: true,
              [classes.tableHeaderCellLeft]:
                index === 0 && (!multiple || !onChange),
              [classes.tableHeaderCellRight]: index === columns.length - 1,
              [classes.tableHeaderPrimaryColor]: color === 'primary',
              [classes.tableHeaderSecondaryColor]: color === 'secondary',
            })}
            key={column.attribute}
            size={size}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  tableCell: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  tableHeaderCellLeft: {
    borderTopLeftRadius: theme.shape.borderRadius,
  },
  tableHeaderCellRight: {
    borderTopRightRadius: theme.shape.borderRadius,
  },
  tableHeaderPrimaryColor: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  tableHeaderSecondaryColor: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));
