import React from "react";
import MuiToolbar from "@mui/material/Toolbar";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useIntl } from "react-intl";
import EditOffRoundedIcon from "@mui/icons-material/EditOffRounded";
import { styled } from "@mui/material/styles";
import Gap from "../Gap";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import { ConditionalTooltip } from "../MuiExtensions";
import { AnimatePresence, motion } from "motion/react";

const Container = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  bottom: 0,
  position: "sticky",
  zIndex: theme.zIndex.appBar - 1,
}));

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  bottom: 0,
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(1),
  "@media (min-width:0px)": {
    "@media (orientation: landscape)": {
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
  },
  [theme.breakpoints.up("sm")]: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
}));

const DetailFooter: React.FC<DetailFooterProps> = (props) => {
  const { editMode, onDelete, onToggleEditMode } = props;

  const intl = useIntl();
  const wideScreen = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const variants = React.useMemo(
    () => ({
      active: { opacity: 1 },
      enter: { opacity: 0 },
      exit: { opacity: 0 },
    }),
    []
  );

  return (
    <Container>
      <Divider />
      <Toolbar>
        <ConditionalTooltip title={editMode ? "Cancelar" : "Editar"}>
          <IconButton onClick={onToggleEditMode}>
            {editMode ? <EditOffRoundedIcon /> : <EditRoundedIcon />}
          </IconButton>
        </ConditionalTooltip>

        <AnimatePresence mode="wait">
          {editMode && !wideScreen ? (
            <motion.span
              key={`delete-icon-button`}
              animate="active"
              exit="exit"
              initial="enter"
              variants={variants}
            >
              <ConditionalTooltip title={intl.formatMessage({ id: "delete" })}>
                <IconButton color="error" onClick={onDelete}>
                  <DeleteRoundedIcon />
                </IconButton>
              </ConditionalTooltip>
            </motion.span>
          ) : null}
        </AnimatePresence>

        <Gap />

        <AnimatePresence mode="wait">
          {editMode && wideScreen ? (
            <motion.span
              key={`delete-button`}
              animate="active"
              exit="exit"
              initial="enter"
              variants={variants}
            >
              <Button
                color="error"
                onClick={onDelete}
                startIcon={<DeleteRoundedIcon />}
              >
                {intl.formatMessage({ id: "delete" })}
              </Button>
            </motion.span>
          ) : null}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {editMode ? (
            <motion.span
              key={`save-button`}
              animate="active"
              exit="exit"
              initial="enter"
              variants={variants}
            >
              <Button
                startIcon={<SaveRoundedIcon />}
                type="submit"
                variant="contained"
              >
                {intl.formatMessage({ id: "save" })}
              </Button>
            </motion.span>
          ) : null}
        </AnimatePresence>
      </Toolbar>
    </Container>
  );
};

export type DetailFooterProps = {
  editMode: boolean;
  onDelete: VoidFunction;
  onToggleEditMode: VoidFunction;
};

export default DetailFooter;
