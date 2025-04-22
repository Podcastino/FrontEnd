import React, { useState, useEffect } from "react";
import {
  Podcasts,
  Favorite,
  PlaylistPlay,
  History,
  Edit,
  Mic,
  Headphones,
  Dashboard,
  CheckCircle,
  ExitToApp,
  AccountCircle,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Chip,
  Divider,
  Grid,
  IconButton,
  GlobalStyles,
  Stack,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  styled,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EditIcon from "@mui/icons-material/Edit";

import { Dialog, DialogTitle, DialogContent, DialogActions, LinearProgress, FormControl, InputLabel, Select } from "@mui/material";


// ============================
//     UTILITY COMPONENTS
// ============================
const ProfileMenu = ({ anchorEl, open, onClose, onSignOut }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          bgcolor: "#1A132F",
          borderRadius: "8px",
          minWidth: 240,
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.05)",
          "& .MuiMenuItem-root": {
            py: 1.5,
            px: 2,
            "&:hover": {
              bgcolor: "rgba(161, 0, 255, 0.1)",
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {/* Header */}
      <MenuItem disabled>
        <Stack direction="row" spacing={2} alignItems="center">
          <AccountCircle sx={{ color: "#A100FF", fontSize: 40 }} />
          <Stack>
            <Typography variant="body1" sx={{ color: "#FFF" }}>
              John Doe
            </Typography>
            <Typography variant="caption" sx={{ color: "#A0A0A0" }}>
              @johndoe
            </Typography>
          </Stack>
        </Stack>
      </MenuItem>

      <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.1)" }} />

      {/* Menu Items */}
      <MenuItem onClick={onClose}>
        <ListItemIcon sx={{ color: "#A100FF" }}>
          <Dashboard fontSize="small" />
        </ListItemIcon>
        <ListItemText>Creator Studio</ListItemText>
      </MenuItem>

      <MenuItem onClick={onClose}>
        <ListItemIcon sx={{ color: "#A100FF" }}>
          <History fontSize="small" />
        </ListItemIcon>
        <ListItemText>History</ListItemText>
      </MenuItem>

      <MenuItem onClick={onClose}>
        <ListItemIcon sx={{ color: "#A100FF" }}>
          <CheckCircle fontSize="small" />
        </ListItemIcon>
        <ListItemText>Subscribed</ListItemText>
      </MenuItem>

      <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.1)" }} />

      <MenuItem
        onClick={() => {
          onSignOut();
          onClose();
        }}
      >
        <ListItemIcon sx={{ color: "#FF4444" }}>
          <ExitToApp fontSize="small" />
        </ListItemIcon>
        <ListItemText sx={{ color: "#FF4444" }}>Sign Out</ListItemText>
      </MenuItem>
    </Menu>
  );
};

