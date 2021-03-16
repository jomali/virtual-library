import React from "react";
import TextField from "components/_TextField";

export default (props) => {
  const {
    color = "secondary",
    fullwidth = true,
    variant = "filled",
    ...otherProps
  } = props;

  return (
    <TextField
      color={color}
      fullwidth={fullwidth}
      variant={variant}
      {...otherProps}
    />
  );
};
