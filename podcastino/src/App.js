import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PodcastLanding from "./pages/landing"
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import ForgetPassword from "./pages/Forget-pass";
import PodcastEpisodePage from "./pages/podpage";
import UserProfilePage from "./pages/pfp";
import ShowsPage from "./pages/generes" 
import TopShowsPage from "./pages/topshows"
function App() {
  return (
    <Router>
      {/* Navbar */}


      {/* Page Content */}
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forget-pass" element={<ForgetPassword />} />
          <Route path="/landing" element={<PodcastLanding />} />
          <Route path="/episode" element={<PodcastEpisodePage />} />
          <Route path="/pfp" element={<UserProfilePage />} />
          <Route path="/shows" element={<ShowsPage />} />
          <Route path="/topshows" element={<TopShowsPage />} />
          

        </Routes>
      </Box>
    </Router>
  );
}

export default App;