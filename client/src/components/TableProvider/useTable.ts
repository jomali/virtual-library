import React from "react";
import { DEFAULT_ROWS_PER_PAGE_OPTIONS } from "./TablePagination";
import { MRT_ColumnOrderState } from "material-react-table";
import { Filters } from "./types";

type TableOptions = {
  defaultPageSize?: number;
  storageKey?: string;
};

const useTableState = (options?: TableOptions) => {
  const [activeRow, setActiveRow] = React.useState<unknown>();

  const [columnOrder, setColumnOrder] = React.useState<MRT_ColumnOrderState>(
    []
  );

  const [columnVisibility, setColumnVisibility] = React.useState({});

  const [filters, setFilters] = React.useState<Filters>({
    conjuction: "AND", // [AND/OR]
    values: [],
  });

  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: options?.defaultPageSize ?? DEFAULT_ROWS_PER_PAGE_OPTIONS[0],
  });

  const [rowSelection, setRowSelection] = React.useState({});

  const [searchString, setSearchString] = React.useState("");

  const [sorting, setSorting] = React.useState([]);

  const handleColumnOrderChange = (updater: unknown) => {
    setColumnOrder((previousColumnOrder) => {
      const newColumnOrder =
        updater instanceof Function ? updater(previousColumnOrder) : updater;

      return newColumnOrder;
    });
  };

  const handleColumnVisibilityChange = (updater: unknown) => {
    setColumnVisibility((previousColumnVisibility) => {
      const newColumnVisibility =
        updater instanceof Function
          ? updater(previousColumnVisibility)
          : updater;

      return newColumnVisibility;
    });
  };

  const handleFiltersChange = (newValue: Filters) => {
    setFilters(() => newValue);
  };

  const handlePaginationChange = (updater: unknown) => {
    setPagination((previousPagination) => {
      const newPagination =
        updater instanceof Function ? updater(previousPagination) : updater;

      // for simplicity, we do not allow to have selected rows between
      // different pages
      if (newPagination.pageIndex !== pagination.pageIndex) {
        setRowSelection(() => ({}));
      }

      return newPagination;
    });
  };

  const handleReset = () => {
    setActiveRow(undefined);
    setPagination((previousPagination) => ({
      ...previousPagination,
      pageIndex: 0,
    }));
    setRowSelection(() => ({}));
  };

  const handleSearch = (newValue: string) => {
    handleReset();
    setSearchString(() => newValue);
  };

  const handleSelect = (updater: unknown) => {
    setRowSelection((previousRowSelection) =>
      updater instanceof Function ? updater(previousRowSelection) : updater
    );
  };

  const handleSortingChange = (updater: unknown) => {
    setSorting((previousSorting) =>
      updater instanceof Function ? updater(previousSorting) : updater
    );
  };

  return {
    activeRow,
    columnOrder,
    columnVisibility,
    filters,
    onColumnOrderChange: handleColumnOrderChange,
    onColumnVisibilityChange: handleColumnVisibilityChange,
    onFiltersChange: handleFiltersChange,
    onPaginationChange: handlePaginationChange,
    onReset: handleReset,
    onSearch: handleSearch,
    onSelect: handleSelect,
    onSortingChange: handleSortingChange,
    pagination,
    rowSelection,
    searchString,
    setActiveRow,
    sorting,
  };
};

export default useTableState;
