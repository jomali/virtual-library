import React from "react";
import { DatePicker } from "components/MuiExtensions";

const DateInput = React.forwardRef((props, ref) => {
  const { onChange, value, ...otherProps } = props;
  return (
    <DatePicker
      ref={ref}
      onChange={onChange}
      value={value || null}
      {...otherProps}
    />
  );
});

export default DateInput;
