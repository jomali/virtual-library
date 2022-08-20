import CssBaseline from '@mui/material/CssBaseline';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { IntlProvider } from 'react-intl';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { messages, routes } from 'components/sections';
import { ApiProvider } from 'components/shared/ApiProvider';
import ThemeProvider from 'components/shared/ThemeProvider';
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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
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
        </LocalizationProvider>
      </ThemeProvider>
    </IntlProvider>
  );
}
