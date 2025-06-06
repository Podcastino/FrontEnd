// src/components/PodcastLanding/WhySection.jsx

import React from "react";
import { Container, Grid, Card, Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function WhySection({ isMobile }) {
  const theme = useTheme();

  const items = [
    {
      icon: "🌌",
      title: "Curated Journeys",
      text: "AI-curated recommendations that evolve with your listening habits",
    },
    {
      icon: "🎧",
      title: "Pure Sound",
      text: "Immersive spatial audio with adaptive noise balancing",
    },
    {
      icon: "✨",
      title: "Smart Features",
      text: "Smart sleep timers & personalized playlists",
    },
  ];

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        mb: isMobile ? 4 : 6,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{
          fontWeight: 700,
          mb: 4,
          fontSize: isMobile ? "1.5rem" : "2.125rem",
          textAlign: "center",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -12,
            left: "50%",
            transform: "translateX(-50%)",
            width: "120px",
            height: "2px",
            background: `linear-gradient(90deg, transparent 0%, ${theme.palette.primary.main} 50%, transparent 100%)`,
            opacity: 0.6,
          },
        }}
      >
        Why Podcastino?
      </Typography>

      <Grid container spacing={isMobile ? 2 : 3}>
        {items.map((item, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                p: 2,
                minHeight: 240,
                background: theme.palette.background.paper,
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(236, 226, 226, 0.1)",
                position: "relative",
                overflow: "hidden",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 8px 24px ${theme.palette.primary.main}20`,
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: "-40%",
                  left: "-40%",
                  width: "200%",
                  height: "200%",
                  background: `radial-gradient(circle at 50% 50%, 
                    ${theme.palette.primary.main}10 0%, 
                    transparent 70%)`,
                  animation: "floatEffect 15s infinite linear",
                },
              }}
            >
              <Box sx={{ position: "relative", zIndex: 1, textAlign: "center", width: "100%" }}>
                <Box
                  sx={{
                    fontSize: "2.5rem",
                    mb: 1,
                    animation: "pulse 3s ease-in-out infinite",
                    "@keyframes pulse": {
                      "0%, 100%": { transform: "scale(1)", opacity: 0.8 },
                      "50%": { transform: "scale(1.1)", opacity: 1 },
                    },
                  }}
                >
                  {item.icon}
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    background: `linear-gradient(45deg, 
                      ${theme.palette.primary.light}, 
                      ${theme.palette.secondary.light})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {item.title}
                </Typography>

                <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "0.9rem", px: 2 }}>
                  {item.text}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
