import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from 'components/_custom/ThemeProvider';

export default function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <p>Hola mundo.</p>
    </ThemeProvider>
  );
}
