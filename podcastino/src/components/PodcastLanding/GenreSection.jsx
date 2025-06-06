// src/components/PodcastLanding/GenreSection.jsx

import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { FiberManualRecord } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { genres } from "../../pages/Data/Mockdata"; // adjust path

export default function GenreSection({ isMobile, onGenreClick }) {
  const theme = useTheme();

  return (
    <Container
      maxWidth="xl"
      sx={{
        py: 4,
        mb: isMobile ? 4 : 6,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant={isMobile ? "h5" : "h4"}
        sx={{
          fontWeight: 700,
          mb: 6,
          fontSize: isMobile ? "1.5rem" : "2.125rem",
          textAlign: "center",
          position: "relative",
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: -12,
            left: "50%",
            transform: "translateX(-50%)",
            width: "80px",
            height: "4px",
            background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
            borderRadius: "2px",
          },
        }}
      >
        Popular genres
      </Typography>

      <Grid container spacing={isMobile ? 2 : 3}>
        {genres.map((genre) => (
          <Grid
            item
            xs={6}
            sm={4}
            md={2}
            key={genre.name}
            sx={{ margin: "auto" }}
          >
            <Box
              onClick={() => onGenreClick(genre.name)}
              sx={{
                width: "10rem",
                bgcolor: genre.color + "20",
                borderRadius: 2,
                p: isMobile ? 2 : 3,
                textAlign: "center",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
                cursor: "pointer",
              }}
            >
              <FiberManualRecord
                sx={{
                  color: genre.color,
                  fontSize: isMobile ? 30 : 40,
                  mb: 1,
                }}
              />
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                sx={{
                  fontSize: isMobile ? "0.875rem" : "1.25rem",
                }}
              >
                {genre.name}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
