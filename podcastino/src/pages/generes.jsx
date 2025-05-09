import React, { useState ,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  AppBar,
  Stack,
  TextField,
  Container,
  Divider,
  Grid,
  IconButton, // Added this import
  Tab,
  Tabs,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
import {
  PlayArrow,
  FavoriteBorder,
  Share,
  Search,
  Mic as PodcastIcon
} from '@mui/icons-material';

// Deep Purple Theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#673ab7',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

const ShowsPage = () => {
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
  const shows = [
    {
      id: 1,
      title: 'TechTalk',
      host: 'Sarah Johnson',
      category: 'Technology',
      subscribers: '125K',
      episodes: 42,
      description: 'Weekly discussions about technology and innovation',
      image: 'https://source.unsplash.com/3wylDrjxH-E/300x300' // Technology podcast
    },
    {
      id: 2,
      title: 'Business Insights',
      host: 'Mark Williams',
      category: 'Business',
      subscribers: '87K',
      episodes: 28,
      description: 'Interviews with business leaders and entrepreneurs',
      image: 'https://source.unsplash.com/0PxQ8yhqQe0/300x300' // Business meeting
    },
    {
      id: 3,
      title: 'Science Weekly',
      host: 'Dr. Emily Chen',
      category: 'Science',
      subscribers: '54K',
      episodes: 15,
      description: 'Exploring the latest scientific discoveries',
      image: 'https://source.unsplash.com/7okkFhxrxNw/300x300' // Science lab
    },
    {
      id: 4,
      title: 'Health Matters',
      host: 'Dr. James Wilson',
      category: 'Health',
      subscribers: '92K',
      episodes: 36,
      description: 'Your guide to better health and wellness',
      image: 'https://source.unsplash.com/zqe6M3pze-M/300x300' // Yoga health
    },
    {
      id: 5,
      title: 'Comedy Hour',
      host: 'Mike & Dave',
      category: 'Entertainment',
      subscribers: '210K',
      episodes: 78,
      description: 'Laugh out loud with our weekly comedy show',
      image: 'https://source.unsplash.com/8CqDvPuo_kI/300x300' // Comedy theater
    },
    {
      id: 6,
      title: 'Daily News',
      host: 'The News Team',
      category: 'News',
      subscribers: '350K',
      episodes: 365,
      description: 'Your daily dose of world news',
      image: 'https://source.unsplash.com/7okkFhxrxNw/300x300' // News studio
    },
    {
      id: 7,
      title: 'True Crime',
      host: 'Jessica Brown',
      category: 'True Crime',
      subscribers: '180K',
      episodes: 55,
      description: 'Investigating unsolved mysteries and cold cases',
      image: 'https://source.unsplash.com/3d5-ajZ72sw/300x300' // Mystery
    },
    {
      id: 8,
      title: 'Startup Stories',
      host: 'Kevin Zhang',
      category: 'Business',
      subscribers: '68K',
      episodes: 22,
      description: 'Behind the scenes of successful startups',
      image: 'https://source.unsplash.com/OG44d93iNJk/300x300' // Startup office
    },
    {
      id: 9,
      title: 'Climate Now',
      host: 'Environmental Team',
      category: 'Science',
      subscribers: '89K',
      episodes: 34,
      description: 'Understanding climate change and solutions',
      image: 'https://source.unsplash.com/nN1HSDtKdlw/300x300' // Climate change
    },
    {
      id: 10,
      title: 'Mindful Living',
      host: 'Rachel Green',
      category: 'Health',
      subscribers: '145K',
      episodes: 47,
      description: 'Meditation and mental wellness techniques',
      image: 'https://source.unsplash.com/2EJCSULRwC8/300x300' // Meditation
    }
  ];

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredShows = tabValue === 0 
    ? shows 
    : shows.filter(show => show.category === genres[tabValue].name);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="default" elevation={1}>
          <Container maxWidth="xl">
            <Stack direction="row" alignItems="center" py={2}>
              <Typography variant="h4" sx={{ fontWeight: 700, mr: 4, color: 'primary.main' }}>
                PODCASTINO
              </Typography>
              
              <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
                <Button color="inherit">Discover</Button>
                <Button color="inherit">Genres</Button>
                <Button color="inherit">Top Shows</Button>
              </Box>
              
              <Box sx={{ flexGrow: 1 }} />
              
              <TextField
                size="small"
                placeholder="Search podcasts..."
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1 }} />,
                }}
                sx={{ width: 250, mr: 2, display: { xs: 'none', sm: 'block' } }}
              />
              
              <Button href="/signup" variant="contained" color="primary" sx={{ mr: 2 }}>
                Sign In
              </Button>
            </Stack>
          </Container>
        </AppBar>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Page Header */}
        <Box sx={{ 
  mb: 4,
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    '& .floating-particle': {
      transform: 'translateY(-10px)'
    }
  }
}}>
  {/* Floating particles */}
  {[...Array(5)].map((_, index) => (
    <Box
      key={index}
      className="floating-particle"
      sx={{
        position: 'absolute',
        width: 8,
        height: 8,
        background: `radial-gradient(${theme.palette.primary.main}, transparent)`,
        borderRadius: '50%',
        opacity: 0.3,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animation: `float ${8 + index}s infinite ease-in-out`,
        transition: 'all 0.3s',
        '@keyframes float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        }
      }}
    />
  ))}

  <Typography variant="h3" sx={{ 
    fontWeight: 700, 
    mb: 1,
    position: 'relative',
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'titleGlow 3s ease-in-out infinite alternate',
    '@keyframes titleGlow': {
      '0%': { 
        textShadow: `0 0 10px ${theme.palette.primary.main}40`,
        opacity: 0.9
      },
      '100%': { 
        textShadow: `0 0 30px ${theme.palette.primary.main}80`,
        opacity: 1
      }
    }
  }}>
    Discover Podcasts
  </Typography>

  <Typography variant="body1" sx={{ 
    color: 'text.secondary',
    position: 'relative',
    animation: 'subtitleEnter 1.5s ease-out',
    '&::before': {
      content: '""',
      position: 'absolute',
      bottom: -4,
      left: 0,
      width: '40%',
      height: '1px',
      background: `linear-gradient(90deg, ${theme.palette.primary.main}00, ${theme.palette.primary.main} 50%, ${theme.palette.primary.main}00)`,
      animation: 'lineReveal 1.2s ease-out forwards',
      '@keyframes lineReveal': {
        '0%': { width: 0, opacity: 0 },
        '100%': { width: '40%', opacity: 0.3 }
      }
    },
    '@keyframes subtitleEnter': {
      '0%': { 
        opacity: 0,
        transform: 'translateY(10px)'
      },
      '100%': { 
        opacity: 1,
        transform: 'translateY(0)'
      }
    }
  }}>
    Browse through thousands of podcasts in different categories
  </Typography>
