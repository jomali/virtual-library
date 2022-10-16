import * as React from 'react';
import MuiSnackbar from '@mui/material/Snackbar';

const Snackbar = React.forwardRef((props, ref) => {
  const { autoHideDuration = 6000, ...otherProps } = props;

  return (
    <MuiSnackbar autoHideDuration={autoHideDuration} ref={ref} {...otherProps}>
      <p>Lorem ipsum dolor.</p>
    </MuiSnackbar>
  );
});

export default Snackbar;
