import React, { useState, useEffect } from 'react';
import FileUploadDialog from "./Modals/uploaddialog";
import {
  fetchUserProfile,
  fetchFavoritesList,
  fetchPlaylistsList,
  fetchHistory,
  fetchUserEpisodes,
  fetchUserPodcasts,
  updateUserProfile,   
} from "./api/userService";

import { myShows } from './Data/Mockdata';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tab,
  Tabs,
  Typography,
  TextField,
  ThemeProvider,
  CssBaseline,
  Grid,
  CardMedia,
  CardActions
} from '@mui/material';
import {
  Edit,
  Favorite,
  History,
  PlaylistPlay,
  Podcasts,
  Share,
  LibraryBooks as ShowsIcon
} from '@mui/icons-material';


function UserProfilePage ({Theme, isMoblie, isTablet}) {
  const [tabValue, setTabValue] = useState(0);
  const [historyItems, setHistoryItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [playlistItems, setPlaylistItems] = useState([]);
  const [episodeItems, setEpisodeItems] = useState([]);
  const [myShows, setMyShows] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(null);
  // const [open, setOpen] = useState(false);

  const [userData, setUserData] = useState({
    name: '',
    email: '',
    bio: '',
    joinDate: '',
    stats: {
      listened: 0,
      favorites: 0,
      playlists: 0,
      shows: 0,
    }
  });

  const [tempData, setTempData] = useState({ ...userData });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleUploadClick = () => {
    setUploadDialogOpen(true);
  };

  const handleUploadClose = () => {
    setUploadDialogOpen(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setTempData({ ...userData });
  };

  const handleSaveClick = () => {
    setUserData({ ...tempData });
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
    const loadUserProfile = async () => {
      try {
        const profile = await fetchUserProfile();
        setUserData(profile);
        setTempData(profile);
      } catch (error) {
        console.error("Failed to load user profile:", error);
      }
    };
    loadUserProfile();
    if (tabValue === 0) fetchHistory().then(setHistoryItems);
    if (tabValue === 1) fetchFavoritesList().then(setFavoriteItems);
    if (tabValue === 2) fetchPlaylistsList().then(setPlaylistItems);
    if (tabValue === 3) fetchUserEpisodes().then(setEpisodeItems);
    if (tabValue === 4) fetchUserPodcasts().then(setMyShows);
  }, [tabValue]);

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />

      {/* File Upload Dialog */}
      <FileUploadDialog
        open={uploadDialogOpen}
        onClose={handleUploadClose}
        creatorShows={myShows} // Pass the shows data to the dialog
      />

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Profile Header */}
        <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <Avatar alt={userData.name} src="https://randomuser.me/api/portraits/men/32.jpg" sx={{ width: 120, height: 120, mb: 2 }} />
            </Box>

            <Box sx={{ flexGrow: 1 }}>
              {isEditing ? (
                <>
                  <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={tempData.name}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={tempData.email}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    fullWidth
                    label="Bio"
                    name="bio"
                    value={tempData.bio}
                    onChange={handleInputChange}
                    multiline
                    rows={3}
                  />
                </>
              ) : (
                <>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                    {userData.name}
                  </Typography>
                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {userData.email}
                  </Typography>
                  <Typography paragraph sx={{ mb: 3 }}>
                    {userData.bio}
                  </Typography>
                  <Typography color="text.secondary" variant="body2">
                    {userData.joinDate}
                  </Typography>
                </>
              )}

              <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                <Chip label={`${userData.stats.listened} Listened`} />
                <Chip label={`${userData.stats.favorites} Favorites`} />
                <Chip label={`${userData.stats.playlists} Playlists`} />
                <Chip label={`${userData.stats.shows} Shows`} />
              </Box>
            </Box>

            {/* Edit and Save Buttons */}
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end", flexDirection: "column" }}>
              <Button
                variant="outlined"
                startIcon={<Edit />}
                onClick={isEditing ? handleSaveClick : handleEditClick}
                sx={{ width: '100%' }}
              >
                {isEditing ? 'Save Profile' : 'Edit Profile'}
              </Button>
              {isEditing && (
                <Button
                  variant="text"
                  onClick={handleCancelClick}
                  sx={{ width: '100%', mt: 1 }}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </Box>
        </Paper>

        {/* Profile Tabs */}
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{ mb: 3 }}
        >
          <Tab icon={<History />} label="History" />
          <Tab icon={<Favorite />} label="Favorites" />
          <Tab icon={<PlaylistPlay />} label="Playlists" />
          <Tab icon={<Podcasts />} label="Episodes" />
          <Tab icon={<ShowsIcon />} label="My Shows" />
        </Tabs>

        {/* Tab Content */}
        <Paper elevation={3} sx={{ p: 3 }}>
          {tabValue === 0 && (
            <List>
              {historyItems.map((item) => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <Typography color="text.secondary">
                      {item.time}
                    </Typography>
                  }
                >
                  <ListItemText
                    primary={item.title}
                    secondary={item.podcast}
                  />
                </ListItem>
              ))}
            </List>
          )}

          {tabValue === 1 && (
            <List>
              {favoriteItems.map((item) => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <Typography color="text.secondary">
                      {item.episodes} episodes
                    </Typography>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Favorite />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={item.podcast}
                  />
                </ListItem>
              ))}
            </List>
          )}

          {tabValue === 2 && (
            <List>
              {playlistItems.map((item) => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <Typography color="text.secondary">
                      {item.count} episodes
                    </Typography>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <PlaylistPlay />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.name}
                    secondary={`${item.count} episodes`}
                  />
                </ListItem>
              ))}
            </List>
          )}

          {tabValue === 3 && (
            <List>
              {episodeItems.map((item) => (
                <ListItem
                  key={item.id}
                  secondaryAction={
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography color="text.secondary" sx={{ mr: 1 }}>
                        {item.duration}
                      </Typography>
                      <IconButton>
                        <Share fontSize="small" />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                      <Podcasts />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={item.podcast}
                  />
                </ListItem>
              ))}
            </List>
          )}

          {tabValue === 4 && (
            <Grid container spacing={3}>
              {myShows.map((show) => (
                <Grid item xs={12} sm={6} md={4} key={show.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={show.image}
                      alt={show.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="div">
                        {show.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {show.description}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">
                          {show.episodes} episodes
                        </Typography>
                        <Typography variant="body2">
                          {show.subscribers.toLocaleString()} subscribers
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                      <Button size="small" color="primary">
                        Manage
                      </Button>
                      <Button size="small" color="primary">
                        View Analytics
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Paper>

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

export default UserProfilePage;