import React from "react";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import PropTypes from "prop-types";
import { TextField } from "components/MuiExtensions";

/**
 * Customization of Material UI __DatePicker__ component.
 *
 * - Changes the styles and behaviour when the `readOnly` prop is _true_ to
 * prevent the component from being displayed as an input field.
 */
const DatePicker = React.forwardRef((props, ref) => {
  const { readOnly, required, value, ...otherProps } = props;

  if (readOnly && !value) {
    return (
      <TextField
        {...otherProps}
        readOnly={readOnly}
        required={required}
        value={"—"}
      />
    );
  }

  return (
    <MuiDatePicker
      ref={ref}
      renderInput={({ InputProps, ...otherParams }) => (
        <TextField
          {...otherParams}
          InputProps={{
            ...InputProps,
            endAdornment: readOnly ? undefined : InputProps.endAdornment,
          }}
          readOnly={readOnly}
          required={required}
        />
      )}
      value={value}
      {...otherProps}
    />
  );
});

DatePicker.propTypes = {
  ...MuiDatePicker.propTypes,

  /**
   * If `true`, the input element is not editable.
   */
  readOnly: PropTypes.bool,

  /**
   * If `true`, the label is displayed as required and the input element is
   * required.
   */
  required: PropTypes.bool,
};

export default DatePicker;
