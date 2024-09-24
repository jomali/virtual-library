import React from "react";

type ColumnOptions = {
  align?: "center" | "left" | "right";
  display?: boolean | "excluded";
  displayLabel?: boolean;
  format?: VoidFunction;
  setCellProps?: VoidFunction;
};

export type Column = {
  attribute: string;
  label?: string;
  options?: ColumnOptions;
};

export type TableProviderProps = {
  /**
   * Table contents.
   */
  children: React.ReactElement;
  /**
   * Table columns.
   */
  columns: Column[];
  /**
   * Callback triggered when the user clicks on a table row.
   * @param value - the row data
   */
  onClick?: (value: unknown) => void;
  /**
   * Callback triggered when the user selects/deselects some table rows.
   * @param value - new selected items
   * @returns
   */
  onSelect?: (value: unknown) => void;
  /**
   * Table data.
   */
  rows: object[];
  /**
   * If `true` or `multiple`, the user can click on table rows to select them:
   * -  `true`: only one item can be selected any given time. When the user
   *    clicks on a new item, the previous one is deselected.
   * -  `multiple`: multiple items can be selected any given time. When the
   *    user clicks on a new item, it is added to the selected array.
   */
  selectable?: boolean | "multiple";
  /**
   * Array with references of all the elements currently selected in the
   * table.
   */
  selected?: object[];
};

export type TableProviderState = {
  columns: Column[];
  includedColumns: Column[];
  onClick: (value: unknown) => void;
  onSelect: (value: unknown) => void;
  rows: object[];
  selectable: boolean | "multiple";
};

export const TableContext = React.createContext<TableProviderState>({
  columns: [],
  includedColumns: [],
  onClick: () => null,
  onSelect: () => null,
  rows: [],
  selectable: false,
});

const TableProvider: React.FC<TableProviderProps> = (props) => {
  const {
    children,
    columns,
    onClick,
    onSelect,
    rows,
    selectable = false,
    selected = [],
  } = props;

  const handleSelect = (value: unknown) => {
    onSelect?.(value);
  };

  const handleClick = (value: unknown) => {
    if (selectable) {
      onClick?.(value);
      if (selectable !== "multiple") {
        onSelect?.(
          selected.find((element) => element === value) ? [] : [value]
        );
      }
    }
  };

  return (
    <TableContext.Provider
      value={{
        columns,
        includedColumns: columns,
        onClick: handleClick,
        onSelect: handleSelect,
        rows,
        selectable,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
