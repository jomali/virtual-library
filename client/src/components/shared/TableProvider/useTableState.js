import React from 'react';
import { TableContext } from './TableProvider';

export default () => {
  const table = React.useContext(TableContext);
  return table;
};