</Box>

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
        <Grid container spacing={3}>
          {filteredShows.map((show) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={show.id}>
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
  sx={{
    height: 200,
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
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {show.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Hosted by {show.host}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {show.description}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip 
                      label={show.category} 
                      size="small" 
                      color="primary"
                      variant="outlined"
                    />
                    <Chip 
                      label={`${show.episodes} episodes`} 
                      size="small" 
                    />
                  </Box>
                </CardContent>
                <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  p: 2,
                  bgcolor: 'background.paper'
                }}>
                  <Typography variant="body2" color="text.secondary">
                    {show.subscribers} subscribers
                  </Typography>
                  <Box>
                    <IconButton size="small" sx={{ mr: 1 }}>
                      <PlayArrow />
                    </IconButton>
                    <IconButton size="small" sx={{ mr: 1 }}>
                      <FavoriteBorder />
                    </IconButton>
                    <IconButton size="small">
                      <Share />
                    </IconButton>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Empty State */}
        {filteredShows.length === 0 && (
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
          borderRadius: 2,
          bgcolor: 'background.paper'
        }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Have a podcast to share?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
            Join our community of creators and share your voice with millions of listeners worldwide.
          </Typography>
          <Button variant="contained" size="large">
            Start Your Podcast
          </Button>
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
    </ThemeProvider>
  );
};

export default ShowsPage;