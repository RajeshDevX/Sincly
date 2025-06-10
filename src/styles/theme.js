import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: '#000',
          '&.Mui-selected': {
            backgroundColor: '#1976d2',
            color: '#fff',
          },
          '& svg': {
            color: '#000',
          },
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
  },
  components: {
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          color: '#fff',
          '&.Mui-selected': {
            backgroundColor: '#90caf9',
            color: '#000',
          },
          '& svg': {
            color: '#fff',
          },
        },
      },
    },
  },
});
