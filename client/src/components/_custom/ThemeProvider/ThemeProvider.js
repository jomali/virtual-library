import React from 'react';
import { esES } from '@material-ui/core/locale';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import defaultTheme from './defaultTheme';

export default function ThemeProvider({ children, theme = defaultTheme }) {
  const muiTheme = createMuiTheme({ ...theme }, esES);
  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
}
