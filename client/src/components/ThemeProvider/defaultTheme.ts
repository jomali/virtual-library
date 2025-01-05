import { createTheme } from "@mui/material/styles";

export default createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        arrow: ({ theme }) => ({
          color: theme.palette.common.black,
        }),
        tooltip: ({ theme }) => ({
          backgroundColor: theme.palette.common.black,
          fontSize: theme.typography.pxToRem(12),
        }),
      },
    },
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#4caf50",
    },
    secondary: {
      main: "#ec407a",
    },
    background: {
      default: "#121212", // "#09090d",
      paper: "#202020", // "#131418",
    },
  },
  shape: {
    borderRadius: 8,
  },
});
