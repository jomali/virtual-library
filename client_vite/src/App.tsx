
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Books from "./sections/books/Books"
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#4caf50",
      },
      secondary: {
        main: "#90456b",
      },
      background: {
        default: "#121212", // "#09090d",
        paper: "#202020", // "#131418",
      },
      mode: "dark",
    },
    shape: {
      borderRadius: 8,
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Books />
    </ThemeProvider>
  )
}

export default App
