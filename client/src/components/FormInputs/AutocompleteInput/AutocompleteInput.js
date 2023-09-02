import React from "react";
// import { createFilterOptions } from "@mui/material/Autocomplete";
import { Autocomplete } from "components/MuiExtensions";

// const filterOptions = createFilterOptions();

const AutocompleteInput = React.forwardRef((props, ref) => {
  const {
    getOptionLabel = (value) => value,
    multiple,
    onChange,
    options,
    value,
    ...otherProps
  } = props;

  const defaultValue = React.useMemo(() => {
    if (multiple) {
      return [];
    } else if (options.length && options[0].constructor === Object) {
      return {};
    } else {
      return "";
    }
  }, [multiple, options]);

  return (
    <Autocomplete
      ref={ref}
      getOptionLabel={(option) => getOptionLabel(option) || ""}
      multiple={multiple}
      onChange={(event, newValue) => onChange(newValue, event)}
      options={options}
      value={value || defaultValue}
      {...otherProps}
    />
  );
});

AutocompleteInput.propTypes = Autocomplete.propTypes;

export default AutocompleteInput;
