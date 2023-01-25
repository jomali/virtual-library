import CssBaseline from '@mui/material/CssBaseline';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Div100vh from 'react-div-100vh';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
//import { messages, routes } from 'components/Main';

import { ApiProvider } from 'components/ApiProvider';
import { ConfirmProvider } from 'components/ConfirmProvider';
import { SnackbarProvider } from 'components/SnackbarProvider';
import ThemeProvider from 'components/ThemeProvider';
import { messages, routes } from 'sections/videogames';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function App() {
  /** Language without region code. */
  const language = navigator.language.split(/[-_]/)[0];
  const queryClient = new QueryClient();

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <ThemeProvider>
        <CssBaseline />
        <Div100vh style={{ display: 'flex', flexDirection: 'column' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SnackbarProvider
              anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom',
              }}
            >
              <ConfirmProvider>
                <ApiProvider host="http://localhost:9000/api">
                  <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                      <Routes>
                        {routes.map((route) => (
                          <Route key={route.path} {...route} />
                        ))}
                      </Routes>
                    </BrowserRouter>
                  </QueryClientProvider>
                </ApiProvider>
              </ConfirmProvider>
            </SnackbarProvider>
          </LocalizationProvider>
        </Div100vh>
      </ThemeProvider>
    </IntlProvider>
  );
}
