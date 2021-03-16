import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import Zoom from "@material-ui/core/Zoom";
import ArrowBackRoundedIcon from "@material-ui/icons/ArrowBackRounded";
import CloseRoundedIcon from "@material-ui/icons/CloseRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import SaveRoundedIcon from "@material-ui/icons/SaveRounded";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  absolutePositioned: {
    position: "absolute",
  },
  button: {
    color: fade(theme.palette.text.primary, 0.7),
    top: -theme.spacing(1),
    marginBottom: -theme.spacing(2),
  },
  buttonPrimary: {
    color: fade(theme.palette.primary.contrastText, 0.5),
  },
  buttonSecondary: {
    color: fade(theme.palette.secondary.contrastText, 0.5),
  },
  containerLeft: {
    marginLeft: -theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  containerRight: {
    marginLeft: "auto",
    marginRight: -theme.spacing(1),
    position: "relative",
  },
}));

export default function CustomDialogTitle(props) {
  const {
    className,
    color,
    editMode,
    formId,
    onClose,
    onEdit,
    onRemove,
    onSave,
    title,
    ...otherProps
  } = props;

  const classes = useStyles();
  const theme = useTheme();
  const xsScreen = useMediaQuery(theme.breakpoints.down("xs"));

  const buttonClassName = clsx({
    [classes.button]: true,
    [classes.buttonPrimary]: color === "primary",
    [classes.buttonSecondary]: color === "secondary",
  });

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const renderLeftButtons = () => (
    <div className={classes.containerLeft}>
      {/* Cancel / Close */}
      {xsScreen ? (
        <IconButton className={buttonClassName} onClick={onClose}>
          <ArrowBackRoundedIcon />
        </IconButton>
      ) : null}
    </div>
  );

  const renderRightButtons = () => (
    <div className={classes.containerRight}>
      {/* Remove */}
      <Zoom
        in={editMode}
        style={{
          transitionDelay: `${!editMode ? 0 : transitionDuration.exit}ms`,
        }}
        timeout={transitionDuration}
      >
        <IconButton className={buttonClassName} onClick={() => onEdit(false)}>
          <DeleteRoundedIcon />
        </IconButton>
      </Zoom>
      {/* Save */}
      <Zoom
        in={editMode}
        style={{
          transitionDelay: `${!editMode ? 0 : transitionDuration.exit}ms`,
        }}
        timeout={transitionDuration}
      >
        <IconButton
          className={clsx(buttonClassName, classes.absolutePositioned)}
          form={formId}
          onClick={() => onEdit(false)}
          type="submit"
        >
          <SaveRoundedIcon />
        </IconButton>
      </Zoom>
      {/* Edit */}
      <Zoom
        in={!editMode}
        style={{
          transitionDelay: `${!editMode ? transitionDuration.exit : 0}ms`,
        }}
        timeout={transitionDuration}
      >
        <IconButton className={buttonClassName} onClick={() => onEdit(true)}>
          <EditRoundedIcon />
        </IconButton>
      </Zoom>
      {/* Cancel / Close */}
      {!xsScreen ? (
        <IconButton className={buttonClassName} onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      ) : null}
    </div>
  );

  return (
    <DialogTitle className={clsx(className)} disableTypography {...otherProps}>
      {renderLeftButtons()}
      <Typography variant="h6">{title}</Typography>
      {renderRightButtons()}
    </DialogTitle>
  );
}
