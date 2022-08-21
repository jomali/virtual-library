import React from 'react';
import MuiTextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

export default function TextField({
  color = 'primary',
  fullWidth = true,
  label,
  variant = 'outlined',
  ...otherProps
}) {
  return (
    <MuiTextField
      color={color}
      fullWidth={fullWidth}
      id={label.toLocaleLowerCase()}
      label={label}
      variant={variant}
      {...otherProps}
    />
  );
}

TextField.propTypes = {
  fullWidth: PropTypes.bool,
  label: PropTypes.string.isRequired,
};
