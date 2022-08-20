import React from 'react';
import MuiTextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const TextField = (props) => {
  const { color = 'primary', fullWidth = true, label, ...otherProps } = props;

  return (
    <MuiTextField
      color={color}
      fullWidth={fullWidth}
      id={label.toLocaleLowerCase()}
      label={label}
      {...otherProps}
    />
  );
};

TextField.propTypes = {
  fullWidth: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

export default TextField;
