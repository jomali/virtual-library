import React from 'react';
import { enUS, esES } from '@mui/material/locale';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import defaultTheme from './defaultTheme';

const ThemeProvider = (props) => {
  const browserLanguage = navigator.language || navigator.userLanguage;
  const locale = browserLanguage === 'es-ES' ? esES : enUS;

  return (
    <MuiThemeProvider theme={createTheme(defaultTheme, locale)} {...props} />
  );
};

export default ThemeProvider;
