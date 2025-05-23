import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// MUI components & hooks
import {
  AppBar,
  Container,
  Typography,
  Button,
  Box,
  TextField,
  ThemeProvider,
  createTheme,
  CssBaseline,
  useMediaQuery,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  Slide,
  DialogContent,
  InputAdornment,
  Avatar
} from '@mui/material';

// MUI icons
import {
  Search,
  Menu as MenuIcon,
  Close,
  Brightness4,
  Brightness7
} from '@mui/icons-material';

// Your pages
import Login from './pages/Login';
import PodcastLanding from './pages/landing';
import SignUpPage from './pages/newsignup';
import TopShowsPage from './pages/TopShowsPage';
import Generes from './pages/Generes';
import Profile from './pages/Profile';
import PodcastEpisodePage from './pages/PodcastEpisodePage';
import ForgetPassword from './pages/Forget-pass';
import ProfileMenu from './pages/Modals/ProfileMenu'
import { fetchUserProfile } from './pages/api/userService'

// Deep Purple Theme
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#673ab7',
      light: '#9a67ea',
      dark: '#320b86',
    },
    secondary: {
      main: '#ff4081',
    },
    ...(mode === 'dark' ? {
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
    } : {
      background: {
        default: '#f8f9fa',
        paper: '#ffffff',
      },
    }),
    text: {
      ...(mode === 'dark' ? {
        primary: '#ffffff',
        secondary: 'rgba(255, 255, 255, 0.7)',
      } : {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.6)',
      }),
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});


function App() {
  const [mode, setMode] = useState('dark');
  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openProfile, setOpenProfile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const open = Boolean(anchorEl);
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );


  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
    }
    const loadUserProfile = async () => {
      try {
        const profile = await fetchUserProfile();
        setUserData(profile);
      } catch (error) {
        console.error("Failed to load user profile:", error);
      }
    };
    loadUserProfile();
  }, []);

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
  };

  const handleAvatarClick = (event) => {
    setAnchorElProfile(event.currentTarget);
    setOpenProfile(true);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileMenuClose = () => {
    setOpenProfile(false);
  };

  const handleSignOut = () => {
    localStorage.removeItem('access_token');
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Navbar */}
        <AppBar position="sticky" color="default" elevation={1}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              {isMobile ? (
                <>
                  <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenuClick}
                    sx={{ marginRight: 0, padding: 0 }}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleMenuClose}>Discover</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Genres</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Top Shows</MenuItem>
                  </Menu>
                </>
              ) : (
                <>
                </>
              )}
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  ml: isMobile ? 1 : 0,
                  mr: isMobile ? 0 : 4,
                  fontSize: isMobile ? '1.25rem' : '2.125rem',
                  background: `
      linear-gradient(
        135deg,
        ${theme.palette.primary.main} 25%,
        ${theme.palette.secondary.main} 50%,
        ${theme.palette.primary.light} 75%
      )
    `,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  position: 'relative',
                  animation: 'dreamyEffect 4s ease-in-out infinite',
                  textShadow: mode === 'dark' ? `
      0 0 10px ${theme.palette.primary.main}30,
      0 0 20px ${theme.palette.secondary.main}20,
      0 0 30px ${theme.palette.primary.light}10
    ` : 'none',
                  '@keyframes dreamyEffect': {
                    '0%, 100%': {
                      filter: 'blur(0.2px)',
                      textShadow: mode === 'dark' ? `
          0 0 10px ${theme.palette.primary.main}30,
          0 0 20px ${theme.palette.secondary.main}20,
          0 0 30px ${theme.palette.primary.light}10
        ` : 'none'
                    },
                    '50%': {
                      filter: 'blur(0.5px)',
                      textShadow: mode === 'dark' ? `
          0 0 20px ${theme.palette.primary.main}50,
          0 0 40px ${theme.palette.secondary.main}30,
          0 0 60px ${theme.palette.primary.light}20
        ` : 'none',
                      backgroundPosition: '100% 50%'
                    }
                  }
                }}
              >
                PODCASTINO
              </Typography>

              {!isMobile ? (
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Button color="inherit">Discover</Button>
                  <Button color="inherit">Genres</Button>
                  <Button color="inherit">Top Shows</Button>
                </Box>
              ) : (
                <>
                </>
              )}

              <Box sx={{ flexGrow: 1 }} />

              {!isMobile ? (
                <TextField
                  size="small"
                  placeholder="Search podcasts..."
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1 }} />,
                  }}
                  sx={{
                    width: isTablet ? 200 : 250,
                    mr: 2
                  }}
                />
              ) : (
                <>
                  <IconButton onClick={handleSearchOpen}>
                    <Search />
                  </IconButton>
                  <Dialog
                    fullScreen
                    open={searchOpen}
                    onClose={handleSearchClose}
                    TransitionComponent={Slide}
                    TransitionProps={{
                      direction: 'down',
                    }}
                    PaperProps={{
                      sx: {
                        bgcolor: 'background.default',
                        pt: 8
                      }
                    }}
                  >
                    <DialogContent>
                      <Container maxWidth="sm">
                        <TextField
                          fullWidth
                          autoFocus
                          placeholder="Search podcasts..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Search />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={handleSearchClose}>
                                  <Close />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 4,
                              height: 56
                            }
                          }}
                        />
                      </Container>
                    </DialogContent>
                  </Dialog>
                </>
              )}

              <IconButton
                onClick={colorMode.toggleColorMode}
                color="inherit"
                sx={{ mr: 1 }}
              >
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>

              {/* Conditional rendering based on login state */}
              {isLoggedIn ? (
                <Avatar
                  sx={{ width: 40, height: 40, cursor: 'pointer' }}
                  alt="User Avatar"
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  onClick={handleAvatarClick}
                />
              ) : (
                <Button href="/signup" variant="contained" color="primary" sx={{ mr: 2 }}>
                  Sign In
                </Button>
              )}
            </Toolbar>
          </Container>
          <ProfileMenu
            anchorEl={anchorElProfile}
            open={openProfile}
            onClose={handleProfileMenuClose}
            onSignOut={handleSignOut}
            userData={userData}
          />
        </AppBar>

        {/* Page Content */}
        <Box>
          <Routes>
            <Route path="/" element={<PodcastLanding Theme={theme} isMobile={isMobile} isTablet={isTablet} isLoggedIn={isLoggedIn}/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/forget-pass" element={<ForgetPassword />} />
            {/* <Route path="/episode" element={<PodcastEpisodePage Theme={theme} isMobile={isMobile} isTablet={isTablet} />} /> */}
            <Route
              path="/episode/:id"
              element={<PodcastEpisodePage Theme={theme} isMobile={isMobile} isTablet={isTablet} />}
            />
            <Route path="/Generes" element={<Generes Theme={theme} isMobile={isMobile} isTablet={isTablet} />} />
            <Route path="/topshows" element={<TopShowsPage Theme={theme} isMobile={isMobile} isTablet={isTablet} />} />
            <Route path="/profile" element={<Profile Theme={theme} isMobile={isMobile} isTablet={isTablet} />} />
          </Routes>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;