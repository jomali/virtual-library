import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Paper from "@mui/material/Paper";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AnimatePresence, motion } from "motion/react";
import { Box } from "@mui/material";

const SIDE_PANEL_WIDTH = 500; // px

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

const SideContent = styled(Paper)(() => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  overflow: "hidden",
}));

const MotionDiv = styled(motion.div)(() => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
}));

const variants = {
  collapsed: () => ({
    maxWidth: 0,
    width: 0,
    minWidth: 0,
  }),
  expanded: () => ({
    maxWidth: `${SIDE_PANEL_WIDTH}px`,
    minWidth: `${SIDE_PANEL_WIDTH}px`,
    width: `${SIDE_PANEL_WIDTH}px`,
  }),
};

const Collection: React.FC<CollectionProps> = (props) => {
  const { children, open = false, slotMenu, slotSide } = props;

  const wideScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const theme = useTheme();

  return (
    <Container>
      {slotMenu ? (
        <Box>{slotMenu instanceof Function ? slotMenu() : slotMenu}</Box>
      ) : null}
      <MainContent>{children}</MainContent>
      <AnimatePresence mode="wait">
        {wideScreen && open ? (
          <MotionDiv
            animate="expanded"
            exit="collapsed"
            initial="collapsed"
            layout
            transition={{
              type: "tween",
              duration: theme.transitions.duration.short / 1000,
            }}
            variants={variants}
          >
            <SideContent variant="outlined">
              {slotSide instanceof Function ? slotSide() : slotSide}
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
        {slotSide instanceof Function ? slotSide() : slotSide}
      </Dialog>
    </Container>
  );
};

export type CollectionProps = {
  children: React.ReactNode;
  open: boolean;
  slotMenu?: React.ReactNode | (() => React.ReactNode);
  slotSide: React.ReactNode | (() => React.ReactNode);
};

export default Collection;
