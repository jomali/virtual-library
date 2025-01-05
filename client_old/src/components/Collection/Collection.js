import React from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import PropTypes from "prop-types";
import { Transition } from "react-transition-group";

const SIDE_PANEL_WIDTH = { xs: 0, sm: 0, md: 450, lg: 500, xl: 550 };

const Container = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  overflow: "auto",
  width: "100%",
}));

const Panel = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ open, theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  maxWidth: SIDE_PANEL_WIDTH.xs,
  minWidth: 0,
  transition: `${theme.transitions.create("min-width", {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  })}`,
  [theme.breakpoints.up("sm")]: {
    maxWidth: SIDE_PANEL_WIDTH.sm,
  },
  [theme.breakpoints.up("md")]: {
    maxWidth: SIDE_PANEL_WIDTH.md,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: SIDE_PANEL_WIDTH.lg,
  },
  [theme.breakpoints.up("xl")]: {
    maxWidth: SIDE_PANEL_WIDTH.xl,
  },
  ...(open && {
    transition: `${theme.transitions.create("min-width", {
      easing: theme.transitions.easing.easeIn,
      duration: theme.transitions.duration.enteringScreen,
    })}`,
    minWidth: SIDE_PANEL_WIDTH.xs,
    [theme.breakpoints.up("sm")]: {
      minWidth: SIDE_PANEL_WIDTH.sm,
    },
    [theme.breakpoints.up("md")]: {
      minWidth: SIDE_PANEL_WIDTH.md,
    },
    [theme.breakpoints.up("lg")]: {
      minWidth: SIDE_PANEL_WIDTH.lg,
    },
    [theme.breakpoints.up("xl")]: {
      minWidth: SIDE_PANEL_WIDTH.xl,
    },
  }),
}));

export default function Collection({
  children,
  onClose,
  open,
  sideContent,
  ...otherProps
}) {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <>
      <Box sx={{ display: "flex", height: " 100%", overflow: "hidden" }}>
        <Container open={open}>{children}</Container>
        <Panel open={open}>
          <Transition
            in={open}
            timeout={theme.transitions.duration.enteringScreen}
          >
            {(state) => (
              <>
                <Divider orientation="vertical" />
                <Box
                  sx={{
                    backgroundColor: (theme) => theme.palette.background.paper,
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                    overflow: "auto",
                  }}
                >
                  {state === "entered" ? (
                    sideContent({ onClose, ...otherProps })
                  ) : (
                    <span />
                  )}
                </Box>
              </>
            )}
          </Transition>
        </Panel>
      </Box>

      <Dialog
        aria-labelledby="side-panel-dialog"
        fullScreen
        onClose={onClose}
        open={open && smScreen}
        PaperProps={{ elevation: 0 }}
      >
        {sideContent({ onClose, ...otherProps })}
      </Dialog>
    </>
  );
}

Collection.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  sideContent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};