const UploadModal = ({ open, onClose }) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [coverArt, setCoverArt] = useState(null);

  const handleFileUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      // Simulate upload progress
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        setUploadProgress(progress);
        if (progress >= 100) clearInterval(interval);
      }, 200);
    }
  };

  const handleCoverArtUpload = (event) => {
    setCoverArt(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: "#1A132F",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      <DialogTitle
        sx={{
          color: "#FFF",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Upload New Podcast
        <IconButton onClick={onClose} sx={{ color: "#A100FF" }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                border: "2px dashed #A100FF",
                mt: 2,
                borderRadius: "12px",
                p: 4,
                textAlign: "center",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "rgba(161, 0, 255, 0.05)",
                },
              }}
            >
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                hidden
                id="podcast-upload"
              />
              <label htmlFor="podcast-upload">
                <CloudUploadIcon
                  sx={{
                    fontSize: 48,
                    color: "#A100FF",
                    mb: 2,
                  }}
                />
                <Typography variant="h6" sx={{ color: "#FFF" }}>
                  Drag & Drop Audio File
                </Typography>
                <Typography variant="body2" sx={{ color: "#A0A0A0", mt: 1 }}>
                  or click to browse files
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: "#666",
                    display: "block",
                    mt: 2,
                  }}
                >
                  Supported formats: MP3, WAV, AAC (Max 500MB)
                </Typography>
              </label>
            </Box>

            {file && (
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ color: "#FFF" }}>
                  Selected file: {file.name}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={uploadProgress}
                  sx={{
                    mt: 1,
                    height: 8,
                    borderRadius: 4,
                    bgcolor: "#2A1A47",
                    "& .MuiLinearProgress-bar": {
                      bgcolor: "#A100FF",
                    },
                  }}
                />
              </Box>
            )}
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <Stack spacing={3} sx={{ p: 2 }}>
              <TextField
                fullWidth
                label="Episode Title"
                variant="outlined"
                InputLabelProps={{ sx: { color: "#A0A0A0" } }}
                InputProps={{
                  sx: {
                    color: "#FFF",
                    borderRadius: "8px",
                    bgcolor: "#2A1A47",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  },
                }}
              />

              <TextField
                fullWidth
                label="Description"
                multiline
                rows={4}
                InputLabelProps={{ sx: { color: "#A0A0A0" } }}
                InputProps={{
                  sx: {
                    color: "#FFF",
                    borderRadius: "8px",
                    bgcolor: "#2A1A47",
                    "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                  },
                }}
              />

              <FormControl fullWidth>
                <InputLabel sx={{ color: "#A0A0A0" }}>Category</InputLabel>
                <Select
                  label="Category"
                  sx={{
                    color: "#FFF",
                    borderRadius: "8px",
                    bgcolor: "#2A1A47",
                    "& .MuiSelect-icon": { color: "#A100FF" },
                  }}
                >
                  {["Technology", "Business", "Education", "Entertainment"].map(
                    (cat) => (
                      <MenuItem
                        key={cat}
                        value={cat}
                        sx={{
                          bgcolor: "#1A132F",
                          "&:hover": { bgcolor: "#2A1A47" },
                        }}
                      >
                        {cat}
                      </MenuItem>
                    )
                  )}
                </Select>
              </FormControl>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" sx={{ color: "#FFF", mb: 1 }}>
                  Cover Art
                </Typography>
                <input
                  accept="image/*"
                  type="file"
                  hidden
                  id="cover-art-upload"
                  onChange={handleCoverArtUpload}
                />
                <label htmlFor="cover-art-upload">
                  <Box
                    sx={{
                      width: "100%",
                      height: 150,
                      border: "2px dashed #A100FF",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      bgcolor: coverArt
                        ? "transparent"
                        : "rgba(161, 0, 255, 0.05)",
                      "&:hover": {
                        bgcolor: "rgba(161, 0, 255, 0.1)",
                      },
                    }}
                  >
                    {coverArt ? (
                      <img
                        src={coverArt}
                        alt="Cover art"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "6px",
                        }}
                      />
                    ) : (
                      <Typography sx={{ color: "#A100FF" }}>
                        Click to upload cover image
                      </Typography>
                    )}
                  </Box>
                </label>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.1)",
          p: 3,
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            color: "#A100FF",
            border: "1px solid #A100FF",
            borderRadius: "8px",
            px: 4,
            "&:hover": { bgcolor: "rgba(161, 0, 255, 0.1)" },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#A100FF",
            borderRadius: "8px",
            px: 4,
            "&:hover": { bgcolor: "#8A00D4" },
          }}
        >
          Publish Episode
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const EditProfileModal = ({ open, onClose }) => {
    const [profilePic, setProfilePic] = useState(null);
    const [formData, setFormData] = useState({
      username: userData.username,
      email: userData.email,
      age: userData.age,
      gender: userData.gender,
      bio: userData.bio,
      interests: [...userData.interests],
    });
  
    const handleFileUpload = (event) => {
      const file = event.target.files[0];
      if (file) {
        setProfilePic(URL.createObjectURL(file));
      }
    };
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleInterestDelete = (interestToDelete) => {
      setFormData({
        ...formData,
        interests: formData.interests.filter(
          (interest) => interest !== interestToDelete
        ),
      });
    };
  
    return (
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: "#1A132F",
            borderRadius: "16px",
            background: "rgba(255, 255, 255, 0.05)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        <DialogTitle
          sx={{
            color: "#FFF",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Edit Profile
          <IconButton onClick={onClose} sx={{ color: "#A100FF" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
  
        <DialogContent sx={{ py: 4 }}>
          <Grid container spacing={4}>
            {/* Left Column - Profile Picture */}
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mt: 2,
                }}
              >
                <input
                  accept="image/*"
                  type="file"
                  hidden
                  id="profile-pic-upload"
                  onChange={handleFileUpload}
                />
                <label htmlFor="profile-pic-upload">
                  <Avatar
                    src={profilePic}
                    sx={{
                      width: 150,
                      height: 150,
                      border: "2px solid #A100FF",
                      bgcolor: "#2A1A47",
                      cursor: "pointer",
                      "&:hover": { opacity: 0.8 },
                    }}
                  >
                    <EditIcon sx={{ fontSize: 40 }} />
                  </Avatar>
                </label>
                <Typography variant="body2" sx={{ color: "#A100FF", mt: 2 }}>
                  Click to change photo
                </Typography>
              </Box>
            </Grid>
  
            {/* Right Column - Form */}
            <Grid item xs={12} md={8}>
              <Stack spacing={3} sx={{ pt: 2 }}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  InputLabelProps={{ sx: { color: "#A0A0A0" } }}
                  InputProps={{
                    sx: {
                      color: "#FFF",
                      borderRadius: "8px",
                      bgcolor: "#2A1A47",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                    },
                  }}
                />
  
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  InputLabelProps={{ sx: { color: "#A0A0A0" } }}
                  InputProps={{
                    sx: {
                      color: "#FFF",
                      borderRadius: "8px",
                      bgcolor: "#2A1A47",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                    },
                  }}
                />
  
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      InputLabelProps={{ sx: { color: "#A0A0A0" } }}
                      InputProps={{
                        sx: {
                          color: "#FFF",
                          borderRadius: "8px",
                          bgcolor: "#2A1A47",
                          "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Gender"
                      name="gender"
                      select
                      value={formData.gender}
                      onChange={handleChange}
                      InputLabelProps={{ sx: { color: "#A0A0A0" } }}
                      InputProps={{
                        sx: {
                          color: "#FFF",
                          borderRadius: "8px",
                          bgcolor: "#2A1A47",
                          "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                        },
                      }}
                    >
                      {["Male", "Female", "Other"].map((option) => (
                        <MenuItem
                          key={option}
                          value={option}
                          sx={{
                            bgcolor: "#1A132F",
                            "&:hover": { bgcolor: "#2A1A47" },
                          }}
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
  
                <TextField
                  fullWidth
                  label="Bio"
                  name="bio"
                  multiline
                  rows={4}
                  value={formData.bio}
                  onChange={handleChange}
                  InputLabelProps={{ sx: { color: "#A0A0A0" } }}
                  InputProps={{
                    sx: {
                      color: "#FFF",
                      borderRadius: "8px",
                      bgcolor: "#2A1A47",
                      "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                    },
                  }}
                />
  
                <Box>
                  <Typography variant="body2" sx={{ color: "#A100FF", mb: 1 }}>
                    Interests
                  </Typography>
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: "8px",
                      bgcolor: "#2A1A47",
                      minHeight: 80,
                    }}
                  >
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      {formData.interests.map((interest, index) => (
                        <Chip
                          key={index}
                          label={interest}
                          onDelete={() => handleInterestDelete(interest)}
                          sx={{
                            bgcolor: "rgba(161, 0, 255, 0.1)",
                            color: "#A100FF",
                            borderRadius: "6px",
                            mb: 1,
                          }}
                        />
                      ))}
                      <Button
                        variant="outlined"
                        sx={{
                          color: "#A100FF",
                          borderColor: "#A100FF",
                          borderRadius: "6px",
                          height: 32,
                          "&:hover": { bgcolor: "rgba(161, 0, 255, 0.05)" },
                        }}
                      >
                        Add Interest
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </DialogContent>
  
        <DialogActions
          sx={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            p: 3,
          }}
        >
          <Button
            onClick={onClose}
            sx={{
              color: "#A100FF",
              border: "1px solid #A100FF",
              borderRadius: "8px",
              px: 4,
              "&:hover": { bgcolor: "rgba(161, 0, 255, 0.1)" },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#A100FF",
              borderRadius: "8px",
              px: 4,
              "&:hover": { bgcolor: "#8A00D4" },
            }}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  

// For demonstration, I'll keep your "EditProfileModal" as-is.
// Assume userData is from your code or initially fetched from the 'api/user/profile/'.

const userData = {
  username: "parsaspeed",
  email: "parsavazifae@gmail.com",
  age: 21,
  gender: "Male",
  bio: "Technology enthusiast with a passion for podcasts. Exploring AI, Web3, and the future of digital media.",
  stats: {
    joined: "April 2025",
    listeningTime: "0 hours",
    followers: "None",
  },
  interests: ["AI", "Web3", "Technology", "Podcasts", "Music"],
};

// ============================
//        STYLED COMPONENTS
// ============================
const ProfileHeader = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "400px",
  background: "linear-gradient(45deg, #0F0B1F 0%, #2A1A47 100%)",
  borderRadius: "24px",
  marginTop: theme.spacing(4),
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)",
  },
}));

const GlassCard = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(12px)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  padding: theme.spacing(4),
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  marginTop: theme.spacing(4),
}));

const StatCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: "linear-gradient(145deg, #1A132F 0%, #2A1A47 100%)",
  borderRadius: "12px",
  textAlign: "center",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));


