import React from "react";
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
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
  TextField,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper
} from "@mui/material";
import {
  Search,
  PlayArrow,
  FavoriteBorder,
  Mic,
  Headphones,
  Subscriptions,
  Share,
  QueueMusic,
  TrendingUp,
  Star,
  Download,
} from "@mui/icons-material";

// Deep Purple Theme
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
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});

// Sample data
const genres = [
  { name: "True Crime", color: "#ff5252", icon: <Mic /> },
  { name: "Comedy", color: "#ffeb3b", icon: <QueueMusic /> },
  { name: "News", color: "#4caf50", icon: <TrendingUp /> },
  { name: "Business", color: "#2196f3", icon: <TrendingUp /> },
  { name: "Technology", color: "#9c27b0", icon: <Headphones /> },
  { name: "Health", color: "#00bcd4", icon: <Subscriptions /> },
];

const topShows = [
  {
    title: "Serial",
    host: "Sarah Koenig",
    category: "True Crime",
    listeners: "2.5M",
    image: "https://images.unsplash.com/photo-1593697909683-bccb1b9e68a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    episodes: 32,
    rating: 4.9
  },
  {
    title: "The Daily",
    host: "The New York Times",
    category: "News",
    listeners: "1.8M",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    episodes: 45,
    rating: 4.8
  },
  {
    title: "How I Built This",
    host: "Guy Raz",
    category: "Business",
    listeners: "1.2M",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    episodes: 28,
    rating: 4.7
  },
];

