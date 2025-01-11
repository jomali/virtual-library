import React from "react";
import { useTheme } from "@mui/material/styles";
import MuiTablePagination from "@mui/material/TablePagination";
import useMRTContext from "../useMRTContext";

export const DEFAULT_ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

const TablePagination: React.FC<ITablePagination> = (props) => {
  const { count = -1, rowsPerPageOptions = DEFAULT_ROWS_PER_PAGE_OPTIONS } =
    props;
  const table = useMRTContext();
  const theme = useTheme();

  const state = table?.getState();

  return (
    <MuiTablePagination
      component="div"
      count={count}
      onPageChange={(_event, newPageIndex) =>
        table?.setPagination((previousPagination) => ({
          ...previousPagination,
          pageIndex: newPageIndex,
        }))
      }
      onRowsPerPageChange={(event) =>
        table?.setPagination((previousPagination) => ({
          ...previousPagination,
          pageIndex: 0,
          pageSize: parseInt(event.target.value, 10),
        }))
      }
      page={state?.pagination.pageIndex ?? 0}
      rowsPerPage={state?.pagination.pageSize ?? 0}
      rowsPerPageOptions={rowsPerPageOptions}
      sx={{
        ...theme.mixins.toolbar,
        alignContent: "center",
      }}
    />
  );
};

export interface ITablePagination {
  /**
   * The total number of rows. To enable server side pagination for an unknown
   * number of items, provide `-1`.
   */
  count: number;
  /**
   * Possible amonuts of selectable rows per page.
   */
  rowsPerPageOptions: number[];
}

export default TablePagination;
