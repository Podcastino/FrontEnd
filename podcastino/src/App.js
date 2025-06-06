// src/App.jsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import ThemeProviderWrapper from './theme/ThemeProviderWrapper';
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <ThemeProviderWrapper>
      <Router>
        <Navbar />
        <div>
          <AppRoutes />
        </div>
      </Router>
    </ThemeProviderWrapper>
  );
}
