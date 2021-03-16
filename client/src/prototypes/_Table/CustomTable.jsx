import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import CustomTableBody from "./CustomTableBody";
import CustomTableHead from "./CustomTableHead";

export default function CustomTable(props) {
  const { ariaLabel, headerSize, size } = props;

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);
  const [rowsPerPageOptions] = React.useState([15, 30, 60, 120]);
  const [totals, setTotals] = React.useState({});

  React.useEffect(() => {
    setPage(0);
  }, [props.data]);

  React.useEffect(() => {
    // atributos sobre los que se debe calcular su valor total acumulado:
    const sumAttributes = props.columns
      .filter((column) => column.sum)
      .map((column) => column.prop);

    // valores iniciales del sumatorio:
    const initialValues = {};
    sumAttributes.forEach((attribute) => (initialValues[attribute] = 0));

    // cálculo del valor total acumulado:
    const sums = props.data
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .reduce((total, current) => {
        const result = {};
        sumAttributes.forEach(
          (attribute) =>
            (result[attribute] = total[attribute] + current[attribute])
        );
        return result;
      }, initialValues);

    setTotals(sums);
  }, [props.columns, props.data, page, rowsPerPage]);

  if (props.data.length === 0) {
    return (
      <Card>
        <CardContent
          className={clsx(classes.messageContainer, {
            [classes.messageContainerPrimaryColor]: props.color === "primary",
            [classes.messageContainerSecondaryColor]:
              props.color === "secondary",
          })}
        >
          <Typography
            className={clsx({
              [classes.messagePrimaryColor]: props.color === "primary",
              [classes.messageSecondaryColor]: props.color === "secondary",
            })}
          >
            {props.emptyMessage}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  const selected = Array.isArray(props.selected)
    ? props.selected
    : !!props.selected
    ? [props.selected]
    : [];

  return (
    <Paper>
      <TableContainer>
        <Table aria-label={ariaLabel} size={size}>
          {props.headerIsVisible ? (
            <CustomTableHead
              {...props}
              selected={selected}
              size={headerSize || size}
            />
          ) : null}
          <CustomTableBody
            {...props}
            page={page}
            rowsPerPage={rowsPerPage}
            selected={selected}
          />
        </Table>
      </TableContainer>
      <div className={classes.tableFooter}>
        {!!props.info ? (
          <div className={classes.tableFooterInfo}>{props.info(totals)}</div>
        ) : null}
        <TablePagination
          className={classes.tableFooterPagination}
          component="div"
          count={props.data.length}
          onChangePage={(event, newPage) => setPage(newPage)}
          onChangeRowsPerPage={(event) => {
            setRowsPerPage(+event.target.value);
            setPage(0);
          }}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </div>
    </Paper>
  );
}

CustomTable.propTypes = {
  ariaLabel: PropTypes.string,
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
  emptyMessage: PropTypes.string,
  headerIsVisible: PropTypes.bool,
  headerSize: PropTypes.oneOf(["medium", "small"]),
  hover: PropTypes.bool,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  selected: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  size: PropTypes.oneOf(["medium", "small"]),
};

CustomTable.defaultProps = {
  ariaLabel: "table",
  ariaLabelSelectAll: "select all rows",
  color: "default",
  columns: [],
  data: [],
  emptyMessage: "There are no values loaded in memory.",
  headerIsVisible: true,
  hover: true,
  multiple: false,
  size: "medium",
};

const useStyles = makeStyles((theme) => ({
  checkboxHeader: {
    color: `${theme.palette.secondary.contrastText} !important`,
  },
  messagePrimaryColor: {
    color: theme.palette.primary.contrastText,
  },
  messageSecondaryColor: {
    color: theme.palette.secondary.contrastText,
  },
  messageContainer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2),
    "&:last-child": {
      padding: theme.spacing(2),
    },
  },
  messageContainerPrimaryColor: {
    backgroundColor: theme.palette.primary.main,
  },
  messageContainerSecondaryColor: {
    backgroundColor: theme.palette.secondary.main,
  },
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
  tableFooter: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    overflow: "auto",
  },
  tableFooterInfo: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    margin: theme.spacing(1),
  },
  tableFooterPagination: {
    marginLeft: "auto",
    overflow: "initial",
  },
}));
