import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: red[500],
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: red[500],
    },
  },
});

const Theme = (mode) => (mode === 'light' ? lightTheme : darkTheme);

export default Theme;

