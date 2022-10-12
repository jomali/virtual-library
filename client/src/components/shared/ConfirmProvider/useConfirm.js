import React from 'react';
import { ConfirmContext } from './ConfirmProvider';

export default () => {
  const confirm = React.useContext(ConfirmContext);
  return confirm;
};
