import React from "react";
import {
  MRT_RowData,
  MRT_TableContainer,
  MRT_TableInstance,
} from "material-react-table";
import useMRTContext from "../useMRTContext";

const TableContents = () => {
  const table = useMRTContext();
  return <MRT_TableContainer table={table as MRT_TableInstance<MRT_RowData>} />;
};

export default TableContents;
