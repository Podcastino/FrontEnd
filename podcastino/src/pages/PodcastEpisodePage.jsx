import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Slider } from "@mui/material";
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
} from "@mui/material";
import {
  PlayArrow,
  Pause,
  Favorite,
  FavoriteBorder,
  Share,
  Message,
  Download,
} from "@mui/icons-material";
import LandingService from "../api/LandingService";
import {
  fetchFavoritesList,
  addFavorite,
  removeFavorite,
} from "../api/userService";

function PodcastEpisodePage({ theme, isMobile, isTablet }) {
  const { id: podcastId } = useParams();
  const [episode, setEpisode] = useState([]);
  const [currentEpisode, setCurrentEpisode] = useState(null);
  const [favorites, setFavorites] = useState([[]]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "JaneDoe", text: "Great episode!", time: "2 days ago" },
    {
      id: 2,
      user: "PodcastFan123",
      text: "When is the next episode?",
      time: "1 day ago",
    },
  ]);
  const [audioRef, setAudioRef] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    async function loadEpisode() {
      try {
        const data = await LandingService.fetchPodcastEpisodes(podcastId);
        setEpisode(data);
      } catch (error) {
        console.error("Error loading episode:", error);
      }
    }
    loadEpisode();
    const loadFavorites = async () => {
      try {
        const favorites = await fetchFavoritesList();
        const ids = favorites.map((fav) => fav.episode);
        console.log("Favorite", favorites);
        setFavoriteIds(ids);
        setFavorites(favorites);
      } catch (error) {
        console.error("Error loading favorites:", error);
      }
    };
    loadFavorites();
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleEpisodeSelect = (episode) => {
    setCurrentEpisode(episode);
    setIsPlaying(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          user: "You",
          text: comment,
          time: "Just now",
        },
      ]);
      setComment("");
    }
  };

  const handleFavoriteToggle = async () => {
    try {
      const epId = episode.id;
      console.log(epId);
      console.log(favoriteIds);
      if (favoriteIds.includes(epId)) {
        const favoriteId = favorites.find((fav) => (fav.episode === epId)).id;
        await removeFavorite(favoriteId);
        setFavoriteIds((prev) => prev.filter((id) => id !== epId));
      } else {
        await addFavorite(epId);
        setFavoriteIds((prev) => [...prev, epId]);
        console.log(favoriteIds);
      }
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    }
  };

  if (!episode) {
    return <Typography>Loading episode...</Typography>;
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Podcast Header */}
        <Box sx={{ display: "flex", mb: 4 }}>
          <Avatar
            alt="Podcast Cover"
            src="https://via.placeholder.com/150/673ab7/ffffff?text=TechTalk"
            sx={{ width: 150, height: 150, mr: 4 }}
          />
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
              Shitypodcast
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              sx={{ mb: 2 }}
            >
              technology and innovation
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip label="Technology" size="small" />
              <Chip label="Innovation" size="small" />
              <Chip label="Interviews" size="small" />
            </Stack>
            <Button
              variant="outlined"
              startIcon={<Download />}
              onClick={() => {
                const link = document.createElement("a");
                link.href = episode.audio_file;
                link.download = `${episode.title}.mp3`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              Download
            </Button>
          </Box>
        </Box>

        {episode && (
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              {episode.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Published: {new Date(episode.published_at).toLocaleDateString()}
            </Typography>

            {/* Hidden native audio tag */}
            <audio
              ref={(el) => setAudioRef(el)}
              src={episode.audio_file}
              onLoadedMetadata={(e) => setDuration(e.target.duration)}
              onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              autoPlay={isPlaying}
              style={{ display: "none" }}
            />

            {/* Custom player controls */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <IconButton
                color="primary"
                size="large"
                onClick={() => {
                  if (audioRef) {
                    if (isPlaying) {
                      audioRef.pause();
                    } else {
                      audioRef.play();
                    }
                  }
                }}
                sx={{ mr: 2 }}
              >
                {isPlaying ? (
                  <Pause fontSize="large" />
                ) : (
                  <PlayArrow fontSize="large" />
                )}
              </IconButton>

              <Slider
                value={currentTime}
                max={duration}
                onChange={(e, value) => {
                  if (audioRef) {
                    audioRef.currentTime = value;
                    setCurrentTime(value);
                  }
                }}
                sx={{ flexGrow: 1, mx: 2 }}
              />

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ minWidth: 100 }}
              >
                {formatTime(currentTime)} / {formatTime(duration)}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                Now Playing: {episode.title}
              </Typography>
              {/* Favorite toggle: uses episode.id */}
              <IconButton
                aria-label="add to favorites"
                size={isMobile ? "small" : "medium"}
                onClick={handleFavoriteToggle}
              >
                {favoriteIds.includes(episode.id) ? (
                  <Favorite
                    color="error"
                    fontSize={isMobile ? "small" : "medium"}
                  />
                ) : (
                  <FavoriteBorder fontSize={isMobile ? "small" : "medium"} />
                )}
              </IconButton>
              <IconButton
                aria-label="share"
                onClick={async () => {
                  const shareData = {
                    title: episode.title,
                    url: window.location.href,
                  };

                  if (navigator.share) {
                    // Native share dialog (mobile / supported browsers)
                    try {
                      await navigator.share(shareData);
                    } catch (err) {
                      console.error("Share failed:", err);
                    }
                  } else {
                    // Fallback: copy link to clipboard
                    try {
                      await navigator.clipboard.writeText(window.location.href);
                      alert("Link copied to clipboard");
                    } catch (err) {
                      console.error("Copy to clipboard failed:", err);
                    }
                  }
                }}
              >
                <Share />
              </IconButton>
            </Box>

            <Typography variant="body1" paragraph>
              {episode.description}
            </Typography>
          </Paper>
        )}

        {/* Episode List */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          More Episodes
        </Typography>
        <List sx={{ mb: 4 }}>
          {/* {episode.filter(ep => ep.id !== episode.id).map((episode) => ( */}
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
              <Avatar>
                <PlayArrow />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={episode.title} secondary={episode.date} />
          </ListItem>
          {/* ))} */}
        </List>

        {/* Comments Section */}
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Comments ({comments.length})
        </Typography>
        <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <form onSubmit={handleCommentSubmit}>
            <Box sx={{ display: "flex", mb: 3 }}>
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
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Typography variant="subtitle2" sx={{ mr: 1 }}>
                        {item.user}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.time}
                      </Typography>
                    </Box>
                  }
                  secondary={item.text}
                  secondaryTypographyProps={{ component: "div" }}
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
            TechTalk is a weekly podcast hosted by Sarah Johnson that explores
            the intersection of technology, business, and society. Each episode
            features interviews with industry leaders, innovators, and thinkers
            who are shaping the future of technology.
          </Typography>
          <Typography variant="body1" paragraph>
            Subscribe to never miss an episode, and join our community of tech
            enthusiasts who are passionate about understanding how technology
            impacts our world.
          </Typography>
        </Paper>
      </Container>
      <Divider sx={{ my: 4 }} />
      <Container maxWidth="lg" sx={{ py: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 4 }}>
          <Button size="small">Privacy Policy</Button>
          <Button size="small">Terms of Service</Button>
          <Button size="small">Contact Us</Button>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 2 }}
        >
          © {new Date().getFullYear()} Podcastino. All rights reserved.
        </Typography>
      </Container>
    </>
  );
}

export default PodcastEpisodePage;
