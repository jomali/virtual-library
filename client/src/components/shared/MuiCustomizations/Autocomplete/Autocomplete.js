import React from 'react';
import MuiAutocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import TextField from '../TextField';

const StyledAutocomplete = styled(MuiAutocomplete, {
  shouldForwardProp: (prop) => prop !== 'readOnly' || prop !== 'withTags',
})(({ readOnly, theme, withTags }) => ({
  ...(readOnly && {
    '& .MuiInputBase-root': {
      paddingLeft: '0px !important',
      paddingRight: '0px !important',
    },
    '& .MuiAutocomplete-endAdornment': {
      display: 'none',
    },
    // variant: outlined
    '& .MuiOutlinedInput-root .MuiAutocomplete-input': {
      paddingLeft: 0,
    },
  }),
  ...(!withTags && {
    '& .MuiFilledInput-root': {
      paddingLeft: theme.spacing(1.5),
    },
    '& .MuiOutlinedInput-root': {
      paddingLeft: theme.spacing(1.5),
    },
  }),
}));

const Autocomplete = React.forwardRef((props, ref) => {
  const { helperText, label, readOnly, required, withTags, ...otherProps } =
    props;
  const [open, setOpen] = React.useState(false);

  return (
    <StyledAutocomplete
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      readOnly={readOnly}
      ref={ref}
      renderInput={(params) => (
        <TextField
          {...params}
          helperText={helperText}
          label={label}
          readOnly={readOnly}
          required={required}
        />
      )}
      renderTags={(value, getTagProps) =>
        value.map((option, index) =>
          withTags ? (
            <Chip
              variant="outlined"
              label={option}
              {...getTagProps({ index })}
            />
          ) : (
            <span
              onClick={() => {
                console.log('XXXX');
                setOpen(true);
              }}
            >
              {index > 0 ? ', ' : ''}
              {option}
            </span>
          )
        )
      }
      {...otherProps}
    />
  );
});

Autocomplete.propTypes = {
  ...MuiAutocomplete.propTypes,
  label: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  withTags: PropTypes.bool,
};

export default Autocomplete;
