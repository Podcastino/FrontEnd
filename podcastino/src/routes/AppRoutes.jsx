// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ForgetPassword from '../pages/Forget-pass';
import PodcastLanding from '../pages/PodcastLanding';
import TopPodcastsPage from '../pages/TopPodcastsPage';
import Generes from '../pages/Generes';
import Profile from '../pages/Profile';
import PodcastEpisodePage from '../pages/PodcastEpisodePage';

export default function AppRoutes({ Theme, isMobile, isTablet, isLoggedIn }) {
  return (
    <Routes>
      <Route
        path="/"
        element={<PodcastLanding isMobile={isMobile} isTablet={isTablet} isLoggedIn={isLoggedIn} />}
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forget-pass" element={<ForgetPassword />} />
      <Route
        path="/episode/:id"
        element={<PodcastEpisodePage isMobile={isMobile} isTablet={isTablet} />}
      />
      <Route path="/generes" element={<Generes isMobile={isMobile} isTablet={isTablet} />} />
      <Route path="/toppodcasts" element={<TopPodcastsPage isMobile={isMobile} isTablet={isTablet} />} />
      <Route path="/profile" element={<Profile isMobile={isMobile} isTablet={isTablet} />} />
    </Routes>
  );
}
