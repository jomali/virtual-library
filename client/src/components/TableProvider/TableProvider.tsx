import React from "react";
import {
  MRT_ColumnDef,
  MRT_RowData,
  MRT_TableInstance,
  useMaterialReactTable,
  MRT_VisibilityState,
  MRT_ColumnOrderState,
  MRT_SortingState,
  MRT_PaginationState,
  MRT_RowSelectionState,
} from "material-react-table";
import { MRT_Localization_EN } from "material-react-table/locales/en";
import { MRT_Localization_ES } from "material-react-table/locales/es";
import { alpha, useTheme } from "@mui/material";
import { Filters } from "./types";
import { useIntl } from "react-intl";

export const TableContext = React.createContext<
  MRT_TableInstance<MRT_RowData> | undefined
>(undefined);

const TableProvider: React.FC<ITableProvider> = (props) => {
  const {
    children,
    columnOrder = [],
    columns,
    columnVisibility,
    enableColumnOrdering,
    enableSelect,
    enableSort,
    isLoading,
    onClick,
    onColumnOrderChange,
    onColumnVisibilityChange,
    onPaginationChange,
    onSelect,
    onSortingChange,
    pagination = { pageIndex: 0, pageSize: 0 },
    pinnedColumns,
    rows,
    rowSelection = {},
    sorting = [],
  } = props;

  const intl = useIntl();
  const theme = useTheme();

  const computedPinnedColumns = React.useMemo(() => {
    const result = pinnedColumns ?? [];
    if (enableSelect) {
      result.unshift("mrt-row-select");
    }
    return result;
  }, [pinnedColumns, enableSelect]);

  const localization = React.useMemo(
    () => (intl.locale === "en" ? MRT_Localization_EN : MRT_Localization_ES),
    [intl.locale]
  );

  const table = useMaterialReactTable({
    // Data
    columns,
    data: rows,
    // We need to initialize a dummy `rowCount`. The actual table count
    // is handled in __TablePagination__ component.
    rowCount: -1,

    // State
    initialState: {
      columnPinning: {
        left: computedPinnedColumns,
      },
    },
    state: {
      columnOrder,
      columnVisibility,
      isLoading,
      pagination,
      rowSelection,
      sorting,
    },

    // Callbacks
    onColumnOrderChange: onColumnOrderChange,
    onColumnVisibilityChange: onColumnVisibilityChange,
    onPaginationChange: onPaginationChange,
    onRowSelectionChange: onSelect,
    onSortingChange: onSortingChange,

    // Options
    enableColumnActions: false,
    enableColumnOrdering: Boolean(enableColumnOrdering),
    enableColumnPinning: false,
    enableDensityToggle: false,
    enableFilters: false,
    enableFullScreenToggle: false,
    enableMultiSort: false,
    enableRowSelection: Boolean(enableSelect),
    enableSorting: Boolean(enableSort),
    enableStickyHeader: true,
    localization: localization,
    manualPagination: true,
    manualSorting: Boolean(enableSort),
    positionToolbarAlertBanner: "none", // [bottom, top, none]

    // Styles
    mrtTheme: {
      baseBackgroundColor: alpha(theme.palette.background.default, 0),
    },
    muiTableBodyProps: {
      sx: (theme) => ({
        "& tr > td": {
          whiteSpace: "nowrap",
        },
        // use secondary color in checkbox. We don't set the color prop through
        // `muiSelectCheckboxProps` because it only affects the body checkboxes
        // and we still have to change the header style through
        // `muiTableHeadProps` in any case. So we use the same solution in the
        // body checkboxes
        " & .Mui-checked, & .MuiCheckbox-indeterminate": {
          color: `${theme.palette.secondary.main} !important`,
        },
        // " & tr > td": {
        //   backgroundColor: theme.palette.background.paper,
        // },
        '& tr:is([data-selected="true"]) > td::after': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
        '& tr:is([data-selected="true"]):hover > td::after': {
          backgroundColor: `color-mix(in oklab, ${alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity * 2
          )} 100%, ${theme.palette.action.hover} 100%)`,
        },
        '& tr:is([data-active="true"]) > td::after': {
          backgroundColor: alpha(
            theme.palette.secondary.main,
            theme.palette.action.selectedOpacity
          ),
          content: '""',
          height: "100%",
          left: 0,
          position: "absolute",
          top: 0,
          width: "100%",
        },
        '& tr:is([data-active="true"]):hover > td::after': {
          backgroundColor: `color-mix(in oklab, ${alpha(
            theme.palette.secondary.main,
            theme.palette.action.selectedOpacity * 2
          )} 100%, ${theme.palette.action.hover} 100%)`,
        },
        "& tr:hover > td::after": {
          backgroundColor: theme.palette.action.hover,
        },
      }),
    },
    muiTableBodyRowProps: ({ row, table }) => {
      const state = table.getState();
      const isActive = state.rowSelection.length;
      return {
        onClick: () => onClick?.(row.original),
        sx: {
          ...(onClick && { cursor: "pointer" }),
          " & .MuiTableCell-root.MuiTableCell-body": {
            whiteSpace: "nowrap",
          },
        },
        ...(isActive && { ["data-active"]: isActive }),
      };
    },
    muiTableContainerProps: {
      sx: {
        flexGrow: 1,
        maxHeight: "fit-content",
      },
    },
    muiTableHeadProps: {
      sx: (theme) => ({
        backgroundColor: theme.palette.background.paper,
        // use secondary color in checkbox
        " & .Mui-checked, & .MuiCheckbox-indeterminate": {
          color: `${theme.palette.secondary.main} !important`,
        },
        // column sort indication visible only on hover
        ' & .Mui-TableHeadCell-Content .MuiBadge-root.BaseBadge-root svg:not([data-testid="ArrowDownwardIcon"])':
          {
            opacity: 0,
            transition: `opacity ${theme.transitions.duration.complex * 0.001}s`,
          },
        " & .Mui-TableHeadCell-Content:hover .MuiBadge-root.BaseBadge-root svg":
          {
            opacity: 1,
          },
        // column actions visible only on hover
        " & .Mui-TableHeadCell-Content > .Mui-TableHeadCell-Content-Actions": {
          opacity: 0,
          transition: `opacity ${theme.transitions.duration.complex * 0.001}s`,
        },
        " & .Mui-TableHeadCell-Content:hover > .Mui-TableHeadCell-Content-Actions":
          {
            opacity: 1,
          },
      }),
    },
  });

  return (
    <TableContext.Provider value={table}>
      {children instanceof Function ? children(table) : children}
    </TableContext.Provider>
  );
};

