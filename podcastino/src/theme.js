import { createTheme } from '@mui/material/styles';
import './App.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#4caf50', // Green
    },
    secondary: {
      main: '#ff5722', // Orange
    },
    accent: {
      main: '#2196f3', // Blue
    },
  },
  typography: {
    fontFamily: 'Montserrat, Nanum pen, Arial, sans-serif',
    
    h1: {
      fontFamily: 'Nanum pen, Arial, sans-serif', // Primary font for h1 headings
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Nanum pen, Arial, sans-serif', // Primary font for h2 headings
      fontWeight: 700,
    },
    body1: {
      fontFamily: 'Arial, sans-serif', // Secondary font for body text
    },
    body2: {
      fontFamily: 'Arial, sans-serif', // Secondary font for other body text
    },
    button: {
      fontFamily: 'Montserrat, Arial, sans-serif', // Primary font for buttons
    },
  },
});

export default theme;