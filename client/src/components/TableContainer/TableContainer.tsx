import React from "react";
import { styled } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

const StyledPaper = styled(Paper)(() => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  overflow: "hidden",
  transition: "width 0.5 easing",
}));

const TableContainer: React.FC<TableContainerProps> = (props) => {
  const { children } = props;
  const wideScreen = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return wideScreen ? (
    <StyledPaper variant="outlined">{children}</StyledPaper>
  ) : (
    <>
      <Divider />
      {children}
    </>
  );
};

export type TableContainerProps = {
  children: React.ReactNode;
};

export default TableContainer;
