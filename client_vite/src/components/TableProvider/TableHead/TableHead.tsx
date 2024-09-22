import React from "react";
import MuiTableCell from "@mui/material/TableCell";
import MuiTableHead from "@mui/material/TableHead";
import MuiTableRow from "@mui/material/TableRow";
import useTableState from "../useTableState";

const TableHead = () => {
  const tableState = useTableState();

  return (
    <MuiTableHead>
      <MuiTableRow>
        {tableState.includedColumns.map((column) => (
          <MuiTableCell
            key={`header-cell-${column.attribute}`}
            align="left"
            padding="normal"
            sx={{ whiteSpace: "nowrap" }}
          >
            {column.label}
          </MuiTableCell>
        ))}
      </MuiTableRow>
    </MuiTableHead>
  );
};

export default TableHead;
