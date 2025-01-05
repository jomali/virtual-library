import React from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { enUS, esES } from "@mui/material/locale";
import defaultTheme from "./defaultTheme";

const ThemeProvider: React.FC<{ children: React.ReactNode }> = (props) => {
  const locale = navigator.language === "es-ES" ? esES : enUS;

  return (
    <MuiThemeProvider theme={createTheme(defaultTheme, locale)} {...props} />
  );
};

export default ThemeProvider;
