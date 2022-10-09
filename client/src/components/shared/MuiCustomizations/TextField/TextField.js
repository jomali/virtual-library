import React from 'react';
import { styled } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

const StyledTextField = styled(MuiTextField, {
  shouldForwardProp: (prop) => prop !== 'readOnly',
})(({ readOnly, theme }) => ({
  ...(readOnly && {
    '& label.Mui-focused': {
      color: theme.palette.text.secondary,
      transform: `translate(0px, -9px) scale(0.75)`,
    },
    // variant: outlined
    '& .MuiOutlinedInput-root': {
      '& input': {
        padding: '16.5px 0',
      },
      '& fieldset': {
        borderWidth: 0,
      },
      '&.Mui-focused fieldset': {
        borderWidth: 0,
      },
    },
  }),
}));

export default function TextField(props) {
  const {
    color = 'primary',
    fullWidth = true,
    label,
    readOnly = true,
    variant = 'filled',
    ...otherProps
  } = props;

  return (
    <StyledTextField
      color={color}
      fullWidth={fullWidth}
      id={label.toLocaleLowerCase()}
      InputProps={{
        readOnly: readOnly,
      }}
      label={label}
      readOnly={readOnly}
      variant={readOnly ? 'outlined' : variant}
      {...otherProps}
    />
  );
}

TextField.propTypes = {
  ...MuiTextField.propTypes,
  readOnly: PropTypes.bool,
};
