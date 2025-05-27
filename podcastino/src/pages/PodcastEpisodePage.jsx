import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
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
  CssBaseline
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  Favorite,
  FavoriteBorder,
  Share,
  MoreVert,
  Message,
  Subscriptions,
  Download
} from "@mui/icons-material";
import LandingService from "./api/LandingService";

function PodcastEpisodePage({ Theme, isMobile, isTablet}) {
  const { id: podcastId } = useParams();
  const [episodes, setEpisodes] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([
    { id: 1, user: 'JaneDoe', text: 'Great episode!', time: '2 days ago' },
    { id: 2, user: 'PodcastFan123', text: 'When is the next episode?', time: '1 day ago' }
  ]);

  useEffect(() => {
    async function loadEpisodes() {
      try {
        const data = await LandingService.fetchPodcastEpisodes(podcastId);
        setEpisodes(data);
      } catch (error) {
        console.error('Error loading episodes:', error);
      }
    }
    loadEpisodes();
  }, [podcastId]);

  const handleEpisodeSelect = (episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([...comments, { id: comments.length + 1, user: 'You', text: comment, time: 'Just now' }]);
      setComment('');
    }
  };

  if (!episodes) {
    return <Typography>Loading episodes...</Typography>;
  }

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Podcast Header */}
        <Box sx={{ display: 'flex', mb: 4 }}>
          <Avatar
            alt="Podcast Cover"
            src="https://via.placeholder.com/150/673ab7/ffffff?text=TechTalk"
            sx={{ width: 150, height: 150, mr: 4 }}
          />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Shitypodcast
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
              technology and innovation
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip label="Technology" size="small" />
              <Chip label="Innovation" size="small" />
              <Chip label="Interviews" size="small" />
            </Stack>
            <Button
              variant="contained"
              startIcon={<Subscriptions />}
              sx={{ mr: 2 }}
            >
              Subscribe
            </Button>
            <Button
              variant="outlined"
              startIcon={<Download />}
            >
              Download
            </Button>
          </Box>
        </Box>

        {/* Current Episode */}
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            {episodes.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Published: {episodes.date} • Duration: {episodes.duration}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
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
                {episodes.progress} / {episodes.duration}
              </Typography>
            </Box>
            <IconButton onClick={() => setIsLiked(!isLiked)}>
              {isLiked ? <Favorite color="secondary" /> : <FavoriteBorder />}
            </IconButton>
            <IconButton>
              <Share />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Box>

          <Typography variant="body1" paragraph>
            {episodes.description}
          </Typography>
        </Paper>

        {/* Episode List */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          More Episodes
        </Typography>
        <List sx={{ mb: 4 }}>
          {/* {episodes.filter(ep => ep.id !== episodes.id).map((episode) => ( */}
            <ListItem
              key={episodes.id}
              button
              onClick={() => handleEpisodeSelect(episodes)}
              secondaryAction={
                <Typography variant="body2" color="text.secondary">
                  {episodes.duration}
                </Typography>
              }
              sx={{ py: 2 }}
            >
              <ListItemAvatar>
                <Avatar>
                  <PlayArrow />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={episodes.title}
                secondary={episodes.date}
              />
            </ListItem>
          {/* ))} */}
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
            About TechTalk
          </Typography>
          <Typography variant="body1" paragraph>
            TechTalk is a weekly podcast hosted by Sarah Johnson that explores the intersection of technology, 
            business, and society. Each episode features interviews with industry leaders, innovators, and thinkers 
            who are shaping the future of technology.
          </Typography>
          <Typography variant="body1" paragraph>
            Subscribe to never miss an episode, and join our community of tech enthusiasts who are passionate 
            about understanding how technology impacts our world.
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