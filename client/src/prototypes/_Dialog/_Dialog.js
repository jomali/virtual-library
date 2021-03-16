import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { fade, makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import CloseIcon from "@material-ui/icons/Close";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function _Dialog(props) {
  const {
    actions,
    ariaLabelClose = "close",
    children,
    className,
    closable = false,
    color,
    dividers = false,
    fullScreen = false,
    fullWidth = true,
    keepMounted = false,
    onClose,
    renderTitle,
    scroll = "paper",
    title = "",
    ...otherProps
  } = props;

  const xsScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const classes = useStyles();

  const getTitleClassName = () =>
    clsx({
      [classes.auxiliar]: true,
      [classes.titlePrimary]: color === "primary",
      [classes.titleSecondary]: color === "secondary",
    });

  const CloseButton = (icon, right = false) => (
    <IconButton
      aria-label={ariaLabelClose}
      className={clsx({
        [classes.closeButton]: true,
        [classes.closeButtonLeft]: !right,
        [classes.closeButtonRight]: right,
        [classes.closeButtonPrimary]: color === "primary",
        [classes.closeButtonSecondary]: color === "secondary",
      })}
      onClick={onClose}
    >
      {icon}
    </IconButton>
  );

  const CloseButtonLeft = () => CloseButton(<ArrowBackIcon />, false);
  const CloseButtonRight = () => CloseButton(<CloseIcon />, true);

  return (
    <Dialog
      fullScreen={fullScreen || xsScreen}
      fullWidth={fullWidth}
      keepMounted={keepMounted}
      onBackdropClick={onClose}
      scroll={scroll}
      TransitionComponent={Transition}
      {...otherProps}
    >
      {renderTitle ? (
        renderTitle({
          className: getTitleClassName(),
          title: title,
        })
      ) : (
        <DialogTitle className={getTitleClassName()} disableTypography>
          {closable && xsScreen ? CloseButtonLeft() : null}
          <Typography variant="h6">{title}</Typography>
          {closable && !xsScreen ? CloseButtonRight() : null}
        </DialogTitle>
      )}
      <DialogContent
        className={clsx(classes.content, className)}
        dividers={dividers}
      >
        {children}
      </DialogContent>
      {actions ? (
        <DialogActions className={classes.auxiliar}>{actions}</DialogActions>
      ) : null}
    </Dialog>
  );
}

_Dialog.propTypes = {
  actions: PropTypes.node,
  className: PropTypes.string,
  closable: PropTypes.bool,
  color: PropTypes.oneOf(["primary", "secondary"]),
  dividers: PropTypes.bool,
  fullScreen: PropTypes.bool,
  fullWidth: PropTypes.bool,
  keepMounted: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  renderTitle: PropTypes.func,
  scroll: PropTypes.oneOf(["body", "paper"]),
  title: PropTypes.string,
};

const useStyles = makeStyles((theme) => ({
  auxiliar: {
    display: "flex",
    margin: 0,
    maxHeight: 64,
    padding: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
    },
  },
  closeButton: {
    color: fade(theme.palette.text.primary, 0.7),
    top: -theme.spacing(1),
    marginBottom: -theme.spacing(2),
  },
  closeButtonLeft: {
    marginLeft: -theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  closeButtonPrimary: {
    color: fade(theme.palette.primary.contrastText, 0.5),
  },
  closeButtonRight: {
    marginLeft: "auto",
    marginRight: -theme.spacing(1),
  },
  closeButtonSecondary: {
    color: fade(theme.palette.secondary.contrastText, 0.5),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  titlePrimary: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  titleSecondary: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}));
