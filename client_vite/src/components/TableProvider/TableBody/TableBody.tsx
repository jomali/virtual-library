import React from "react";
import useTableState from "../useTableState";
import MuiTableRow, { TableRowProps } from "@mui/material/TableRow";
import MuiTableBody from "@mui/material/TableBody";
import MuiTableCell from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";

const SelectableTableRow = styled(MuiTableRow)(
  ({ hover }: Partial<TableRowProps>) => ({
    ...(hover && {
      cursor: "pointer",
    }),
  })
);

const TableBody = () => {
  const tableState = useTableState();

  return (
    <MuiTableBody>
      {tableState.rows.map((row: any, rowIndex) => {
        return (
          <SelectableTableRow
            key={`row-${rowIndex}`}
            hover={Boolean(tableState.selectable)}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            {tableState.includedColumns.map((column, columnIndex) => {
              const align = "left";
              return (
                <MuiTableCell
                  key={`cell-${rowIndex}-${columnIndex}`}
                  align={align}
                  onClick={() => tableState.onClick(row)}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {row[column.attribute]}
                </MuiTableCell>
              );
            })}
          </SelectableTableRow>
        );
      })}
    </MuiTableBody>
  );
};

export default TableBody;
