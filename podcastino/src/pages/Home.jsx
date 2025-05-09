import React from "react";
import { Box, Typography, CircularProgress,createTheme, keyframes } from "@mui/material";
import { Podcasts } from "@mui/icons-material";
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#673ab7',
      light: '#9a67ea',
      dark: '#320b86',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
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
});




// Premium animations
const floatAnimation = keyframes`
  0% { 
    transform: translateY(0px) rotate(0deg);
    filter: drop-shadow(0 0 10px rgba(103, 58, 183, 0.5));
  }
  50% { 
    transform: translateY(-15px) rotate(5deg);
    filter: drop-shadow(0 0 25px rgba(154, 103, 234, 0.8));
  }
  100% { 
    transform: translateY(0px) rotate(0deg);
    filter: drop-shadow(0 0 10px rgba(103, 58, 183, 0.5));
  }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(0.98); opacity: 0.9; }
  50% { transform: scale(1.03); opacity: 1; }
  100% { transform: scale(0.98); opacity: 0.9; }
`;

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const LoadingPage = () => {
  
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
        background: `
          linear-gradient(
            135deg,
            #0f0820 0%,
            #1a1038 50%,
            #0f0820 100%
          )
        `,
        overflow: 'hidden',
      }}
    >
      {/* Animated gradient backdrop */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: `
          linear-gradient(
            -45deg,
            ${theme.palette.primary.dark}10,
            ${theme.palette.secondary.dark}10,
            ${theme.palette.primary.dark}10
          )
        `,
        backgroundSize: '400% 400%',
        animation: `${gradientAnimation} 15s ease infinite`,
        opacity: 0.7,
      }} />

      {/* Main content container */}
      <Box sx={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        animation: `${pulseAnimation} 3s ease-in-out infinite`,
      }}>
        {/* Glowing podcast icon */}
        <Box
          sx={{
            animation: `${floatAnimation} 3.5s ease-in-out infinite`,
            mb: 4,
            position: 'relative',
          }}
        >
          <Box sx={{
            position: 'absolute',
            width: '120%',
            height: '120%',
            top: '-10%',
            left: '-10%',
            background: `radial-gradient(
              circle,
              ${theme.palette.primary.main}30 0%,
              transparent 70%
            )`,
            borderRadius: '50%',
            animation: `${pulseAnimation} 4s ease-in-out infinite`,
          }} />
          <Podcasts
            sx={{
              fontSize: "6rem",
              color: theme.palette.primary.light,
              position: 'relative',
              zIndex: 2,
            }}
          />
        </Box>

        {/* Elegant loading text */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 500,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: theme.palette.primary.light,
            textShadow: '0 0 15px rgba(154, 103, 234, 0.7)',
            mb: 4,
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40%',
              height: '2px',
              background: `linear-gradient(
                to right,
                transparent,
                ${theme.palette.primary.light},
                transparent
              )`,
              animation: `${pulseAnimation} 3s ease-in-out infinite`,
            }
          }}
        >
          Loading
        </Typography>

        {/* Premium progress indicator */}
        <CircularProgress
          size={60}
          thickness={2.5}
          variant="indeterminate"
          sx={{
            color: theme.palette.primary.light,
            '& .MuiCircularProgress-circle': {
              strokeLinecap: 'round',
              animation: `${pulseAnimation} 2s ease-in-out infinite`,
            },
            filter: 'drop-shadow(0 0 8px rgba(154, 103, 234, 0.6))',
          }}
        />
      </Box>

      {/* Floating audio waves */}
      {[...Array(8)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderRadius: '50%',
            border: `1px solid ${theme.palette.primary.main}30`,
            animation: `${pulseAnimation} ${4 + i}s ease-in-out infinite`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.4,
          }}
        />
      ))}

      {/* Subtle floating particles */}
      {[...Array(12)].map((_, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: `radial-gradient(
              circle,
              ${theme.palette.primary.light},
              ${theme.palette.primary.main}
            )`,
            opacity: 0.6,
            animation: `${floatAnimation} ${5 + i * 0.5}s ease-in-out infinite`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(0.5px)',
          }}
        />
      ))}
    </Box>
  );
};

export default LoadingPage;