export interface ITableProvider {
  /**
   * Used to offer user feedback when clicking on a table row.
   */
  activeRow?: unknown;
  /**
   * Table contents.
   */
  children:
    | React.ReactNode
    | ((table: MRT_TableInstance<MRT_RowData>) => React.ReactNode);
  /**
   * Table columns.
   */
  columns: MRT_ColumnDef<MRT_RowData, unknown>[];
  /**
   * Array specifying the order of `columns`.
   */
  columnOrder?: MRT_ColumnOrderState;
  /**
   * Object specifying the visibility of `columns`.
   */
  columnVisibility?: MRT_VisibilityState;
  /**
   * If `true`, allows the user to order columns using drag&drop.
   */
  enableColumnOrdering?: boolean;
  /**
   * If `true`, the user will be able to select multiple rows through a new
   * "select" column with checkboxes, pinned to the left side of the table.
   */
  enableSelect?: boolean;
  /**
   * If `true`, the user will be able to sort configured columns.
   */
  enableSort?: boolean;
  /**
   * Filters applied to the table.
   */
  filters?: unknown;
  /**
   * If `true`, the table is rendered in loading state.
   */
  isLoading?: boolean;
  /**
   * Callback triggered when the user clicks on a row.
   */
  onClick?: (row: MRT_RowData) => void;
  /**
   * Callback triggered when the user changes the order of any column.
   */
  onColumnOrderChange?: (updater: VoidFunction | object) => void;
  /**
   * Callback triggered when the user changes the visibility of any column.
   */
  onColumnVisibilityChange?: (updater: VoidFunction | object) => void;
  /**
   * Callback triggered when the user changes the applied filters.
   */
  onFiltersChange?: (newValue: Filters) => void;
  /**
   * Callback triggered when the user changes a pagination parameter: either
   * the current page index or the page size.
   */
  onPaginationChange?: (updater: VoidFunction | object) => void;
  /**
   * Callback triggered when the user changes the current selection.
   */
  onSelect?: (updater: VoidFunction | object) => void;
  /**
   * Callback triggered when the user changes the sort criteria of any column.
   */
  onSortingChange?: (updater: VoidFunction | object) => void;
  /**
   * Object specifying the current page index and page size.
   */
  pagination?: MRT_PaginationState;
  /**
   * Allows to pin a set of columns in the left side of the table, making them
   * "sticky" and fixed in position even if the user scrolls horizontally.
   */
  pinnedColumns?: string[];
  /**
   * Table data.
   */
  rows: MRT_RowData[];
  /**
   * Object specifying the selected rows.
   */
  rowSelection?: MRT_RowSelectionState;
  /**
   * Sorting criteria applied to the table.
   */
  sorting?: MRT_SortingState;
}

export default TableProvider;
