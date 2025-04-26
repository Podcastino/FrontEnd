import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  AppBar,
  Typography,
  Divider,
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Paper,
  Chip,
  Stack,
  ThemeProvider,
  createTheme,
  CssBaseline,
  LinearProgress
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  Favorite,
  Search,
  FavoriteBorder,
  Share,
  MoreVert,
  Message,
  Subscriptions,
  Download,
  ArrowBack
} from "@mui/icons-material";

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

const PodcastEpisodePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [podcast, setPodcast] = useState(null);
  const [progress, setProgress] = useState(0);

  // Sample podcast data with real images
  const podcastData = {
    "serial": {
      title: "Serial",
      host: "Sarah Koenig",
      coverImage: "https://images.unsplash.com/photo-1593697909683-bccb1b9e68a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "Investigative journalism series that unfolds one story over the course of a season.",
      tags: ["True Crime", "Investigative", "Journalism"],
      episodes: [
        {
          id: 42,
          title: 'Episode 42: The Alibi',
          description: `We meet Adnan Syed, who's serving a life sentence for murdering his ex-girlfriend, Hae Min Lee. 
          He says he's innocent. This episode examines the case against him.`,
          date: 'October 3, 2014',
          duration: '54:21',
          image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          audio: "https://example.com/audio1.mp3"
        },
        {
          id: 41, 
          title: 'Episode 41: The Breakup', 
          description: 'We learn more about Adnan and Hae\'s relationship and what happened when it ended.',
          date: 'October 10, 2014',
          duration: '52:18',
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          audio: "https://example.com/audio2.mp3"
        }
      ]
    },
    "the-daily": {
      title: "The Daily",
      host: "Michael Barbaro",
      coverImage: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "This is what the news should sound like. The biggest stories of our time.",
      tags: ["News", "Current Affairs", "Politics"],
      episodes: [
        {
          id: 42,
          title: 'The State of the War in Ukraine',
          description: `As the war in Ukraine enters its second year, we look at the current state of the conflict.`,
          date: 'February 24, 2023',
          duration: '32:15',
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          audio: "https://example.com/audio3.mp3"
        }
      ]
    },
    "techtalk": {
      title: "TechTalk with Sarah Johnson",
      host: "Sarah Johnson",
      coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "Weekly discussions about technology and innovation",
      tags: ["Technology", "Innovation", "Interviews"],
      episodes: [
        {
          id: 42,
          title: 'Episode 42: The Ethics of Artificial Intelligence',
          description: `In this episode, we dive deep into the ethical considerations surrounding artificial intelligence. 
          Our guest, Dr. Michael Chen from the AI Ethics Institute, shares his perspectives on bias in algorithms, 
          privacy concerns, and the future of responsible AI development.`,
          date: 'May 22, 2023',
          duration: '48:15',
          image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          audio: "https://example.com/audio4.mp3"
        }
      ]
    }
  };

  useEffect(() => {
    // Simulate loading data based on the podcast ID from URL
    const selectedPodcast = podcastData[id] || {
      title: "TechTalk with Sarah Johnson",
      host: "Sarah Johnson",
      coverImage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
      description: "Weekly discussions about technology and innovation",
      tags: ["Technology", "Innovation", "Interviews"],
      episodes: [
        {
          id: 42,
          title: 'Episode 42: The Ethics of Artificial Intelligence',
          description: `In this episode, we dive deep into the ethical considerations surrounding artificial intelligence.`,
          date: 'May 22, 2023',
          duration: '48:15',
          image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          audio: "https://example.com/audio4.mp3"
        }
      ]
    };
    
    setPodcast(selectedPodcast);
    setCurrentEpisode(selectedPodcast.episodes[0]);
    setComments([
      { id: 1, user: 'JaneDoe', text: 'Great episode! Really insightful discussion.', time: '2 days ago' },
      { id: 2, user: 'PodcastFan123', text: 'When will the next episode be out?', time: '1 day ago' },
    ]);
    
    // Simulate progress update for demo purposes
    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress(prev => (prev >= 100 ? 0 : prev + 5));
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [id, isPlaying]);

  const handleEpisodeSelect = (episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(false);
    setProgress(0);
    // In a real app, you would also stop any currently playing audio here
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, {
        id: comments.length + 1,
        user: 'You',
        text: comment,
        time: 'Just now'
      }]);
      setComment('');
    }
  };

  if (!podcast || !currentEpisode) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h4">Loading podcast...</Typography>
        </Container>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="sticky" color="default" elevation={1}>
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" py={2}>
            <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
              <ArrowBack />
            </IconButton>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'primary.main' }}>
              PODCASTINO
            </Typography>
            
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, ml: 4 }}>
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
            
            <Button href="/signup" variant="contained" color="primary">
              Sign In
            </Button>
          </Stack>
        </Container>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Podcast Header */}
        <Box sx={{ display: 'flex', mb: 4, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Avatar
            alt={podcast.title}
            src={podcast.coverImage}
            sx={{ 
              width: 150, 
              height: 150, 
              mr: { sm: 4 },
              mb: { xs: 2, sm: 0 }
            }}
          />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              {podcast.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
              Hosted by {podcast.host}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
              {podcast.tags.map(tag => (
                <Chip key={tag} label={tag} size="small" />
              ))}
            </Stack>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                startIcon={<Subscriptions />}
              >
                Subscribe
              </Button>
              <Button
                variant="outlined"
                startIcon={<Download />}
              >
                Download All
              </Button>
            </Stack>
          </Box>
        </Box>

        {/* Current Episode */}
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            {currentEpisode.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Published: {currentEpisode.date} • Duration: {currentEpisode.duration}
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <IconButton
                color="primary"
                size="large"
                onClick={() => setIsPlaying(!isPlaying)}
                sx={{ mr: 2 }}
              >
                {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
              </IconButton>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1">Now Playing</Typography>
                <Typography variant="body2" color="text.secondary">
                  {Math.floor(progress * 0.48)}:${Math.floor((progress * 0.48 % 1) * 60).toString().padStart(2, '0')} / {currentEpisode.duration}
                </Typography>
              </Box>
              <IconButton onClick={() => setIsLiked(!isLiked)}>
                {isLiked ? <Favorite color="secondary" /> : <FavoriteBorder />}
              </IconButton>
              <IconButton>
                <Share />
              </IconButton>
              <IconButton>
                <Download />
              </IconButton>
            </Box>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 6, borderRadius: 3 }} />
          </Box>

          <Typography variant="body1" paragraph>
            {currentEpisode.description}
          </Typography>
        </Paper>

        {/* Episode List */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          More Episodes
        </Typography>
        <List sx={{ mb: 4 }}>
          {podcast.episodes.filter(ep => ep.id !== currentEpisode.id).map((episode) => (
            <ListItem
              key={episode.id}
              button
              onClick={() => handleEpisodeSelect(episode)}
              secondaryAction={
                <Typography variant="body2" color="text.secondary">
                  {episode.duration}
                </Typography>
              }
              sx={{ py: 2 }}
            >
              <ListItemAvatar>
                <Avatar src={episode.image} variant="rounded">
                  {!episode.image && <PlayArrow />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={episode.title}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {episode.date}
                    </Typography>
                    {` — ${episode.description.substring(0, 60)}...`}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>

        {/* Comments Section */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Comments ({comments.length})
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <form onSubmit={handleCommentSubmit}>
            <Box sx={{ display: 'flex', mb: 3 }}>
              <Avatar sx={{ mr: 2 }}>Y</Avatar>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Add a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ ml: 2 }}
                disabled={!comment.trim()}
              >
                Post
              </Button>
            </Box>
          </form>

          <Divider sx={{ my: 2 }} />

          <List>
            {comments.map((item) => (
              <ListItem key={item.id} alignItems="flex-start" sx={{ py: 2 }}>
                <ListItemAvatar>
                  <Avatar>{item.user.charAt(0)}</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="subtitle2" sx={{ mr: 1 }}>
                        {item.user}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.time}
                      </Typography>
                    </Box>
                  }
                  secondary={item.text}
                  secondaryTypographyProps={{ component: 'div' }}
                />
                <IconButton size="small">
                  <Message fontSize="small" />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Podcast Info */}
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
            About {podcast.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {podcast.description}
          </Typography>
          <Typography variant="body1" paragraph>
            Subscribe to never miss an episode, and join our community of enthusiasts who are passionate 
            about this content.
          </Typography>
        </Paper>
      </Container>
      
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
    </ThemeProvider>
  );
};

export default PodcastEpisodePage;