import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button
} from '@mui/material';

// Sample data for featured podcasts
const podcasts = [
  {
    id: 1,
    title: 'The Daily Buzz',
    description: 'Your daily dose of news and insights.',
    image: 'https://via.placeholder.com/300x200?text=Podcast+1'
  },
  {
    id: 2,
    title: 'Tech Talk',
    description: 'Exploring the latest in technology.',
    image: 'https://via.placeholder.com/300x200?text=Podcast+2'
  },
  {
    id: 3,
    title: 'Health & Wellness',
    description: 'Tips and discussions on living well.',
    image: 'https://via.placeholder.com/300x200?text=Podcast+3'
  }
];

function App() {
  return (
    <div>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div">
            Podcastino
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: '#f5f5f5',
          padding: '40px 0',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to Podcastino
          </Typography>
          <Typography variant="h6" component="p" gutterBottom>
            Discover your next favorite podcast
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Explore Now
          </Button>
        </Container>
      </Box>

      {/* Featured Podcasts Section */}
      <Container sx={{ marginY: 4 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Featured Podcasts
        </Typography>
        <Grid container spacing={4}>
          {podcasts.map((podcast) => (
            <Grid item xs={12} sm={6} md={4} key={podcast.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={podcast.image}
                  alt={podcast.title}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {podcast.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {podcast.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default App;