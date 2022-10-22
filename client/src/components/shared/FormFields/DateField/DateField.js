import React from 'react';
import { DatePicker as CustomDatePicker } from 'components/shared/MuiCustomizations';

const DateField = React.forwardRef((props, ref) => {
  return <CustomDatePicker ref={ref} {...props} />;
});

export default DateField;
