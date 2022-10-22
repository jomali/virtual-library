import React from 'react';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { Autocomplete as CustomAutocomplete } from 'components/shared/MuiCustomizations';

const filterOptions = createFilterOptions();

const AutocompleteField = React.forwardRef((props, ref) => {
  const {
    freeSolo,
    getOptionLabel = (value) => value,
    onChange,
    options,
    value,
    ...otherProps
  } = props;

  const [createdOptions, setCreatedOptions] = React.useState([]);

  return (
    <CustomAutocomplete
      filterOptions={
        freeSolo
          ? (options, params) => {
              const filtered = filterOptions(options, params);
              const { inputValue } = params;
              // Suggest the creation of a new value
              const isDefined = options.some(
                (option) => inputValue === getOptionLabel(option)
              );
              if (inputValue !== '' && !isDefined) {
                filtered.push({ inputValue });
              }
              return filtered;
            }
          : undefined
      }
      freeSolo={freeSolo}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return `Add "${option.inputValue}"`;
        }
        // Regular option
        return getOptionLabel(option);
      }}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setCreatedOptions([newValue]);
          onChange(newValue, event);
        } else if (newValue?.inputValue) {
          setCreatedOptions([newValue.inputValue]);
          onChange(newValue.inputValue, event);
        } else {
          onChange(newValue, event);
        }
      }}
      options={options.concat(createdOptions)}
      ref={ref}
      value={value || null}
      {...otherProps}
    />
  );
});

AutocompleteField.propTypes = CustomAutocomplete.propTypes;

export default AutocompleteField;
