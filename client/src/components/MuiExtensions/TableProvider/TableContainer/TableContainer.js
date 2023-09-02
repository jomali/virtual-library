import React from "react";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";

const DefaultComponent = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  height: "100%",
  overflowY: "auto",
}));

const TableContainer = React.forwardRef((props, ref) => {
  const { component: Component = DefaultComponent, ...otherProps } = props;

  return <Component ref={ref} {...otherProps} />;
});

TableContainer.propTypes = {
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: PropTypes.elementType,
};

export default TableContainer;
