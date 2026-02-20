import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B00',
    },
    secondary: {
      main: '#2E2E2E',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

export default theme;
