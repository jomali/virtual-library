import React from 'react';
import { Autocomplete as CustomAutocomplete } from 'components/shared/MuiCustomizations';

const AutocompleteField = React.forwardRef((props, ref) => {
  const { onChange, ...otherProps } = props;

  return (
    <CustomAutocomplete
      onChange={(event, newValue) => onChange(event, newValue)}
      ref={ref}
      {...otherProps}
    />
  );
});

AutocompleteField.propTypes = { ...CustomAutocomplete.propTypes };

export default AutocompleteField;
