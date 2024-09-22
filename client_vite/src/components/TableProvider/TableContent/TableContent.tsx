import React from "react";
import MuiTable from "@mui/material/Table";
import MuiTableContainer from "@mui/material/TableContainer";
import TableBody from "../TableBody";
import TableHead from "../TableHead";

export type TableContentProps = {
  "aria-label": string;
  headProps?: object;
  bodyProps?: object;
  setRowProps?: VoidFunction;
};

const TableContent: React.FC<TableContentProps> = (props) => {
  const { ["aria-label"]: ariaLabel, headProps = {}, bodyProps = {} } = props;

  return (
    <MuiTableContainer sx={{ height: "100%" }}>
      <MuiTable aria-label={ariaLabel} stickyHeader>
        <TableHead {...headProps} />
        <TableBody {...bodyProps} />
      </MuiTable>
    </MuiTableContainer>
  );
};

export default TableContent;
