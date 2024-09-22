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
  children: React.ReactElement;
  columns: Column[];
  rows: object[];
};

export type TableProviderState = {
  columns: Column[];
  includedColumns: Column[];
  rows: object[];
};

export const TableContext = React.createContext<TableProviderState>({
  columns: [],
  includedColumns: [],
  rows: [],
});

const TableProvider: React.FC<TableProviderProps> = (props) => {
  const { children, columns, rows } = props;

  return (
    <TableContext.Provider
      value={{
        columns,
        includedColumns: columns,
        rows,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export default TableProvider;
