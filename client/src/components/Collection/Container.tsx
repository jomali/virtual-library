import React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  height: "100%",
}));

const Collection: React.FC<ICollection> = (props) => {
  const { children, open = false, sideContent } = props;

  return (
    <>
      <Container>{children}</Container>

      <Dialog
        aria-labelledby="detail-panel-dialog"
        fullScreen
        open={open}
        slotProps={{
          paper: { elevation: 0 },
        }}
      >
        {sideContent instanceof Function ? sideContent() : sideContent}
      </Dialog>
    </>
  );
};

export interface ICollection {
  children: React.ReactNode;
  open: boolean;
  sideContent: React.ReactNode | (() => React.ReactNode);
}

export default Collection;
