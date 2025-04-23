import { createTheme } from '@mui/material/styles';

/**
 * Thème principal de l'application
 * Documentation MUI : https://mui.com/material-ui/customization/theming/
 */
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Bleu MUI par défaut
    },
    secondary: {
      main: '#dc004e', // Rose MUI par défaut
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
