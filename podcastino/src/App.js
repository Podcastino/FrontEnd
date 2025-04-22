import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import ForgetPassword from "./pages/Forget-pass";

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
        </Routes>
      </Box>
    </Router>
  );
}

export default App;