import React from "react";
import useTableState from "../useTableState";
import MuiTableRow from "@mui/material/TableRow";
import MuiTableBody from "@mui/material/TableBody";
import MuiTableCell from "@mui/material/TableCell";

const TableBody = () => {
  const tableState = useTableState();

  return (
    <MuiTableBody>
      {tableState.rows.map((row: any, rowIndex) => {
        return (
          <MuiTableRow
            key={`row-${rowIndex}`}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            {tableState.includedColumns.map((column, columnIndex) => {
              const align = "left";
              return (
                <MuiTableCell
                  key={`cell-${rowIndex}-${columnIndex}`}
                  align={align}
                  sx={{ whiteSpace: "nowrap" }}
                >
                  {row[column.attribute]}
                </MuiTableCell>
              );
            })}
          </MuiTableRow>
        );
      })}
    </MuiTableBody>
  );
};

export default TableBody;
