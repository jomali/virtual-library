import Checkbox from "@material-ui/core/Checkbox";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

export default function CustomTableHead(props) {
  const {
    ariaLabelSelectAll,
    color,
    columns,
    data,
    multiple,
    onChange,
    selected,
    size,
  } = props;

  const classes = useStyles();
  const numSelected = selected.length;
  const rowCount = data.length;

  // It's only called if 'onChange' is not null:
  const handleSelectAll = (event) => {
    const clear =
      !event.target.checked || (numSelected > 0 && numSelected < rowCount);
    onChange(clear ? [] : data.map((row) => row.id));
  };

  return (
    <TableHead>
      <TableRow>
        {multiple && onChange ? (
          <TableCell
            className={clsx({
              [classes.tableHeaderPrimaryColor]: color === "primary",
              [classes.tableHeaderSecondaryColor]: color === "secondary",
            })}
            padding="checkbox"
            size={size}
          >
            <Checkbox
              checked={rowCount > 0 && numSelected === rowCount}
              className={classes.checkboxHeader}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              inputProps={{ "aria-label": ariaLabelSelectAll }}
              onChange={handleSelectAll}
            />
          </TableCell>
        ) : null}
        {columns.map((column, index) => (
          <TableCell
            align={column.align ? column.align : "left"}
            className={clsx({
              [classes.tableCell]: true,
              [classes.tableHeaderCellLeft]:
                index === 0 && (!multiple || !onChange),
              [classes.tableHeaderCellRight]: index === columns.length - 1,
              [classes.tableHeaderPrimaryColor]: color === "primary",
              [classes.tableHeaderSecondaryColor]: color === "secondary",
            })}
            key={column.prop}
            size={size}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

CustomTableHead.propTypes = {
  ariaLabelSelectAll: PropTypes.string,
  color: PropTypes.oneOf(["default", "inherit", "primary", "secondary"]),
  columns: PropTypes.arrayOf(
    PropTypes.exact({
      align: PropTypes.oneOf(["center", "left", "right"]),
      format: PropTypes.func,
      label: PropTypes.string.isRequired,
      prop: PropTypes.string.isRequired,
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
  size: PropTypes.oneOf(["medium", "small"]),
};

CustomTableHead.defaultProps = {
  ariaLabelSelectAll: "select all rows",
  color: "default",
  columns: [],
  data: [],
  multiple: false,
};

const useStyles = makeStyles((theme) => ({
  tableCell: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
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
