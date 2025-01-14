import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter, Route, Routes } from "react-router";
import ThemeProvider from "./components/ThemeProvider";
import QueryClientProvider from "./components/QueryClientProvider";
import { routes } from "./screens";
import ApiProvider from "./components/ApiProvider";
import IntlProvider from "./components/IntlProvider";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Div100vh from "react-div-100vh";

function App() {
  return (
    <IntlProvider>
      <ThemeProvider>
        <CssBaseline />
        <Div100vh>
          <ApiProvider host="http://192.168.1.25:5173">
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
        </Div100vh>
      </ThemeProvider>
    </IntlProvider>
  );
}

export default App;
