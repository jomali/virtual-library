import React from 'react';
import { TextField as CustomTextField } from 'components/shared/MuiCustomizations';

const TextField = React.forwardRef((props, ref) => {
  const { onChange, ...otherProps } = props;

  return (
    <CustomTextField
      onChange={(event) => onChange(event, event.target.value)}
      ref={ref}
      {...otherProps}
    />
  );
});

TextField.propTypes = CustomTextField.propTypes;

export default TextField;
