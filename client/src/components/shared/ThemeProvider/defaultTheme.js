const defaultTheme = {
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
  mixins: {
    coverSmall: 80,
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#4caf50',
    },
    secondary: {
      main: '#ec407a',
    },
    background: {
      default: '#09090d',
      paper: '#131418',
    },
  },
  shape: {
    borderRadius: 8,
  },
};

export default defaultTheme;
