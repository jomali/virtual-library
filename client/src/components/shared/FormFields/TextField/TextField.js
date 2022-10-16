import React from 'react';
import { TextField as CustomTextField } from 'components/shared/MuiCustomizations';

const TextField = React.forwardRef((props, ref) => {
  const { onChange, value, ...otherProps } = props;

  return (
    <CustomTextField
      onChange={(event) => onChange(event, event.target.value)}
      ref={ref}
      value={value || ''}
      {...otherProps}
    />
  );
});

TextField.propTypes = CustomTextField.propTypes;

export default TextField;