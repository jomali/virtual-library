import React from 'react';
import Alert from '@mui/material/Alert';
import MuiSnackbar from '@mui/material/Snackbar';
import PropTypes from 'prop-types';

const Snackbar = React.forwardRef((props, ref) => {
  const {
    autoHideDuration = 6000,
    children,
    elevation = 6,
    severity,
    variant = 'standard',
    ...otherProps
  } = props;

  return (
    <MuiSnackbar autoHideDuration={autoHideDuration} ref={ref} {...otherProps}>
      <Alert elevation={elevation} severity={severity} variant={variant}>
        {children}
      </Alert>
    </MuiSnackbar>
  );
});

Snackbar.propTypes = {
  /**
   * The severity of the alert. This defines the color and icon used.
   */
  severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  /**
   * The variant to use.
   */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
};

export default Snackbar;
