// src/components/PodcastLanding/HeroSection.jsx

import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function HeroSection({ isMobile, isLoggedIn, navigate }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        py: isMobile ? 6 : 10,
        mb: isMobile ? 4 : 6,
        position: "relative",
        overflow: "hidden",
        background:
          theme.palette.mode === "dark"
            ? `linear-gradient(
                -45deg,
                ${theme.palette.primary.main}20,
                ${theme.palette.secondary.main}20,
                ${theme.palette.background.default}
              )`
            : `linear-gradient(
                -45deg,
                ${theme.palette.primary.light}15,
                ${theme.palette.secondary.light}15,
                ${theme.palette.background.default}
              )`,
        "&::before": {
          content: '""',
          position: "absolute",
          top: "-50%",
          left: "-50%",
          width: "200%",
          height: "200%",
          background: `linear-gradient(
            45deg,
            transparent 25%,
            ${theme.palette.primary.main}${
            theme.palette.mode === "dark" ? "10" : "05"
          } 50%,
            transparent 75%
          )`,
          animation: "shimmer 20s linear infinite",
          "@keyframes shimmer": {
            "0%": { transform: "rotate(0deg) translateX(-50%)" },
            "100%": { transform: "rotate(360deg) translateX(50%)" },
          },
        },
      }}
    >
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant={isMobile ? "h3" : "h2"}
              sx={{
                fontWeight: 800,
                mb: 3,
                fontSize: isMobile ? "2rem" : "3rem",
                background: `linear-gradient(45deg, 
                  ${theme.palette.primary.main} 30%, 
                  ${theme.palette.secondary.main} 90%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textShadow:
                  theme.palette.mode === "dark"
                    ? "0 0 20px rgba(103,58,183,0.3)"
                    : "none",
                animation:
                  theme.palette.mode === "dark"
                    ? "textGlow 3s ease-in-out infinite alternate"
                    : "none",
                "@keyframes textGlow": {
                  "0%": { textShadow: "0 0 10px rgba(103,58,183,0.3)" },
                  "100%": { textShadow: "0 0 30px rgba(103,58,183,0.6)" },
                },
              }}
            >
              Discover Your Next Favorite Podcast
            </Typography>

            <Typography
              variant={isMobile ? "h6" : "h5"}
              sx={{
                mb: 4,
                color: "text.secondary",
                position: "relative",
                fontSize: isMobile ? "1rem" : "1.5rem",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: "60px",
                  height: "2px",
                  background: theme.palette.primary.main,
                  opacity: theme.palette.mode === "dark" ? 1 : 0.8,
                  animation: "lineGrow 1.5s ease-out",
                  "@keyframes lineGrow": {
                    "0%": { width: 0 },
                    "100%": { width: "60px" },
                  },
                },
              }}
            >
              Thousands of podcasts at your fingertips. Listen anytime, anywhere.
            </Typography>

            <Stack direction={isMobile ? "column" : "row"} spacing={2}>
              {!isLoggedIn && (
                <Button
                  variant="contained"
                  color="primary"
                  size={isMobile ? "medium" : "large"}
                  onClick={() => navigate("/signup")}
                  sx={{
                    backdropFilter: "blur(10px)",
                    background:
                      theme.palette.mode === "dark"
                        ? "rgba(103,58,183,0.2)"
                        : "rgba(103,58,183,0.7)",
                    border:
                      theme.palette.mode === "dark"
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid rgba(103,58,183,0.2)",
                    transition: "all 0.3s",
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow:
                        theme.palette.mode === "dark"
                          ? `0 8px 32px ${theme.palette.primary.main}40`
                          : `0 8px 32px ${theme.palette.primary.main}20`,
                    },
                  }}
                >
                  Start Listening
                </Button>
              )}

              <Button
                variant="outlined"
                size={isMobile ? "medium" : "large"}
                onClick={() => navigate("/topshows")}
                sx={{
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "rgba(255,255,255,0.2)"
                      : theme.palette.divider,
                  color: "text.primary",
                  "&:hover": {
                    borderColor: theme.palette.primary.main,
                    backgroundColor:
                      theme.palette.mode === "dark"
                        ? `${theme.palette.primary.main}10`
                        : `${theme.palette.primary.light}10`,
                  },
                }}
              >
                Browse Shows
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Floating Particles */}
      {[...Array(isMobile ? 5 : 15)].map((_, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            width: 20,
            height: 20,
            background: `radial-gradient(${theme.palette.primary.main}, transparent)`,
            borderRadius: "50%",
            animation: `float ${15 + index}s linear infinite`,
            opacity: theme.palette.mode === "dark" ? 1 : 0.2,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            "@keyframes float": {
              "0%": { transform: "translateY(0) scale(1)" },
              "50%": {
                transform: `translateY(-${Math.random() * 100}vh) scale(0.5)`,
              },
              "100%": { transform: "translateY(-100vh) scale(0)" },
            },
          }}
        />
      ))}
    </Box>
  );
}
