import React from 'react';
import { TextField as CustomTextField } from 'components/shared/MuiCustomizations';

const TextField = (props) => {
  const { onChange, ...otherProps } = props;

  return (
    <CustomTextField
      onChange={(event) => onChange(event.target.value)}
      {...otherProps}
    />
  );
};

TextField.propTypes = CustomTextField.propTypes;

export default TextField;
