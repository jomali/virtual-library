import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router";
import ThemeProvider from "./components/ThemeProvider";
import QueryClientProvider from "./components/QueryClientProvider";
import { messages, routes } from "./screens";
import ApiProvider from "./components/ApiProvider";
import IntlProvider from "./components/IntlProvider";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Div100vh from "react-div-100vh";
import NotificationProvider from "./components/NotificationProvider";

function App() {
  return (
    <IntlProvider messages={messages}>
      <ThemeProvider>
        <CssBaseline />
        <Div100vh>
          <NotificationProvider>
            <ApiProvider host="http://192.168.1.25:3000">
              <QueryClientProvider>
                <BrowserRouter>
                  <Routes>
                    {routes.map(({ component: Component, path }) => (
                      <Route key={path} element={<Component />} path={path} />
                    ))}
                  </Routes>
                </BrowserRouter>
              </QueryClientProvider>
            </ApiProvider>
          </NotificationProvider>
        </Div100vh>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default App;
