import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { shows } from './Data/Mockdata';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import {
  PlayArrow,
  FavoriteBorder,
  Mic as PodcastIcon
} from '@mui/icons-material';

function Generes({ isMobile, isTablet }) {
  const theme = useTheme();
  const location = useLocation();
  const [tabValue, setTabValue] = useState(0);

  // Get genre list that matches both pages
  const genres = [
    { id: 0, name: 'All' },
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Business' },
    { id: 3, name: 'Science' },
    { id: 4, name: 'Health' },
    { id: 5, name: 'Entertainment' },
    { id: 6, name: 'News' },
    { id: 7, name: 'True Crime' } // Added to match landing page
  ];
  useEffect(() => {
    if (location.state?.selectedGenre) {
      const selectedGenre = genres.find(
        genre => genre.name === location.state.selectedGenre
      );
      if (selectedGenre) {
        setTabValue(selectedGenre.id);
      }
    }
  }, [location.state]);
  

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredShows = tabValue === 0
    ? shows
    : shows.filter(show => show.category === genres[tabValue].name);

  return (
      <>
      <Container maxWidth="xl" sx={{ py: 4 }}>

        {/* Genre Tabs */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 4 }}
        >
          {genres.map((genre) => (
            <Tab
              key={genre.id}
              label={genre.name}
              sx={{
                textTransform: 'none',
                fontWeight: tabValue === genre.id ? 600 : 400
              }}
            />
          ))}
        </Tabs>

        {/* Shows Grid */}
        {/* Shows Grid - Scrolling Rows */}
        {/* Shows Grid - Infinite Scrolling Rows */}
        {filteredShows.length > 0 ? (
          <Box sx={{ overflow: 'hidden', position: 'relative' }}>
            {/* Edge Fade Effect */}
            <Box sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              pointerEvents: 'none',
              background: `linear-gradient(90deg, 
    ${theme.palette.background.default} 0%, 
    transparent 5%, 
    transparent 95%, 
    ${theme.palette.background.default} 100%)`,

              zIndex: 1
            }} />

            {/* First Row - Left Scroll */}
            <Box sx={{
              mb: 4,
              overflowX: 'hidden',
              '&:hover .scroll-left': { animationPlayState: 'paused' }
            }}>
              <Grid container spacing={3} sx={{
                display: 'inline-flex',
                flexWrap: 'nowrap',
                animation: 'scrollLeft 40s linear infinite',
                '@keyframes scrollLeft': {
                  '0%': { transform: 'translateX(0)' },
                  '100%': { transform: 'translateX(-50%)' }
                }
              }} className="scroll-left">
                {[...filteredShows, ...filteredShows].map((show, index) => (
                  <Grid item key={`left-${index}`} sx={{ minWidth: 300, height: 350 }}>
                    <Card sx={{

                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6,

                      }
                    }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={show.image}
                        alt={show.title}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6">{show.title}</Typography>
                        <Chip
                          label={`★ ${(Math.random() * 0.5 + 4.5).toFixed(1)}`}
                          size="small"
                          sx={{ mb: 1, bgcolor: 'primary.light', color: 'primary.contrastText' }}
                        />
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {show.description}
                        </Typography>
                      </CardContent>
                      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                          size="small"
                          startIcon={<PlayArrow />}
                          sx={{ color: 'primary.main' }}
                        >
                          Play
                        </Button>
                        <Button
                          size="small"
                          startIcon={<FavoriteBorder />}
                          sx={{ color: 'secondary.main' }}
                        >
                          Save
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Second Row - Right Scroll */}
            <Box sx={{
              mb: 4,
              overflowX: 'hidden',
              '&:hover .scroll-right': { animationPlayState: 'paused' }
            }}>
              <Grid container spacing={3} sx={{
                display: 'inline-flex',
                flexWrap: 'nowrap',
                animation: 'scrollRight 45s linear infinite',
                '@keyframes scrollRight': {
                  '0%': { transform: 'translateX(-50%)' },
                  '100%': { transform: 'translateX(0)' }
                }
              }} className="scroll-right">
                {[...filteredShows, ...filteredShows].reverse().map((show, index) => (
                  <Grid item key={`right-${index}`} sx={{ minWidth: 300, height: 350 }}>
                    <Card sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6
                      }
                    }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={show.image}
                        alt={show.title}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6">{show.title}</Typography>
                        <Chip
                          label={`${show.episodes}+ Episodes`}
                          size="small"
                          sx={{ mb: 1, bgcolor: 'secondary.light', color: 'secondary.contrastText' }}
                        />
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {show.description}
                        </Typography>
                      </CardContent>
                      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                          size="small"
                          startIcon={<PlayArrow />}
                          sx={{ color: 'primary.main' }}
                        >
                          Play
                        </Button>
                        <Button
                          size="small"
                          startIcon={<FavoriteBorder />}
                          sx={{ color: 'secondary.main' }}
                        >
                          Save
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Third Row - Left Scroll */}
            <Box sx={{
              overflowX: 'hidden',
              '&:hover .scroll-left2': { animationPlayState: 'paused' }
            }}>
              <Grid container spacing={3} sx={{
                display: 'inline-flex',
                flexWrap: 'nowrap',
                animation: 'scrollLeft 35s linear infinite',
              }} className="scroll-left2">
                {[...filteredShows, ...filteredShows].map((show, index) => (
                  <Grid item key={`left2-${index}`} sx={{ minWidth: 300, height: 350 }}>
                    <Card sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6
                      }
                    }}>
                      <CardMedia
                        component="img"
                        height="140"
                        image={show.image}
                        alt={show.title}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography gutterBottom variant="h6">{show.title}</Typography>
                        <Chip
                          label={`Host: ${show.host}`}
                          size="small"
                          sx={{ mb: 1, bgcolor: 'primary.dark', color: 'primary.contrastText' }}
                        />
                        <Typography variant="body2" color="text.secondary" paragraph>
                          {show.description}
                        </Typography>
                      </CardContent>
                      <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                        <Button
                          size="small"
                          startIcon={<PlayArrow />}
                          sx={{ color: 'primary.main' }}
                        >
                          Play
                        </Button>
                        <Button
                          size="small"
                          startIcon={<FavoriteBorder />}
                          sx={{ color: 'secondary.main' }}
                        >
                          Save
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        ) : (

          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            py: 10,
            textAlign: 'center'
          }}>
            <PodcastIcon sx={{ fontSize: 60, mb: 2, color: 'text.secondary' }} />
            <Typography variant="h6" sx={{ mb: 1 }}>
              No shows found in this category
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              We couldn't find any podcasts matching this genre.
            </Typography>
            <Button variant="outlined">
              Browse all shows
            </Button>
          </Box>
        )}


        <Divider sx={{ my: 6 }} />

        {/* Call to Action */}
        <Box sx={{
          textAlign: 'center',
          p: 4,
          borderRadius: 4,
          position: 'relative',
          overflow: 'hidden',
          background: `linear-gradient(
    145deg,
    ${theme.palette.primary.main}20,
    ${theme.palette.secondary.main}20,
    ${theme.palette.background.paper}
  )`,
          border: `1px solid ${theme.palette.primary.main}30`,
          boxShadow: `0 8px 32px ${theme.palette.primary.main}20`,
          transform: 'translateZ(0)',
          transition: 'all 0.4s ease',
          '&:hover': {
            transform: 'translateZ(10px)',
            boxShadow: `0 12px 40px ${theme.palette.primary.main}30`
          }
        }}>
          {/* Floating Particles */}
          {[...Array(6)].map((_, index) => (
            <Box key={index} sx={{
              position: 'absolute',
              width: 40,
              height: 40,
              background: `linear-gradient(
    145deg,
    ${theme.palette.primary.main}${theme.mode === 'dark' ? '20' : '08'},
    ${theme.palette.secondary.main}${theme.mode === 'dark' ? '20' : '08'},
    ${theme.palette.background.paper}
  )`,
              border: `1px solid ${theme.palette.primary.main}${theme.mode === 'dark' ? '30' : '10'}`,
              boxShadow: `0 8px 32px ${theme.palette.primary.main}${theme.mode === 'dark' ? '20' : '08'}`,
              borderRadius: '50%',
              animation: `float ${8 + index}s infinite ease-in-out`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.4,
              '@keyframes float': {
                '0%, 100%': { transform: 'translateY(0) scale(1)' },
                '50%': { transform: 'translateY(-20px) scale(0.9)' }
              }
            }} />
          ))}

          {/* Animated Text */}
          <Typography variant="h5" sx={{
            fontWeight: 800,
            mb: 2,
            position: 'relative',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'textGlow 2s ease-in-out infinite alternate',
            '@keyframes textGlow': {
              '0%': { textShadow: '0 0 10px rgba(103,58,183,0.3)' },
              '100%': { textShadow: '0 0 20px rgba(103,58,183,0.6)' }
            }
          }}>
            Have a podcast to share?
          </Typography>

          {/* Animated Icon */}
          <Box sx={{
            fontSize: 64,
            mb: 2,
            color: theme.palette.primary.main,
            animation: 'floatIcon 3s ease-in-out infinite',
            '@keyframes floatIcon': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-10px)' }
            }
          }}>
            🎙️
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{
            mb: 3,
            maxWidth: 600,
            mx: 'auto',
            position: 'relative',
            fontSize: '1.1rem'
          }}>
            Join our vibrant community of creators and amplify your voice to millions of eager listeners worldwide 🌍
          </Typography>

          {/* Animated Button */}
          <Button
            variant="contained"
            size="large"
            sx={{
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              '&::before': {
                background: `linear-gradient(
      120deg,
      transparent,
      rgba(${theme.mode === 'dark' ? '255,255,255' : '0,0,0'},0.3),
      transparent
    )`
              },

              px: '6',
              py: '1',
              transform: 'translateZ(0)',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-2px) scale(1.05)',
                boxShadow: `0 8px 24px ${theme.palette.primary.main}40`
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: '-100%',
                width: '200%',
                height: '100%',
                background: `linear-gradient(
          120deg,
          transparent,
          rgba(255,255,255,0.3),
          transparent
        )`,
                animation: 'shine 3s infinite',
                '@keyframes shine': {
                  '0%': { left: '-100%' },
                  '100%': { left: '100%' }
                }
              }
            }}
          >
            Start Your Journey
          </Button>

          {/* Border Animation */}
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: 4,
            animation: 'borderRotate 6s linear infinite',
            pointerEvents: 'none',
            background: `linear-gradient(
      45deg,
      ${theme.palette.primary.main}30,
      ${theme.palette.secondary.main}30,
      ${theme.palette.primary.main}30
    )`,
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            padding: '1px',
            '@keyframes borderRotate': {
              '100%': { transform: 'rotate(360deg)' }
            }
          }} />
        </Box>

        <Divider sx={{ my: 4 }} />
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
            <Button size="small">Privacy Policy</Button>
            <Button size="small">Terms of Service</Button>
            <Button size="small">Contact Us</Button>
          </Box>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
            © {new Date().getFullYear()} Podcastino. All rights reserved.
          </Typography>
        </Container>
      </Container>
    </>
  );
};

export default Generes;