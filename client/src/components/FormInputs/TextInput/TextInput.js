import React from "react";
import { TextField } from "components/MuiExtensions";

const TextInput = React.forwardRef((props, ref) => {
  const { onChange, value, ...otherProps } = props;

  return (
    <TextField
      ref={ref}
      onChange={(event) => onChange(event.target.value, event)}
      value={value || ""}
      {...otherProps}
    />
  );
});

TextInput.propTypes = TextField.propTypes;

export default TextInput;
