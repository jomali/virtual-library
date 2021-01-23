import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Router } from '@reach/router';
import Div100vh from 'react-div-100vh';
import AppBar from 'components/_custom/AppBar';
import ThemeProvider from 'components/_custom/ThemeProvider';
import Videogames from 'components/Videogames';
import { translate } from 'lang';
import '@fontsource/roboto';

export default function App() {
  const classes = useStyles();

  return (
    <Div100vh className={classes.root}>
      <ThemeProvider>
        <CssBaseline />
        <AppBar title={translate('applicationTitle')} />
        <Router basepath={process.env.PUBLIC_URL}>
          <Videogames default path="/videogames" />
        </Router>
      </ThemeProvider>
    </Div100vh>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
