import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router";
import ThemeProvider from "./components/ThemeProvider";
import QueryClientProvider from "./components/QueryClientProvider";
import { messages, routes } from "./screens";
import IntlProvider from "./components/IntlProvider";
import Div100vh from "react-div-100vh";
import NotificationProvider from "./components/NotificationProvider";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  return (
    <IntlProvider messages={messages}>
      <ThemeProvider>
        <CssBaseline />
        <Div100vh>
          <NotificationProvider>
            <QueryClientProvider>
              <BrowserRouter>
                <Routes>
                  {routes.map(({ component: Component, path }) => (
                    <Route key={path} element={<Component />} path={path} />
                  ))}
                </Routes>
              </BrowserRouter>
            </QueryClientProvider>
          </NotificationProvider>
        </Div100vh>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default App;
