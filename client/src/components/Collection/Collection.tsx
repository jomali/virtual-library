import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AnimatePresence, motion } from "motion/react";

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  gap: theme.spacing(2),
  height: "100%",
  padding: theme.spacing(2),
}));

const MainContent = styled("main")(() => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  overflow: "hidden",
}));

const MotionDiv = styled(motion.div)(() => ({
  display: "flex",
}));

const SideContent = styled(Paper)(() => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  overflow: "hidden",
  width: "500px",
}));

const Collection: React.FC<CollectionProps> = (props) => {
  const { children, open = false, sideContent } = props;

  const wideScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const theme = useTheme();

  return (
    <Container>
      <MainContent>{children}</MainContent>
      <AnimatePresence mode="wait">
        {wideScreen && open ? (
          <MotionDiv
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{
              type: "tween",
              duration: theme.transitions.duration.short / 1000,
            }}
          >
            <SideContent variant="outlined">
              {sideContent instanceof Function ? sideContent() : sideContent}
            </SideContent>
          </MotionDiv>
        ) : null}
      </AnimatePresence>

      <Dialog
        aria-labelledby="detail-panel-dialog"
        fullScreen
        open={open && !wideScreen}
        slotProps={{
          paper: { elevation: 0 },
        }}
      >
        {sideContent instanceof Function ? sideContent() : sideContent}
      </Dialog>
    </Container>
  );
};

export type CollectionProps = {
  children: React.ReactNode;
  open: boolean;
  sideContent: React.ReactNode | (() => React.ReactNode);
};

export default Collection;
