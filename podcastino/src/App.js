import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PodcastLanding from './pages/landing'
import SignUpPage from "./pages/newsignup";
import TopShowsPage from './pages/topshows'
import ShowsPage from './pages/generes'
import Profile from "./pages/Profile";
import PodcastEpisodePage from "./pages/podpage";
import { AppBar, Container, Stack, Typography, Button, Box, TextField, ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import ForgetPassword from "./pages/Forget-pass";
import {
  Search,
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
});


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
    <Router>
      {/* Navbar */}
      {/* <AppBar position="sticky" color="default" elevation={1}>
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" py={2}>
            <Typography variant="h4" sx={{ fontWeight: 700, mr: 4, color: 'primary.main' }}>
              PODCASTINO
            </Typography>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
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

            <Button href="/signup" variant="contained" color="primary" sx={{ mr: 2 }}>
              Sign In
            </Button>
          </Stack>
        </Container>
      </AppBar> */}

      {/* Page Content */}
      <Box>
        <Routes>
          <Route path="/" element={<PodcastLanding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forget-pass" element={<ForgetPassword />} />
          <Route path="/episode" element={<PodcastEpisodePage />} />
          <Route path="/shows" element={<ShowsPage />} />
          <Route path="/topshows" element={<TopShowsPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Box>
    </Router>
    </ThemeProvider>
  );
}

export default App;