import React from "react";
import { styled } from "@mui/material/styles";
import { TableContainerProps as MuiTableContainerProps } from "@mui/material/TableContainer";

const DefaultComponent = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  height: "100%",
  overflowY: "auto",
}));

export type TableContainerProps = MuiTableContainerProps & {
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component?: string | React.ReactNode;
};

const TableContainer: React.FC<TableContainerProps> = React.forwardRef(
  (props, ref) => {
    const { component: Component = DefaultComponent, ...otherProps } = props;

    return <Component ref={ref} {...otherProps} />;
  }
);

export default TableContainer;
