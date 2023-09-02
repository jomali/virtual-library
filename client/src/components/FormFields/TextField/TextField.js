import React from "react";
import { TextField as CustomTextField } from "components/MuiCustomizations";

const TextField = React.forwardRef((props, ref) => {
  const { onChange, value, ...otherProps } = props;

  return (
    <CustomTextField
      onChange={(event) => onChange(event.target.value, event)}
      ref={ref}
      value={value || ""}
      {...otherProps}
    />
  );
});

TextField.propTypes = CustomTextField.propTypes;

export default TextField;
