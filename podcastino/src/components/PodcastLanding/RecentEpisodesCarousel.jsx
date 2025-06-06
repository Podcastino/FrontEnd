// src/components/PodcastLanding/RecentEpisodesCarousel.jsx

import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Stack,
  Container,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export default function RecentEpisodesCarousel({
  isMobile,
  isTablet,
  recentEpisodes,
}) {
  const theme = useTheme();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 4,
    slidesToScroll: isMobile ? 1 : 2,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: { slidesToShow: 3, slidesToScroll: 2 },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 2, slidesToScroll: 2, arrows: false },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
          centerPadding: "40px",
        },
      },
    ],
  };

  return (
    <Box>
        <Container maxWidth="xl" sx={{ py: 4, mb: isMobile ? 4 : 6 }}>
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
                width: "80px",
                height: "4px",
                background: `linear-gradient(90deg, 
          ${theme.palette.primary.main} 0%, 
          ${theme.palette.secondary.main} 100%)`,
                borderRadius: "2px",
                opacity: theme.palette.mode === "dark" ? 1 : 0.8,
              },
            }}
          >
            Recent Episodes
          </Typography>

          <Box
            sx={{
              px: isMobile ? 0 : 2,
              "& .slick-slide": {
                px: isMobile ? 1 : 2,
              },
              "& .slick-track": {
                display: "flex",
                alignItems: "stretch",
              },
              "& .slick-dots li button:before": {
                color: theme.palette.primary.main,
              },
              "& .slick-slide": {
                height: "auto",
                "& > div": {
                  height: "100%",
                },
              },
            }}
          >
            <Slider
              {...{
                ...sliderSettings,
                slidesToShow: isMobile ? 1 : 4,
                slidesToScroll: isMobile ? 1 : 2,
                responsive: [
                  {
                    breakpoint: theme.breakpoints.values.lg,
                    settings: {
                      slidesToShow: 3,
                      slidesToScroll: 2,
                    },
                  },
                  {
                    breakpoint: theme.breakpoints.values.md,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      arrows: false,
                    },
                  },
                  {
                    breakpoint: theme.breakpoints.values.sm,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      arrows: false,
                      centerMode: true,
                      centerPadding: "40px",
                    },
                  },
                ],
              }}
            >
              {recentEpisodes.map((show) => (
                <Box
                  key={`episode-${show.id}`}
                  sx={{
                    padding: isMobile ? 1 : 2,
                    height: "100%",
                    width: isMobile ? 300 : "auto",
                  }}
                >
                  <Link to={`/episode/${show.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.2s, box-shadow 0.2s",
                        background: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow:
                            theme.palette.mode === "dark"
                              ? `0 8px 32px ${theme.palette.primary.main}30`
                              : `0 8px 24px ${theme.palette.primary.main}15`,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height={180}
                        image={show.image}
                        alt={show.title}
                        sx={{
                          position: "relative",
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(45deg, 
                    ${theme.palette.primary.main}${
                              theme.palette.mode === "dark" ? "30" : "15"
                            }, 
                    ${theme.palette.secondary.main}${
                              theme.palette.mode === "dark" ? "30" : "15"
                            })`,
                            mixBlendMode:
                              theme.palette.mode === "dark" ? "soft-light" : "multiply",
                          },
                        }}
                      />
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          p: isMobile ? 1.5 : 2,
                          background:
                            theme.palette.mode === "dark"
                              ? `linear-gradient(180deg, 
                    ${theme.palette.primary.light}05, 
                    ${theme.palette.primary.main}15)`
                              : `linear-gradient(180deg, 
                    ${theme.palette.primary.light}03, 
                    ${theme.palette.primary.light}08)`,
                        }}
                      >
                        <Typography gutterBottom variant="h6" component="div">
                          {show.title}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: "wrap" }}>
                          <Typography
                            variant="caption"
                            sx={{
                              background: theme.palette.action.hover,
                              px: 1,
                              borderRadius: 1,
                              color:
                                theme.palette.mode === "dark"
                                  ? "primary.light"
                                  : "primary.dark",
                            }}
                          >
                            New Episode
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              background: theme.palette.action.hover,
                              px: 1,
                              borderRadius: 1,
                              color:
                                theme.palette.mode === "dark"
                                  ? "secondary.light"
                                  : "secondary.dark",
                            }}
                          >
                            45 min
                          </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {show.host}
                        </Typography>
                      </CardContent>
                      <Box
                        sx={{
                          p: isMobile ? 1 : 2,
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          background: theme.palette.action.selected,
                        }}
                      >
                        <Button
                          startIcon={<PlayArrow />}
                          size="small"
                          sx={{
                            background: `linear-gradient(45deg, 
                    ${theme.palette.primary.main} 0%, 
                    ${theme.palette.secondary.main} 100%)`,
                            color: theme.palette.primary.contrastText,
                            "&:hover": {
                              transform: "scale(1.05)",
                              boxShadow: `0 4px 12px ${theme.palette.primary.main}30`,
                            },
                          }}
                        >
                          Play Now
                        </Button>
                        <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.8 }}>
                          {new Date().toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </Typography>
                      </Box>
                    </Card>
                  </Link>
                </Box>
              ))}
            </Slider>
          </Box>
        </Container>
    </Box>
  );
}
