import React from "react";
import { useNavigate, Link } from 'react-router-dom';
import { topShows, genres } from './Data/Mockdata';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
  ThemeProvider,
  CssBaseline
} from "@mui/material";
import {
  PlayArrow,
  FavoriteBorder,
  FiberManualRecord,
} from "@mui/icons-material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function PodcastLanding({ Theme, isMobile, isTablet, isLoggedIn }) {
  const navigate = useNavigate();

  const handleGenreClick = (genreName) => {
    navigate('/generes', {
      state: { selectedGenre: genreName }
    });
  };

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
        breakpoint: Theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false
        }
      },
      {
        breakpoint: Theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false
        }
      }
    ]
  };

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Hero Section - Responsive */}
        <Box sx={{
          py: isMobile ? 6 : 10,
          mb: isMobile ? 4 : 6,
          position: 'relative',
          overflow: 'hidden',
          background: Theme.palette.mode === 'dark'
            ? `linear-gradient(
        -45deg,
        ${Theme.palette.primary.main}20,
        ${Theme.palette.secondary.main}20,
        ${Theme.palette.background.default}
      )`
            : `linear-gradient(
        -45deg,
        ${Theme.palette.primary.light}15,
        ${Theme.palette.secondary.light}15,
        ${Theme.palette.background.default}
      )`,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: `linear-gradient(
      45deg,
      transparent 25%,
      ${Theme.palette.primary.main}${Theme.palette.mode === 'dark' ? '10' : '05'} 50%,
      transparent 75%
    )`,
            animation: 'shimmer 20s linear infinite',
            '@keyframes shimmer': {
              '0%': { transform: 'rotate(0deg) translateX(-50%)' },
              '100%': { transform: 'rotate(360deg) translateX(50%)' }
            }
          }
        }}>
          <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography
                  variant={isMobile ? 'h3' : 'h2'}
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    fontSize: isMobile ? '2rem' : '3rem',
                    background: `linear-gradient(45deg, 
              ${Theme.palette.primary.main} 30%, 
              ${Theme.palette.secondary.main} 90%)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: Theme.palette.mode === 'dark'
                      ? '0 0 20px rgba(103,58,183,0.3)'
                      : 'none',
                    animation: Theme.palette.mode === 'dark'
                      ? 'textGlow 3s ease-in-out infinite alternate'
                      : 'none',
                    '@keyframes textGlow': {
                      '0%': { textShadow: '0 0 10px rgba(103,58,183,0.3)' },
                      '100%': { textShadow: '0 0 30px rgba(103,58,183,0.6)' }
                    }
                  }}
                >
                  Discover Your Next Favorite Podcast
                </Typography>

                <Typography
                  variant={isMobile ? 'h6' : 'h5'}
                  sx={{
                    mb: 4,
                    color: 'text.secondary',
                    position: 'relative',
                    fontSize: isMobile ? '1rem' : '1.5rem',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      bottom: -8,
                      left: 0,
                      width: '60px',
                      height: '2px',
                      background: Theme.palette.primary.main,
                      opacity: Theme.palette.mode === 'dark' ? 1 : 0.8,
                      animation: 'lineGrow 1.5s ease-out',
                      '@keyframes lineGrow': {
                        '0%': { width: 0 },
                        '100%': { width: '60px' }
                      }
                    }
                  }}
                >
                  Thousands of podcasts at your fingertips. Listen anytime, anywhere.
                </Typography>

                <Stack direction={isMobile ? 'column' : 'row'} spacing={2}>
                  { isLoggedIn ? (
                    <>
                    </>
                  ) : (
                    <Button
                    variant="contained"
                    color="primary"
                    size={isMobile ? 'medium' : 'large'}
                    onClick={() => navigate('/signup')}
                    sx={{
                      backdropFilter: 'blur(10px)',
                      background: Theme.palette.mode === 'dark'
                        ? 'rgba(103,58,183,0.2)'
                        : 'rgba(103,58,183,0.7)',
                      border: Theme.palette.mode === 'dark'
                        ? '1px solid rgba(255,255,255,0.1)'
                        : '1px solid rgba(103,58,183,0.2)',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: Theme.palette.mode === 'dark'
                          ? `0 8px 32px ${Theme.palette.primary.main}40`
                          : `0 8px 32px ${Theme.palette.primary.main}20`
                      }
                    }}
                  >
                    Start Listening
                  </Button>
                  )}
                  <Button
                    variant="outlined"
                    size={isMobile ? 'medium' : 'large'}
                    onClick={() => { navigate('/topshows'); }}
                    sx={{
                      borderColor: Theme.palette.mode === 'dark'
                        ? 'rgba(255,255,255,0.2)'
                        : Theme.palette.divider,
                      color: 'text.primary',
                      '&:hover': {
                        borderColor: Theme.palette.primary.main,
                        backgroundColor: Theme.palette.mode === 'dark'
                          ? `${Theme.palette.primary.main}10`
                          : `${Theme.palette.primary.light}10`
                      }
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
                position: 'absolute',
                width: 20,
                height: 20,
                background: `radial-gradient(${Theme.palette.primary.main}, transparent)`,
                borderRadius: '50%',
                animation: `float ${15 + index}s linear infinite`,
                opacity: Theme.palette.mode === 'dark' ? 1 : 0.2,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                '@keyframes float': {
                  '0%': { transform: 'translateY(0) scale(1)' },
                  '50%': { transform: `translateY(-${Math.random() * 100}vh) scale(0.5)` },
                  '100%': { transform: 'translateY(-100vh) scale(0)' }
                }
              }}
            />
          ))}
        </Box>

        {/* Popular Genres - Responsive */}
        <Container maxWidth="xl" sx={{ py: 4, mb: isMobile ? 4 : 6, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{
              fontWeight: 700,
              mb: 6,
              fontSize: isMobile ? '1.5rem' : '2.125rem',
              textAlign: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                background: `linear-gradient(90deg, ${Theme.palette.primary.main} 0%, ${Theme.palette.secondary.main} 100%)`,
                borderRadius: '2px'
              }
            }}
          >
            Popular genres
          </Typography>
          <Grid container spacing={isMobile ? 2 : 3}>
            {genres.map((genre) => (
              <Grid item xs={6} sm={4} md={2} key={genre.name} sx={{margin: 'auto'}}>
                <Box
                  onClick={() => handleGenreClick(genre.name)}
                  sx={{
                    width: '10rem',
                    bgcolor: genre.color + '20',
                    borderRadius: 2,
                    p: isMobile ? 2 : 3,
                    textAlign: 'center',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)'
                    },
                    cursor: 'pointer'
                  }}
                >
                  <FiberManualRecord sx={{
                    color: genre.color,
                    fontSize: isMobile ? 30 : 40,
                    mb: 1
                  }} />
                  <Typography
                    variant={isMobile ? 'subtitle1' : 'h6'}
                    sx={{
                      fontSize: isMobile ? '0.875rem' : '1.25rem'
                    }}
                  >
                    {genre.name}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Top Shows - Responsive with Slider */}
        <Container maxWidth="xl" sx={{ py: 4, mb: isMobile ? 4 : 6 }}>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{
              fontWeight: 700,
              mb: 4,
              fontSize: isMobile ? '1.5rem' : '2.125rem',
              textAlign: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                background: `linear-gradient(90deg, ${Theme.palette.primary.main} 0%, ${Theme.palette.secondary.main} 100%)`,
                borderRadius: '2px'
              }
            }}
          >
            Top shows this week
          </Typography>

          <Box sx={{
            px: isMobile ? 0 : 2,
            '& .slick-slide': {
              px: isMobile ? 1 : 2
            },
            '& .slick-dots': {
              bottom: isMobile ? -30 : -40
            },
            '& .slick-dots li button:before': {
              color: Theme.palette.primary.main
            },
            '& .slick-track': {
              display: 'flex',
              alignItems: 'stretch'
            },
            '& .slick-slide': {
              height: 'auto',
              '& > div': {
                height: '100%'
              }
            }
          }}>
            <Slider {...sliderSettings}>
              {topShows.map((show) => (
                <Box key={show.title} sx={{ padding: isMobile ? 1 : 2, height: '100%' }}>
                  <Card sx={{
                    background: Theme.palette.background.paper,
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)'
                    }

                  }}>
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
                        backgroundSize: '400% 400%',
                        animation: 'gradient 15s ease infinite',
                        '@keyframes gradient': {
                          '0%': { backgroundPosition: '0% 50%' },
                          '50%': { backgroundPosition: '100% 50%' },
                          '100%': { backgroundPosition: '0% 50%' }
                        }
                      }}
                    />
                    <CardContent sx={{
                      flexGrow: 1,
                      p: isMobile ? 1.5 : 2
                    }}>
                      <Typography
                        gutterBottom
                        variant={isMobile ? 'h6' : 'h5'}
                        component="div"
                        sx={{
                          fontSize: isMobile ? '1rem' : '1.25rem'
                        }}
                      >
                        {show.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 1,
                          fontSize: isMobile ? '0.75rem' : '0.875rem'
                        }}
                      >
                        Hosted by {show.host}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          fontSize: isMobile ? '0.75rem' : '0.875rem'
                        }}
                      >
                        {show.category} • {show.listeners} listeners
                      </Typography>
                    </CardContent>
                    <Box sx={{
                      p: isMobile ? 1 : 2,
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}>
                      <Button
                        size={isMobile ? 'small' : 'medium'}
                        startIcon={<PlayArrow fontSize={isMobile ? 'small' : 'medium'} />}
                        color="primary"
                        sx={{
                          fontSize: isMobile ? '0.75rem' : '0.875rem'
                        }}
                      >
                        Listen Now
                      </Button>
                      <IconButton
                        aria-label="add to favorites"
                        size={isMobile ? 'small' : 'medium'}
                      >
                        <FavoriteBorder fontSize={isMobile ? 'small' : 'medium'} />
                      </IconButton>
                    </Box>
                  </Card>
                </Box>
              ))}
            </Slider>
          </Box>
        </Container>


        {/* Recent Episodes Section - Matching Top Shows Style */}
        <Container maxWidth="xl" sx={{ py: 4, mb: isMobile ? 4 : 6 }}>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{
              fontWeight: 700,
              mb: 4,
              fontSize: isMobile ? '1.5rem' : '2.125rem',
              textAlign: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80px',
                height: '4px',
                background: `linear-gradient(90deg, 
          ${Theme.palette.primary.main} 0%, 
          ${Theme.palette.secondary.main} 100%)`,
                borderRadius: '2px',
                opacity: Theme.palette.mode === 'dark' ? 1 : 0.8
              }
            }}
          >
            Recent Episodes
          </Typography>

          <Box sx={{
            px: isMobile ? 0 : 2,
            '& .slick-slide': {
              px: isMobile ? 1 : 2
            },
            '& .slick-track': {
              display: 'flex',
              alignItems: 'stretch'
            },
            '& .slick-dots li button:before': {
              color: Theme.palette.primary.main
            },
            '& .slick-slide': {
              height: 'auto',
              '& > div': {
                height: '100%'
              }
            }
          }}>
            <Slider {...{
              ...sliderSettings,
              slidesToShow: isMobile ? 1 : 4,
              slidesToScroll: isMobile ? 1 : 2,
              responsive: [
                {
                  breakpoint: Theme.breakpoints.values.lg,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2
                  }
                },
                {
                  breakpoint: Theme.breakpoints.values.md,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false
                  }
                },
                {
                  breakpoint: Theme.breakpoints.values.sm,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px'
                  }
                }
              ]
            }}>
              {topShows.map((show) => (
                <Box key={`episode-${show.title}`} sx={{
                  padding: isMobile ? 1 : 2,
                  height: '100%',
                  width: isMobile ? 300 : 'auto'
                }}>
                  <Link
                    to={`/episode/${show.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Card sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                      background: Theme.palette.background.paper,
                      border: `1px solid ${Theme.palette.divider}`,
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: Theme.palette.mode === 'dark'
                          ? `0 8px 32px ${Theme.palette.primary.main}30`
                          : `0 8px 24px ${Theme.palette.primary.main}15`
                      }
                    }}>
                      <CardMedia
                        component="img"
                        height={180}
                        image={show.image}
                        alt={show.title}
                        sx={{
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(45deg, 
                    ${Theme.palette.primary.main}${Theme.palette.mode === 'dark' ? '30' : '15'}, 
                    ${Theme.palette.secondary.main}${Theme.palette.mode === 'dark' ? '30' : '15'})`,
                            mixBlendMode: Theme.palette.mode === 'dark' ? 'soft-light' : 'multiply'
                          }
                        }}
                      />
                      <CardContent sx={{
                        flexGrow: 1,
                        p: isMobile ? 1.5 : 2,
                        background: Theme.palette.mode === 'dark'
                          ? `linear-gradient(180deg, 
                    ${Theme.palette.primary.light}05, 
                    ${Theme.palette.primary.main}15)`
                          : `linear-gradient(180deg, 
                    ${Theme.palette.primary.light}03, 
                    ${Theme.palette.primary.light}08)`
                      }}>
                        <Typography gutterBottom variant="h6" component="div">
                          {show.title}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mb: 1, flexWrap: 'wrap' }}>
                          <Typography variant="caption" sx={{
                            background: Theme.palette.action.hover,
                            px: 1,
                            borderRadius: 1,
                            color: Theme.palette.mode === 'dark'
                              ? 'primary.light'
                              : 'primary.dark'
                          }}>
                            New Episode
                          </Typography>
                          <Typography variant="caption" sx={{
                            background: Theme.palette.action.hover,
                            px: 1,
                            borderRadius: 1,
                            color: Theme.palette.mode === 'dark'
                              ? 'secondary.light'
                              : 'secondary.dark'
                          }}>
                            45 min
                          </Typography>
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {show.host}
                        </Typography>
                      </CardContent>
                      <Box sx={{
                        p: isMobile ? 1 : 2,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        background: Theme.palette.action.selected
                      }}>
                        <Button
                          startIcon={<PlayArrow />}
                          size="small"
                          sx={{
                            background: `linear-gradient(45deg, 
                    ${Theme.palette.primary.main} 0%, 
                    ${Theme.palette.secondary.main} 100%)`,
                            color: Theme.palette.primary.contrastText,
                            '&:hover': {
                              transform: 'scale(1.05)',
                              boxShadow: `0 4px 12px ${Theme.palette.primary.main}30`
                            }
                          }}
                        >
                          Play Now
                        </Button>
                        <Typography variant="caption" color="text.secondary" sx={{ opacity: 0.8 }}>
                          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </Typography>
                      </Box>
                    </Card>
                  </Link>
                </Box>
              ))}
            </Slider>
          </Box>
        </Container>

        <Container maxWidth="xl" sx={{ py: 4, mb: isMobile ? 4 : 6, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', }}>
          <Typography
            variant={isMobile ? 'h5' : 'h4'}
            sx={{
              fontWeight: 700,
              mb: 4,
              fontSize: isMobile ? '1.5rem' : '2.125rem',
              textAlign: 'center',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '2px',
                background: `linear-gradient(90deg, transparent 0%, ${Theme.palette.primary.main} 50%, transparent 100%)`,
                opacity: 0.6
              }
            }}
          >
            Why Podcastino?
          </Typography>

          <Grid container spacing={isMobile ? 2 : 3}>
            {[1, 2, 3].map((item) => (
              <Grid item xs={12} md={4} key={item}>
                <Card sx={{
                  display: "flex",
                  alignItems: "center",
                  p: 2,
                  minHeight: 240,
                  background: Theme.palette.background.paper,
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(236, 226, 226, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 24px ${Theme.palette.primary.main}20`
                  },
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: '-40%',
                    left: '-40%',
                    width: '200%',
                    height: '200%',
                    background: `radial-gradient(circle at 50% 50%, 
              ${Theme.palette.primary.main}10 0%, 
              transparent 70%)`,
                    animation: 'floatEffect 15s infinite linear'
                  }
                }}>
                  <Box sx={{
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                  }}>
                    {/* Animated Icon */}
                    <Box sx={{
                      fontSize: '2.5rem',
                      mb: 1,
                      animation: 'pulse 3s ease-in-out infinite',
                      '@keyframes pulse': {
                        '0%, 100%': { transform: 'scale(1)', opacity: 0.8 },
                        '50%': { transform: 'scale(1.1)', opacity: 1 }
                      }
                    }}>
                      {['🌌', '🎧', '✨'][item - 1]}
                    </Box>

                    <Typography variant="h6" sx={{
                      mb: 1,
                      fontWeight: 600,
                      background: `linear-gradient(45deg, 
                ${Theme.palette.primary.light}, 
                ${Theme.palette.secondary.light})`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}>
                      {['Curated Journeys', 'Pure Sound', 'Smart Features'][item - 1]}
                    </Typography>

                    <Typography variant="body2" sx={{
                      opacity: 0.9,
                      fontSize: '0.9rem',
                      px: 2
                    }}>
                      {[
                        'AI-curated recommendations that evolve with your listening habits',
                        'Immersive spatial audio with adaptive noise balancing',
                        'Smart sleep timers & personalized playlists'
                      ][item - 1]}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Call to Action - Responsive */}
        <Box sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: isMobile ? 4 : 8,
          textAlign: 'center'
        }}>
          <Container maxWidth="md">
            <Typography
              variant={isMobile ? 'h4' : 'h3'}
              sx={{
                fontWeight: 700,
                mb: 3,
                fontSize: isMobile ? '1.5rem' : '2.5rem'
              }}
            >
              Ready to start listening?
            </Typography>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              sx={{
                mb: 4,
                fontSize: isMobile ? '1rem' : '1.5rem'
              }}
            >
              Join millions of podcast enthusiasts today.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size={isMobile ? 'medium' : 'large'}
              sx={{
                px: isMobile ? 4 : 6,
                py: isMobile ? 1 : 1.5,
                fontSize: isMobile ? '0.875rem' : '1.1rem',
                fontWeight: 600
              }}
            >
              Sign Up Free
            </Button>
          </Container>
        </Box>

        {/* Footer - Responsive */}
        <Divider sx={{ my: isMobile ? 2 : 4 }} />
        <Container maxWidth="lg" sx={{ py: isMobile ? 2 : 3 }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? 2 : 4,
            flexWrap: isMobile ? 'wrap' : 'nowrap'
          }}>
            <Button size="small">Privacy Policy</Button>
            <Button size="small">Terms of Service</Button>
            <Button size="small">Contact Us</Button>
          </Box>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            sx={{
              mt: 2,
              fontSize: isMobile ? '0.75rem' : '0.875rem'
            }}
          >
            © {new Date().getFullYear()} Podcastino. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};