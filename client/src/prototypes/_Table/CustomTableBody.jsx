import Checkbox from "@material-ui/core/Checkbox";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { fade, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

export default function CustomTableBody(props) {
  const {
    ariaLabelSelectOne,
    columns,
    data,
    hover,
    multiple,
    onChange,
    page,
    rowsPerPage,
    selected,
  } = props;

  const classes = useStyles();

  return (
    <TableBody>
      {data
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, i) => {
          const isSelected = selected.includes(row.id);
          return (
            <TableRow
              hover={hover}
              key={i}
              onClick={() => (onChange ? onChange(row) : null)}
              selected={isSelected}
              style={onChange ? { cursor: "pointer" } : null}
            >
              {!!multiple && !!onChange ? (
                <TableCell
                  className={clsx({
                    [classes.tableCell]: true,
                    [classes.tableCellSelected]: isSelected,
                  })}
                  padding="checkbox"
                >
                  <Checkbox
                    checked={isSelected}
                    inputProps={{ "aria-label": ariaLabelSelectOne }}
                  />
                </TableCell>
              ) : null}
              {columns.map((column, index) => {
                const value = row[column.prop];
                return (
                  <TableCell
                    align={column.align || "left"}
                    className={clsx({
                      [classes.tableCell]: true,
                      [classes.tableCellSelected]: isSelected,
                    })}
                    key={`${column.prop}-${index}`}
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
    </TableBody>
  );
}

CustomTableBody.propTypes = {
  ariaLabelSelectOne: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      align: PropTypes.oneOf(["center", "left", "right"]),
      format: PropTypes.func,
      prop: PropTypes.string.isRequired,
      style: PropTypes.object,
    })
  ),
  data: PropTypes.array,
  hover: PropTypes.bool,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  selected: PropTypes.arrayOf(PropTypes.number),
};

CustomTableBody.defaultProps = {
  ariaLabelSelectOne: "select row",
  columns: [],
  data: [],
  hover: true,
  multiple: false,
};

const useStyles = makeStyles((theme) => ({
  tableCell: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  tableCellSelected: {
    backgroundColor: fade(theme.palette.secondary.main, 0.1),
    borderBottom: 0,
    borderTop: `1px solid ${theme.palette.background.paper}`,
  },
}));