// ============================
//         MAIN PROFILE
// ============================
const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // --- State for Storing API Data ---
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [history, setHistory] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  // ================ FETCH FUNCTIONS ================

// 1) User Profile: GET api/user/profile/
const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("https://podcastino.darkube.app/api/user/profile/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }
      const data = await response.json();
      console.log(data);
      setProfile(data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  
  // 2) Favorites List: GET api/user/favorites/
  const fetchFavoritesList = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("https://podcastino.darkube.app/api/user/favorites/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch favorites list");
      }
      const data = await response.json();
      setFavorites(data);
    } catch (error) {
      console.error("Error fetching favorites list:", error);
    }
  };
  
  // 3) Favorites Detail: GET api/user/favorites/<int:pk>/
  const fetchFavoritesDetail = async (pk) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`https://podcastino.darkube.app/api/user/favorites/${pk}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch favorite detail");
      }
      const data = await response.json();
      console.log("Fetched favorite detail:", data);
      // Possibly update favorites state or store detail in a separate state
    } catch (error) {
      console.error("Error fetching favorite detail:", error);
    }
  };
  
  // 4) Playlists List: GET api/user/playlists/
  const fetchPlaylistsList = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("https://podcastino.darkube.app/api/user/playlists/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch playlists list");
      }
      const data = await response.json();
      setPlaylists(data);
    } catch (error) {
      console.error("Error fetching playlists list:", error);
    }
  };
  
  // 5) Playlists Detail: GET api/user/playlists/<int:pk>/
  const fetchPlaylistsDetail = async (pk) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`https://podcastino.darkube.app/api/user/playlists/${pk}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch playlist detail");
      }
      const data = await response.json();
      console.log("Fetched playlist detail:", data);
    } catch (error) {
      console.error("Error fetching playlist detail:", error);
    }
  };
  
  // 6) Listening History: GET api/user/history/
  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("https://podcastino.darkube.app/api/user/history/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch listening history");
      }
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };
  
  // 7) Subscriptions List: GET api/user/subscriptions/
  const fetchSubscriptionsList = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("https://podcastino.darkube.app/api/user/subscriptions/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch subscriptions list");
      }
      const data = await response.json();
      setSubscriptions(data);
    } catch (error) {
      console.error("Error fetching subscriptions list:", error);
    }
  };
  
  // 8) Subscriptions Detail: GET api/user/subscriptions/<int:pk>/
  const fetchSubscriptionsDetail = async (pk) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`https://podcastino.darkube.app/api/user/subscriptions/${pk}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch subscription detail");
      }
      const data = await response.json();
      console.log("Fetched subscription detail:", data);
    } catch (error) {
      console.error("Error fetching subscription detail:", error);
    }
  };
  
  // 9) Logout: POST api/user/logout/
  const handleSignOut = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("https://podcastino.darkube.app/api/user/logout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
      });
      if (response.ok) {
        // handle sign out success, e.g., clear localStorage and redirect
        console.log("Successfully signed out.");
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // ================ LIFECYCLE HOOKS ================
  // Example: fetch user profile on mount
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // ================ HANDLERS / EVENT LOGIC ================
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Trigger API calls when changing tabs as an example
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);

    // Switch example to load different data on each tab
    switch (newValue) {
      case 1: // Favorites
        fetchFavoritesList();
        break;
      case 2: // Playlists
        fetchPlaylistsList();
        break;
      case 3: // History
        fetchHistory();
        break;
      default:
        break;
    }
  };

  const InfoItem = ({ label, value }) => (
    <Stack spacing={1}>
      <Typography variant="body2" sx={{ color: "#A0A0A0", fontWeight: 600 }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ color: "#FFF" }}>
        {value}
      </Typography>
    </Stack>
  );

  return (
    <Box sx={{ bgcolor: "#0F0B1F", minHeight: "100vh" }}>
      <GlobalStyles
        styles={{
          "*": { padding: 0, boxSizing: "border-box" },
          body: { overflowX: "hidden" },
        }}
      />

      {/* App Bar */}
      <AppBar position="sticky" sx={{ bgcolor: "#1A132F", boxShadow: "none" }}>
        <Toolbar sx={{ justifyContent: "space-between", gap: 4, py: 2 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Mic sx={{ color: "#A100FF", fontSize: 32 }} />
            <Typography
              variant="h4"
              sx={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "#FFF",
                letterSpacing: "-1px",
              }}
            >
              PODCASTINO
            </Typography>
          </Stack>

          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <TextField
              variant="outlined"
              placeholder="Search podcasts..."
              InputProps={{
                startAdornment: <Headphones sx={{ color: "#666", mr: 1 }} />,
                sx: {
                  borderRadius: "30px",
                  bgcolor: "#2A1A47",
                  color: "#FFF",
                  width: "400px",
                  "& fieldset": { border: "none" },
                },
              }}
            />
            <Button
              variant="contained"
              onClick={() => setUploadOpen(true)}
              sx={{
                borderRadius: "12px",
                bgcolor: "#A100FF",
                px: 4,
                py: 1.5,
                "&:hover": { bgcolor: "#8A00D4" },
              }}
            >
              Upload Episode
            </Button>
            <UploadModal
              open={uploadOpen}
              onClose={() => setUploadOpen(false)}
            />
            <Avatar
              sx={{ bgcolor: "#A100FF", width: 40, height: 40, cursor: "pointer" }}
              onClick={handleMenuOpen}
            >
              JD
            </Avatar>
            <ProfileMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              onSignOut={handleSignOut} // pass signout function
            />
          </Box>
        </Toolbar>
      </AppBar>

      {/* Profile Content */}
      <Container maxWidth="xl">
        <ProfileHeader>
          <Avatar
            sx={{
              width: 200,
              height: 200,
              position: "absolute",
              bottom: "-100px",
              left: "50%",
              transform: "translateX(-50%)",
              border: "4px solid #0F0B1F",
              bgcolor: "#2A1A47",
              fontSize: "3rem",
              boxShadow: "0 16px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            JD
          </Avatar>
        </ProfileHeader>

        {/* Profile Details */}
        <GlassCard>
          <Stack spacing={4}>
            {/* Personal Info Section */}
            <Stack spacing={3}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="h2"
                  sx={{
                    color: "#FFF",
                    fontWeight: 700,
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {/* If we’re fetching real data, prefer: userData.username || 'Unknown User' */}
                  {userData.username || 'Unknown User'}
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setEditOpen(true)}
                  startIcon={<Edit />}
                  sx={{
                    bgcolor: "#A100FF",
                    borderRadius: "12px",
                    px: 4,
                    py: 1.5,
                    "&:hover": { bgcolor: "#8A00D4" },
                  }}
                >
                  Edit Profile
                </Button>
                <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
                {/* For brevity, I'll omit re-pasting EditProfileModal code. */}
              </Stack>

              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Stack spacing={3}>
                    <InfoItem label="Email" value={userData.email} />
                    <InfoItem label="Age" value={userData.age} />
                    <InfoItem label="Gender" value={userData.gender} />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Stack spacing={3}>
                    <InfoItem label="Joined" value={userData.stats.joined} />
                    <InfoItem
                      label="Listening Time"
                      value={userData.stats.listeningTime}
                    />
                    <InfoItem
                      label="Followers"
                      value={userData.stats.followers}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Stack>

            {/* Bio Section */}
            <Typography
              variant="body1"
              sx={{
                color: "#D0D0D0",
                lineHeight: 1.8,
                fontSize: "1.1rem",
              }}
            >
              {userData.bio}
            </Typography>

            {/* Interests */}
            <Stack spacing={2}>
              <Typography
                variant="h6"
                sx={{
                  color: "#A100FF",
                  fontWeight: 600,
                }}
              >
                Interests
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {(userData.interests ).map((interest, index) => (
                  <Chip
                    key={index}
                    label={interest}
                    sx={{
                      bgcolor: "rgba(161, 0, 255, 0.1)",
                      color: "#A100FF",
                      fontWeight: 600,
                      borderRadius: "8px",
                      mb: 1,
                    }}
                  />
                ))}
              </Stack>
            </Stack>

            {/* Stats Grid */}
            <Grid container spacing={4}>
              {Object.entries(userData.stats).map(([key, value], index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <StatCard>
                    <Typography
                      variant="h3"
                      sx={{
                        color: "#A100FF",
                        fontWeight: 700,
                        mb: 1,
                        fontFamily: "'Space Grotesk', sans-serif",
                      }}
                    >
                      {value}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#909090",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        fontSize: "0.9rem",
                      }}
                    >
                      {key.replace(/([A-Z])/g, " $1")}
                    </Typography>
                  </StatCard>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </GlassCard>

        {/* Tabs Section */}
        <GlassCard sx={{ mt: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              mb: 3,
              "& .MuiTabs-indicator": {
                backgroundColor: "#A100FF",
                height: "3px",
              },
            }}
          >
            <Tab
              label="Episodes"
              icon={<Podcasts />}
              sx={tabStyle(activeTab === 0)}
            />
            <Tab
              label="Favorites"
              icon={<Favorite />}
              sx={tabStyle(activeTab === 1)}
            />
            <Tab
              label="Playlists"
              icon={<PlaylistPlay />}
              sx={tabStyle(activeTab === 2)}
            />
            <Tab
              label="History"
              icon={<History />}
              sx={tabStyle(activeTab === 3)}
            />
          </Tabs>

          <Box
            sx={{
              bgcolor: "#1A1A1A",
              borderRadius: "12px",
              p: 4,
              minHeight: "400px",
            }}
          >
            {activeTab === 0 && (
              <Stack spacing={3}>
                <Typography variant="h5" sx={{ color: "#666" }}>
                  Recent Episodes
                </Typography>
                <Divider sx={{ bgcolor: "#333" }} />
                <Stack spacing={2}>
                  {["AI in Healthcare", "Web3 Security", "Startup Funding"].map(
                    (episode, index) => (
                      <Box
                        key={index}
                        sx={{
                          p: 2,
                          borderRadius: "8px",
                          bgcolor: "#2A1A47",
                          "&:hover": { bgcolor: "#3A2A57" },
                        }}
                      >
                        <Typography sx={{ color: "#FFF" }}>
                          Episode {128 - index}: {episode}
                        </Typography>
                      </Box>
                    )
                  )}
                </Stack>
              </Stack>
            )}

            {activeTab === 1 && (
              <Stack spacing={2}>
                <Typography variant="h5" sx={{ color: "#666" }}>
                  Favorites
                </Typography>
                <Divider sx={{ bgcolor: "#333" }} />
                {/* Display the favorites you fetched from fetchFavoritesList */}
                {favorites.length === 0 ? (
                  <Typography sx={{ color: "#888" }}>
                    No favorites added yet.
                  </Typography>
                ) : (
                  favorites.map((fav, i) => (
                    <Box key={i} sx={{ p: 2, bgcolor: "#2A1A47", mb: 1 }}>
                      <Typography sx={{ color: "#FFF" }}>
                        {fav.title || "Favorite Item"}
                      </Typography>
                    </Box>
                  ))
                )}
              </Stack>
            )}

            {activeTab === 2 && (
              <Stack spacing={2}>
                <Typography variant="h5" sx={{ color: "#666" }}>
                  Playlists
                </Typography>
                <Divider sx={{ bgcolor: "#333" }} />
                {playlists.length === 0 ? (
                  <Typography sx={{ color: "#888" }}>
                    No playlists found.
                  </Typography>
                ) : (
                  playlists.map((pl, i) => (
                    <Box key={i} sx={{ p: 2, bgcolor: "#2A1A47", mb: 1 }}>
                      <Typography sx={{ color: "#FFF" }}>
                        {pl.name || "Playlist"}
                      </Typography>
                    </Box>
                  ))
                )}
              </Stack>
            )}

            {activeTab === 3 && (
              <Stack spacing={2}>
                <Typography variant="h5" sx={{ color: "#666" }}>
                  Listening History
                </Typography>
                <Divider sx={{ bgcolor: "#333" }} />
                {history.length === 0 ? (
                  <Typography sx={{ color: "#888" }}>
                    Your listening history is empty.
                  </Typography>
                ) : (
                  history.map((item, i) => (
                    <Box key={i} sx={{ p: 2, bgcolor: "#2A1A47", mb: 1 }}>
                      <Typography sx={{ color: "#FFF" }}>
                        {item.episodeTitle || "Unknown Episode"}
                      </Typography>
                    </Box>
                  ))
                )}
              </Stack>
            )}
          </Box>
        </GlassCard>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          bgcolor: "#1A132F",
          mt: 8,
          py: 4,
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Container maxWidth="xl">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={4}>
              {["Privacy Policy", "Terms of Service", "Contact"].map(
                (item, index) => (
                  <Typography
                    key={index}
                    variant="body2"
                    sx={{
                      color: "#666",
                      cursor: "pointer",
                      "&:hover": { color: "#A100FF" },
                    }}
                  >
                    {item}
                  </Typography>
                )
              )}
            </Stack>
            <Typography variant="body2" sx={{ color: "#666" }}>
              © 2023 Podcastino. All rights reserved.
            </Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

const tabStyle = (isActive) => ({
  color: isActive ? "#A100FF" : "#666",
  fontSize: "1.1rem",
  fontWeight: 600,
  textTransform: "none",
  "&:hover": { color: "#A100FF" },
  "& .MuiSvgIcon-root": { marginRight: 1 },
});

export default Profile;