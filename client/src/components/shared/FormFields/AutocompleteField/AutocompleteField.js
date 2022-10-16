import React from 'react';
import { Autocomplete as CustomAutocomplete } from 'components/shared/MuiCustomizations';

const AutocompleteField = React.forwardRef((props, ref) => {
  const { getOptionLabel, onChange, value, ...otherProps } = props;

  return (
    <CustomAutocomplete
      getOptionLabel={getOptionLabel}
      onChange={(event, newValue) => onChange(event, newValue)}
      ref={ref}
      value={value || null}
      {...otherProps}
    />
  );
});

AutocompleteField.propTypes = CustomAutocomplete.propTypes;

export default AutocompleteField;
