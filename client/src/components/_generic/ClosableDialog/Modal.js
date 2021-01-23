import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import clsx from 'clsx';
import PropTypes from 'prop-types';

Modal.propTypes = {
  actions: PropTypes.exact({
    left: PropTypes.any,
    right: PropTypes.any,
  }),
  ariaLabelClose: PropTypes.string,
  color: PropTypes.oneOf(['default', 'primary', 'secondary']),
  fullWidth: PropTypes.bool,
  maxWidth: PropTypes.oneOf(['lg', 'md', 'sm', 'xl', 'xs', false]),
  noDividers: PropTypes.bool,
  onClose: PropTypes.func,
  scroll: PropTypes.oneOf(['body', 'paper']),
  title: PropTypes.string.isRequired,
  unclosable: PropTypes.bool,
};

export default function Modal(props) {
  const {
    children,
    onClose,
    title,
    actions = {},
    ariaLabelClose = 'cerrar', // TODO - i18n
    color = 'default',
    maxWidth = 'sm',
    noDividers = false,
    noFullWidth = false,
    scroll = 'paper',
    unclosable = false,
    ...otherProps
  } = props;

  const classes = useStyles();

  const CloseButton = (closeButtonProps = {}) =>
    !!closeButtonProps.icon && !!onClose && !unclosable ? (
      <IconButton
        aria-label={ariaLabelClose}
        className={clsx({
          [classes.closeButton]: true,
          [classes.closeButtonLeft]: closeButtonProps.left,
          [classes.closeButtonRight]: !closeButtonProps.left,
          [classes.closeButtonPrimary]: color === 'primary',
          [classes.closeButtonSecondary]: color === 'secondary',
        })}
        onClick={onClose}
      >
        {closeButtonProps.icon}
      </IconButton>
    ) : null;

  return (
    <Dialog
      fullWidth={!noFullWidth}
      maxWidth={maxWidth}
      onClose={onClose}
      scroll={scroll}
      {...otherProps}
    >
      <DialogTitle
        className={clsx({
          [classes.title]: true,
          [classes.titlePrimary]: color === 'primary',
          [classes.titleSecondary]: color === 'secondary',
        })}
        disableTypography
      >
        <Typography variant="h6">{title}</Typography>
        <CloseButton icon={<CloseIcon />} left={false} />
      </DialogTitle>
      <DialogContent dividers={!noDividers}>{children}</DialogContent>
      {!!actions.left || !!actions.right ? (
        <DialogActions className={classes.footer}>
          {actions.left?.length > 0 ? (
            <Box display="flex" flexGrow={1} justifyContent="flex-start">
              {actions.left.map((item) => {
                const { label: buttonLabel, ...otherItemProps } = item;
                return <Button {...otherItemProps}>{buttonLabel}</Button>;
              })}
            </Box>
          ) : null}
          {actions.right?.length > 0 ? (
            <Box display="flex" flexGrow={1} justifyContent="flex-end">
              {actions.right.map((item) => {
                const { label: buttonLabel, ...otherItemProps } = item;
                return <Button {...otherItemProps}>{buttonLabel}</Button>;
              })}
            </Box>
          ) : null}
        </DialogActions>
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
    display: 'flex',
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
