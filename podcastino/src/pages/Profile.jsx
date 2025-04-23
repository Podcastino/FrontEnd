import React, { useState, useEffect } from "react";
import {
  Podcasts,
  Favorite,
  PlaylistPlay,
  History,
  Edit,
  Mic,
  Headphones,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Chip,
  Divider,
  Grid,
  GlobalStyles,
  Stack,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
  AppBar,
  Avatar,

} from "@mui/material";

import EditProfileModal from './Modals/EditProfileModal';
import ProfileMenu from './Modals/ProfileMenu';
import UploadModal from './Modals/UploadModal';
import { ProfileHeader, GlassCard, StatCard } from './ProfileStyle.js'

import {
  fetchUserProfile,
  fetchFavoritesList,
  fetchFavoritesDetail,
  fetchPlaylistsList,
  fetchPlaylistsDetail,
  fetchHistory,
  fetchSubscriptionsList,
  fetchSubscriptionsDetail,
  handleSignOut
} from './api/userService';


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
//         MAIN PROFILE
// ============================
const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [uploadOpen, setUploadOpen] = useState(false);

  // --- State for Storing API Data ---
  const [profile, setProfile] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [history, setHistory] = useState([]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const handleSaveProfile = (updatedData) => {
    console.log('Updated profile:', updatedData);
    // TODO: call your update-profile API here
  };

  // Fetch real user data on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await fetchUserProfile();
        setProfile(data);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    loadProfile();
  }, []);

  // ================= HANDLERS =================
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  const handleSignOut = () => {
    console.log('User signed out');
  };
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleTabChange = async (event, newValue) => {
    setActiveTab(newValue);

    try {
      switch (newValue) {
        case 1: {
          const favs = await fetchFavoritesList();
          setFavorites(favs);
          break;
        }
        case 2: {
          const pls = await fetchPlaylistsList();
          setPlaylists(pls);
          break;
        }
        case 3: {
          const hist = await fetchHistory();
          setHistory(hist);
          break;
        }
        default:
          break;
      }
    } catch (err) {
      console.error("Error fetching tab data:", err);
    }
  };

  const InfoItem = ({ label, value }) => (
    <Stack spacing={1}>
      <Typography variant="body2" sx={{ color: "#A0A0A0", fontWeight: 600 }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ color: "#FFF" }}>
        {value ?? '—'}
      </Typography>
    </Stack>
  );

  // While loading:
  if (!profile) {
    return (
      <Box sx={{ bgcolor: "#0F0B1F", minHeight: "100vh", color: "#FFF", p: 4 }}>
        Loading profile...
      </Box>
    );
  }

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
              open={menuOpen}
              onClose={() => setAnchorEl(null)}
              onSignOut={handleSignOut}
              userData={{
                username: 'John Doe',
                handle: '@johndoe'
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl">
        <ProfileHeader>
          <Avatar
            sx={{
              width: 200, height: 200, position: "absolute",
              bottom: "-100px", left: "50%",
              transform: "translateX(-50%)",
              border: "4px solid #0F0B1F",
              bgcolor: "#2A1A47", fontSize: "3rem",
              boxShadow: "0 16px 32px rgba(0,0,0,0.3)"
            }}
          >
            {profile.username?.[0]?.toUpperCase() || 'U'}
          </Avatar>
        </ProfileHeader>

        <GlassCard>
          <Stack spacing={4}>
            {/* Header & Edit Button */}
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography variant="h2" sx={{ color: "#FFF", fontWeight: 700 }}>
                {profile.username || 'Unknown User'}
              </Typography>
              <Button
                variant="contained"
                onClick={() => setEditModalOpen(true)}
                startIcon={<Edit />}
                sx={{ bgcolor: "#A100FF", borderRadius: "12px", px: 4, py: 1.5 }}
              >
                Edit Profile
              </Button>
              <EditProfileModal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                userData={profile}
                onSave={handleSaveProfile}
              />
            </Stack>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <InfoItem label="Email" value={profile.email} />
                <InfoItem label="Age" value={profile.age} />
                <InfoItem label="Gender" value={profile.gender} />
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoItem label="Joined" value={profile.stats?.joined} />
                <InfoItem label="Listening Time" value={profile.stats?.listeningTime} />
                <InfoItem label="Followers" value={profile.stats?.followers} />
              </Grid>
            </Grid>

            <Typography variant="body1" sx={{ color: "#D0D0D0", lineHeight: 1.8 }}>
              {profile.bio}
            </Typography>

            <Stack spacing={2}>
              <Typography variant="h6" sx={{ color: "#A100FF", fontWeight: 600 }}>
                Interests
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {/* {profile.interests?.map((i, idx) => (
                  <Chip key={idx} label={i}
                    sx={{
                      bgcolor: "rgba(161,0,255,0.1)",
                      color: "#A100FF",
                      fontWeight: 600,
                      borderRadius: "8px"
                    }}
                  />
                )) ?? <Typography sx={{ color: "#888" }}>No interests yet.</Typography>} */}
                <Typography sx={{ color: "#888" }}>No interests yet.</Typography>
              </Stack>
            </Stack>

            <Grid container spacing={4}>
              {Object.entries(profile.stats || {}).map(([key, val]) => (
                <Grid item xs={12} sm={6} md={4} key={key}>
                  <StatCard>
                    <Typography variant="h3" sx={{ color: "#A100FF", fontWeight: 700 }}>
                      {val}
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#909090", textTransform: "uppercase" }}>
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