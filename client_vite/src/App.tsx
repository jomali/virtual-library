import CssBaseline from "@mui/material/CssBaseline";
import ThemeProvider from "./components/ThemeProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import Div100vh from "react-div-100vh";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => {
  return (
    <ThemeProvider>
      <CssBaseline />
      <Div100vh style={{ display: "flex", flexDirection: "column" }}>
        <BrowserRouter>
          <Routes>
            {routes.map(({ element: Element, path }) => (
              <Route key={path} element={<Element />} path={path} />
            ))}
          </Routes>
        </BrowserRouter>
      </Div100vh>
    </ThemeProvider>
  );
};

export default App;
