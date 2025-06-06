// src/theme/getDesignTokens.js
export default function getDesignTokens(mode) {
    return {
      palette: {
        mode,
        primary: {
          main: '#673ab7',
          light: '#9a67ea',
          dark: '#320b86',
        },
        secondary: {
          main: '#ff4081',
        },
        ...(mode === 'dark'
          ? {
              background: {
                default: '#121212',
                paper: '#1e1e1e',
              },
            }
          : {
              background: {
                default: '#f8f9fa',
                paper: '#ffffff',
              },
            }),
        text: {
          ...(mode === 'dark'
            ? {
                primary: '#ffffff',
                secondary: 'rgba(255, 255, 255, 0.7)',
              }
            : {
                primary: 'rgba(0, 0, 0, 0.87)',
                secondary: 'rgba(0, 0, 0, 0.6)',
              }),
        },
      },
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
        },
      },
    };
  }
  