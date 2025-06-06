// src/components/Navbar.jsx
import React, { useState, useContext, useEffect } from 'react';
import {
  AppBar,
  Container,
  Typography,
  Button,
  Box,
  TextField,
  useMediaQuery,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  Slide,
  DialogContent,
  InputAdornment,
  Avatar,
} from '@mui/material';
import {
  Search,
  Menu as MenuIcon,
  Close,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { ColorModeContext } from '../theme/ThemeProviderWrapper';
import ProfileMenu from '../components/ProfileMenu';
import { fetchUserProfile } from '../api/userService';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const navigate = useNavigate();

  // State
  const [mode] = useState(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElProfile, setAnchorElProfile] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openProfile, setOpenProfile] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Menu open booleans
  const menuOpen = Boolean(anchorEl);

  // On mount, check token & fetch profile
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
      (async () => {
        try {
          const data = await fetchUserProfile();
          setUserData(data);
        } catch (err) {
          console.error('Error loading profile:', err);
        }
      })();
    }
  }, []);

  const handleSearchOpen = () => setSearchOpen(true);
  const handleSearchClose = () => setSearchOpen(false);
  const handleAvatarClick = (e) => {
    setAnchorElProfile(e.currentTarget);
    setOpenProfile(true);
  };
  const handleMenuClick = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleProfileMenuClose = () => setOpenProfile(false);
  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <>
      <AppBar position="sticky" color="default" elevation={1}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Hamburger for mobile */}
            {isMobile && (
              <>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  onClick={handleMenuClick}
                  sx={{ p: 0, mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={menuOpen} onClose={handleMenuClose}>
                  {/* <MenuItem onClick={() => { handleMenuClose(); navigate('/'); }}>Discover</MenuItem> */}
                  <MenuItem onClick={() => { handleMenuClose(); navigate('/generes'); }}>Genres</MenuItem>
                  <MenuItem onClick={() => { handleMenuClose(); navigate('/toppodcasts'); }}>Top Podcasts</MenuItem>
                </Menu>
              </>
            )}

            {/* Logo / Title */}
            <Typography
              variant="h4"
              sx={{
                fontWeight: 900,
                ml: isMobile ? 1 : 0,
                mr: isMobile ? 0 : 4,
                fontSize: isMobile ? '1.25rem' : '2.125rem',
                cursor: 'pointer',
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
                textShadow:
                  theme.palette.mode === 'dark'
                    ? `
                    0 0 10px ${theme.palette.primary.main}30,
                    0 0 20px ${theme.palette.secondary.main}20,
                    0 0 30px ${theme.palette.primary.light}10`
                    : 'none',
                '@keyframes dreamyEffect': {
                  '0%, 100%': {
                    filter: 'blur(0.2px)',
                    textShadow:
                      theme.palette.mode === 'dark'
                        ? `
                          0 0 10px ${theme.palette.primary.main}30,
                          0 0 20px ${theme.palette.secondary.main}20,
                          0 0 30px ${theme.palette.primary.light}10`
                        : 'none',
                  },
                  '50%': {
                    filter: 'blur(0.5px)',
                    textShadow:
                      theme.palette.mode === 'dark'
                        ? `
                          0 0 20px ${theme.palette.primary.main}50,
                          0 0 40px ${theme.palette.secondary.main}30,
                          0 0 60px ${theme.palette.primary.light}20`
                        : 'none',
                    backgroundPosition: '100% 50%',
                  },
                },
              }}
              onClick={() => navigate('/')}
            >
              PODCASTINO
            </Typography>

            {/* Desktop nav buttons */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 3 }}>
                {/* <Button color="inherit" onClick={() => navigate('/')}>Discover</Button> */}
                <Button color="inherit" onClick={() => navigate('/generes')}>Genres</Button>
                <Button color="inherit" onClick={() => navigate('/toppodcasts')}>Top podcasts</Button>
              </Box>
            )}

            <Box sx={{ flexGrow: 1 }} />

            {/* Search field or icon */}
            {!isMobile ? (
              <TextField
                size="small"
                placeholder="Search podcasts..."
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1 }} />,
                }}
                sx={{ width: isTablet ? 200 : 250, mr: 2 }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                  TransitionProps={{ direction: 'down' }}
                  PaperProps={{ sx: { bgcolor: 'background.default', pt: 8 } }}
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
                            height: 56,
                          },
                        }}
                      />
                    </Container>
                  </DialogContent>
                </Dialog>
              </>
            )}

            {/* Dark / Light toggle */}
            <IconButton onClick={colorMode.toggleColorMode} color="inherit" sx={{ mr: 1 }}>
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>

            {/* Avatar / Sign In */}
            {isLoggedIn && userData ? (
              <Avatar
                sx={{ width: 40, height: 40, cursor: 'pointer' }}
                alt={userData.username}
                src={userData.profile_image || undefined}
                onClick={handleAvatarClick}
              >
                {userData.username?.charAt(0) || ''}
              </Avatar>
            ) : (
              <Button href="/signup" variant="contained" color="primary" sx={{ mr: 2 }}>
                Sign In
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Profile dropdown menu */}
      <ProfileMenu
        anchorEl={anchorElProfile}
        open={openProfile}
        onClose={handleProfileMenuClose}
        onSignOut={handleSignOut}
        userData={userData}
      />
    </>
  );
}
