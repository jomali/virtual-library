import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Zoom from '@material-ui/core/Zoom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import PropTypes from 'prop-types';

ClosableDialog.propTypes = {
  actions: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf(['primary', 'secondary']),
  dividers: PropTypes.bool,
  fullScreen: PropTypes.bool,
  fullWidth: PropTypes.bool,
  keepMounted: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  scroll: PropTypes.oneOf(['body', 'paper']),
  title: PropTypes.string,
  TransitionComponent: PropTypes.element,
  unclosable: PropTypes.bool,
};

const MIN_HEIGHT = 750;

const ZoomTransition = React.forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} {...props} />;
});

export default function ClosableDialog(props) {
  const {
    actions,
    children,
    className,
    color,
    onClose,
    TransitionComponent = ZoomTransition,
    ariaLabelClose = 'close',
    dividers = false,
    fullScreen = false,
    fullWidth = true,
    keepMounted = false,
    scroll = 'body',
    title = '',
    unclosable = false,
    ...otherProps
  } = props;

  const classes = useStyles();
  const theme = useTheme();
  const xsScreen = useMediaQuery(theme.breakpoints.down('xs'));

  const fullScreenDialog =
    fullScreen || xsScreen || window.screen.height <= MIN_HEIGHT;

  const CloseButton = (icon, right = false) => (
    <IconButton
      aria-label={ariaLabelClose}
      className={clsx({
        [classes.closeButton]: true,
        [classes.closeButtonLeft]: !right,
        [classes.closeButtonRight]: right,
        [classes.closeButtonPrimary]: color === 'primary',
        [classes.closeButtonSecondary]: color === 'secondary',
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
      fullScreen={fullScreenDialog}
      fullWidth={fullWidth}
      keepMounted={keepMounted}
      onBackdropClick={onClose}
      onClose={onClose}
      PaperProps={{
        className: classes.paper,
      }}
      scroll={scroll}
      TransitionComponent={TransitionComponent}
      {...otherProps}
    >
      {!!title || !unclosable ? (
        <DialogTitle
          className={clsx({
            [classes.title]: true,
            [classes.titlePrimary]: color === 'primary',
            [classes.titleSecondary]: color === 'secondary',
          })}
          disableTypography
        >
          {!unclosable && fullScreenDialog ? CloseButtonLeft() : null}
          {!!title ? <Typography variant="h6">{title}</Typography> : null}
          {!unclosable && !fullScreenDialog ? CloseButtonRight() : null}
        </DialogTitle>
      ) : null}
      <DialogContent
        className={clsx(classes.content, className)}
        dividers={dividers}
      >
        {children}
      </DialogContent>
      {actions ? (
        <DialogActions className={classes.footer}>{actions}</DialogActions>
      ) : null}
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  closeButton: {
    color: fade(theme.palette.text.primary, 0.5),
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
    marginLeft: 'auto',
    marginRight: -theme.spacing(1),
  },
  closeButtonSecondary: {
    color: fade(theme.palette.secondary.contrastText, 0.5),
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1),
    },
  },
  footer: {
    [theme.breakpoints.down('xs')]: {
      maxHeight: 48, // TODO - magic numbers
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
    },
  },
  paper: {
    [theme.breakpoints.down('xs')]: {
      display: 'inline-flex',
      flexDirection: 'column',
      minWidth: '100vw',
    },
  },
  title: {
    display: 'flex',
    margin: 0,
    maxHeight: 64, // TODO - magic numbers
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(1),
      paddingTop: theme.spacing(1),
    },
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
