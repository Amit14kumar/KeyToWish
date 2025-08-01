import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#f50057',
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: [
      'Open Sans',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
    // Brand typography with rounded font
    h6: {
      fontFamily: '"Varela Round", sans-serif',
      fontWeight: 900, // Increased from 700 to 900
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          // Add specific styles for navigation buttons
          '&.MuiButton-text': {
            fontWeight: 600,
            textTransform: 'none',
            letterSpacing: '0.3px',
          },
        },
        contained: {
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    // Add specific toolbar styling to ensure vertical alignment
    MuiToolbar: {
      styleOverrides: {
        root: {
          alignItems: 'center',
          '& a': {
            textDecoration: 'none',
          },
        },
      },
    },
  },
});

export default theme;
