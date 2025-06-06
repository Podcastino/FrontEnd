// src/components/PodcastLanding/TopShowsCarousel.jsx

import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
} from "@mui/material";
import { PlayArrow, Subscriptions as SubscriptionsIcon } from "@mui/icons-material";
import Slider from "react-slick";
import { useTheme } from "@mui/material/styles";

export default function TopShowsCarousel({
  isMobile,
  isTablet,
  topShows,
  subscriptionMap,
  onSubscribeToggle,
}) {
  const theme = useTheme();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : isTablet ? 2 : 3,
    slidesToScroll: isMobile ? 1 : 2,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: { slidesToShow: 2, slidesToScroll: 2, arrows: false },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false },
      },
    ],
  };

  return (
    <Box>
        {/* Top Shows Carousel */}
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
                background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                borderRadius: "2px",
              },
            }}
          >
            Top shows this week
          </Typography>

          <Box
            sx={{
              px: isMobile ? 0 : 2,
              "& .slick-slide": {
                px: isMobile ? 1 : 2,
              },
              "& .slick-dots": {
                bottom: isMobile ? -30 : -40,
              },
              "& .slick-dots li button:before": {
                color: theme.palette.primary.main,
              },
              "& .slick-track": {
                display: "flex",
                alignItems: "stretch",
              },
              "& .slick-slide": {
                height: "auto",
                "& > div": {
                  height: "100%",
                },
              },
            }}
          >
            <Slider {...sliderSettings}>
              {topShows.map((show) => {
                // For each show, compute whether the user is subscribed:
                const isSubscribed = Boolean(subscriptionMap[show.id]);

                return (
                  <Box key={show.id} sx={{ padding: isMobile ? 1 : 2, height: "100%" }}>
                    <Card
                      sx={{
                        background: theme.palette.background.paper,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height={isMobile ? 180 : 220}
                        image={show.image}
                        alt={show.title}
                        sx={{
                          background: `
                          linear-gradient(
                            -45deg,
                            #673ab7,
                            #9c27b0,
                            #2196f3,
                            #4caf50
                          )
                        `,
                          backgroundSize: "400% 400%",
                          animation: "gradient 15s ease infinite",
                          "@keyframes gradient": {
                            "0%": { backgroundPosition: "0% 50%" },
                            "50%": { backgroundPosition: "100% 50%" },
                            "100%": { backgroundPosition: "0% 50%" },
                          },
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1, p: isMobile ? 1.5 : 2 }}>
                        <Typography
                          gutterBottom
                          variant={isMobile ? "h6" : "h5"}
                          component="div"
                          sx={{ fontSize: isMobile ? "1rem" : "1.25rem" }}
                        >
                          {show.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 1,
                            fontSize: isMobile ? "0.75rem" : "0.875rem",
                          }}
                        >
                          Hosted by {show.host}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            fontSize: isMobile ? "0.75rem" : "0.875rem",
                          }}
                        >
                          {show.category} • {show.listeners} listeners
                        </Typography>
                      </CardContent>
                      <Box
                        sx={{
                          p: isMobile ? 1 : 2,
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button
                          size={isMobile ? "small" : "medium"}
                          startIcon={<PlayArrow fontSize={isMobile ? "small" : "medium"} />}
                          color="primary"
                          sx={{
                            fontSize: isMobile ? "0.75rem" : "0.875rem",
                          }}
                        >
                          Listen Now
                        </Button>

                        {/* ←– Here is the Subscribe/Unsubscribe button –→ */}
                        <Button
                          variant="contained"
                          startIcon={<SubscriptionsIcon />}
                          color={isSubscribed ? "secondary" : "primary"}
                          onClick={() => onSubscribeToggle(show.id)}
                          sx={{ ml: 1 }}
                          size={isMobile ? "small" : "medium"}
                        >
                          {isSubscribed ? "Unsubscribe" : "Subscribe"}
                        </Button>
                      </Box>
                    </Card>
                  </Box>
                );
              })}
            </Slider>
          </Box>
        </Container>
    </Box>
  );
}