const featuredEpisodes = [
  {
    title: "The Mystery of the Missing Heiress",
    show: "Serial",
    duration: "42 min",
    date: "2 days ago",
    image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "Market Trends 2023",
    show: "The Daily",
    duration: "28 min",
    date: "1 day ago",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    title: "Interview with Elon Musk",
    show: "How I Built This",
    duration: "56 min",
    date: "3 days ago",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
];

const popularHosts = [
  {
    name: "Sarah Koenig",
    shows: ["Serial", "This American Life"],
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Guy Raz",
    shows: ["How I Built This", "TED Radio Hour"],
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Joe Rogan",
    shows: ["The Joe Rogan Experience"],
    image: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
];

const Home = () => {
  const navigate = useNavigate();

  const handleShowClick = (show) => {
    navigate(`/podcast/${show.title.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const handleGenreClick = (genre) => {
    navigate(`/genre/${genre.name.toLowerCase()}`);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        {/* Navigation Bar */}
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
                <Button color="inherit">Hosts</Button>
                <Button color="inherit">New Releases</Button>
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

        {/* Hero Section */}
        <Box sx={{ py: 10, mb: 6 }}>
          <Container maxWidth="xl">
            <Grid container spacing={6} alignItems="center">
              <Grid item xs={12} md={6}>
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 3 }}>
                  Discover Your Next Favorite Podcast
                </Typography>
                <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
                  Thousands of podcasts at your fingertips. Listen anytime, anywhere.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" color="primary" size="large">
                    Start Listening
                  </Button>
                  <Button variant="outlined" size="large">
                    Browse Shows
                  </Button>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 6 }}>
                  <img
                    src="https://images.unsplash.com/photo-1593698058536-25d0a62e1a2b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                    alt="Featured Podcasts"
                    style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Popular Genres */}
        <Container maxWidth="xl" sx={{ py: 4, mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
            Popular Genres
          </Typography>

          <Grid container spacing={3}>
            {genres.map((genre) => (
              <Grid item xs={6} sm={4} md={2} key={genre.name}>
                <Box
                  onClick={() => handleGenreClick(genre)}
                  sx={{
                    bgcolor: genre.color + '20',
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <Box sx={{
                    color: genre.color,
                    fontSize: 40,
                    mb: 1,
                    display: 'flex',
                    justifyContent: 'center'
                  }}>
                    {genre.icon}
                  </Box>
                  <Typography variant="h6">{genre.name}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Top Shows */}
        <Container maxWidth="xl" sx={{ py: 4, mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
            Top Shows This Week
          </Typography>

          <Grid container spacing={4}>
            {topShows.map((show) => (
              <Grid item xs={12} sm={6} md={4} key={show.title}>
                <Card
                  onClick={() => handleShowClick(show)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      cursor: 'pointer'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={show.image}
                    alt={show.title}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="div">
                      {show.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Hosted by {show.host}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                      <Chip label={show.category} size="small" />
                      <Chip icon={<Headphones />} label={show.listeners} size="small" />
                      <Chip icon={<Star />} label={show.rating} size="small" />
                    </Stack>
                    <Typography variant="body2" color="text.secondary">
                      {show.episodes} episodes
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button size="small" startIcon={<PlayArrow />} color="primary">
                      Listen Now
                    </Button>
                    <Box>
                      <IconButton aria-label="add to favorites">
                        <FavoriteBorder />
                      </IconButton>
                      <IconButton aria-label="share">
                        <Share />
                      </IconButton>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Featured Episodes */}
        <Container maxWidth="xl" sx={{ py: 4, mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
            Featured Episodes
          </Typography>

          <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
            <List>
              {featuredEpisodes.map((episode, index) => (
                <React.Fragment key={episode.title}>
                  <ListItem
                    secondaryAction={
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="body2" color="text.secondary">
                          {episode.duration}
                        </Typography>
                        <IconButton edge="end" aria-label="play">
                          <PlayArrow />
                        </IconButton>
                        <IconButton edge="end" aria-label="download">
                          <Download />
                        </IconButton>
                      </Stack>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        variant="rounded"
                        src={episode.image}
                        sx={{ width: 80, height: 80, mr: 2 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" component="div">
                          {episode.title}
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography variant="body2" color="text.secondary">
                            {episode.show}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {episode.date}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  {index < featuredEpisodes.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Container>

        {/* Popular Hosts */}
        <Container maxWidth="xl" sx={{ py: 4, mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
            Popular Hosts
          </Typography>

          <Grid container spacing={4}>
            {popularHosts.map((host) => (
              <Grid item xs={12} sm={6} md={4} key={host.name}>
                <Card sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  p: 3,
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.03)'
                  }
                }}>
                  <Avatar
                    src={host.image}
                    sx={{
                      width: 120,
                      height: 120,
                      mb: 3,
                      border: `4px solid ${theme.palette.primary.main}`
                    }}
                  />
                  <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                    {host.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {host.shows.join(", ")}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<Mic />}
                  >
                    Follow
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* App Features */}
        <Container maxWidth="xl" sx={{ py: 4, mb: 6 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 6, textAlign: 'center' }}>
            Why Choose Podcastino?
          </Typography>

          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ borderRadius: 2, overflow: 'hidden', boxShadow: 6 }}>
                <img
                  src=""
                  alt="Podcastino App"
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={4}>
                {[
                  {
                    icon: <Headphones color="primary" sx={{ fontSize: 40 }} />,
                    title: "Unlimited Listening",
                    description: "Access to millions of podcasts with no limits or restrictions."
                  },
                  {
                    icon: <Download color="primary" sx={{ fontSize: 40 }} />,
                    title: "Offline Downloads",
                    description: "Download episodes to listen when you're offline."
                  },
                  {
                    icon: <QueueMusic color="primary" sx={{ fontSize: 40 }} />,
                    title: "Personalized Playlists",
                    description: "Create custom playlists of your favorite episodes."
                  },
                  {
                    icon: <TrendingUp color="primary" sx={{ fontSize: 40 }} />,
                    title: "Trending Content",
                    description: "Discover what's popular and trending in the podcast world."
                  }
                ].map((feature, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 2 }}>
                      {feature.icon}
                      <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>{feature.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>

        {/* Call to Action */}
        <Box sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: 8,
          textAlign: 'center'
        }}>
          <Container maxWidth="md">
            <Typography variant="h3" sx={{ fontWeight: 700, mb: 3 }}>
              Ready to start listening?
            </Typography>
            <Typography variant="h5" sx={{ mb: 4 }}>
              Join millions of podcast enthusiasts today.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{
                px: 6,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600
              }}
            >
              Sign Up Free
            </Button>
          </Container>
        </Box>

        {/* Footer */}
        <Divider sx={{ my: 4 }} />
        <Container maxWidth="lg" sx={{ py: 3 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={3}>
              <Typography variant="h6" sx={{ mb: 2 }}>PODCASTINO</Typography>
              <Typography variant="body2" color="text.secondary">
                The best platform for podcast lovers. Discover, listen, and share your favorite shows.
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>Discover</Typography>
              <Stack spacing={1}>
                <Button size="small" color="inherit">Popular</Button>
                <Button size="small" color="inherit">New Releases</Button>
                <Button size="small" color="inherit">Genres</Button>
                <Button size="small" color="inherit">Top Charts</Button>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>Company</Typography>
              <Stack spacing={1}>
                <Button size="small" color="inherit">About Us</Button>
                <Button size="small" color="inherit">Careers</Button>
                <Button size="small" color="inherit">Press</Button>
                <Button size="small" color="inherit">Partners</Button>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>Legal</Typography>
              <Stack spacing={1}>
                <Button size="small" color="inherit">Privacy Policy</Button>
                <Button size="small" color="inherit">Terms of Service</Button>
                <Button size="small" color="inherit">Copyright</Button>
              </Stack>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="subtitle1" sx={{ mb: 2 }}>Connect</Typography>
              <Stack direction="row" spacing={1}>
                <IconButton color="inherit">
                  <i className="fab fa-twitter"></i>
                </IconButton>
                <IconButton color="inherit">
                  <i className="fab fa-facebook"></i>
                </IconButton>
                <IconButton color="inherit">
                  <i className="fab fa-instagram"></i>
                </IconButton>
                <IconButton color="inherit">
                  <i className="fab fa-spotify"></i>
                </IconButton>
              </Stack>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                support@podcastino.com
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 4 }}>
            © {new Date().getFullYear()} Podcastino. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Home;