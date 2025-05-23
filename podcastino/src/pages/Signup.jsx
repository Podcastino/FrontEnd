import React, { useState } from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import pic4 from "../assets/Vector.png";
import pic1 from "../assets/Vector-2.png";
import pic2 from "../assets/Vector-1.png";
import pic3 from "../assets/Vector-3.png";
import mainPic from "../assets/podcastino-signup.png";

const TextfieldsColor = "rgba(209, 196, 210, 0.61)";
const ContainerColor = "rgba(0, 16, 26, 0.4)";
const CreateAccountColor = "rgb(10, 17, 44)";
const PodcastinoColor = "rgb(7, 14, 41)";

const textFieldSx = {
  mt: 0,
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: TextfieldsColor,
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: TextfieldsColor,
    },
    "&.Mui-focused fieldset": {
      borderColor: TextfieldsColor,
    },
  },
};

export default function Signup() {
  // State variables for each input field and error/success messages.
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Regular expressions for validation.
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  const phoneRegex = /^[0-9+]{7,15}$/; // allows digits and '+' (adjust as needed)

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validations.
    if (!email.trim() || !emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!username.trim() || !usernameRegex.test(username)) {
      setError("Username must be at least 3 characters and contain only letters, numbers, or underscores.");
      return;
    }
    if (!phoneNumber.trim() || !phoneRegex.test(phoneNumber)) {
      setError("Please enter a valid phone number (digits and optional '+' sign).");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const signupData = {
      email,
      username,
      phone_number: phoneNumber,
      password,
      confirm_password: confirmPassword,
    };

    try {
      const response = await fetch("https://podcastino.darkube.app/api/signup/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
  
      if (!response.ok) {
        throw new Error("Signup failed. Please try again.");
      }
  
      const data = await response.json();
      console.log("Signup successful:", data);
      setSuccess("Account created successfully! Please log in.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error(err);
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#222222",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <img src={pic1} alt="Pic 1" style={{ width: "100%", height: "50%" }} />
          <img src={pic3} alt="Pic 2" style={{ width: "100%", height: "50%" }} />
        </Box>
        <Box
          sx={{
            width: "50%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <img src={pic2} alt="Pic 3" style={{ width: "100%", height: "50%" }} />
          <img src={pic4} alt="Pic 4" style={{ width: "100%", height: "50%" }} />
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          minHeight: "100vh",
          gap: 6,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100vh",
          }}
        >
          <Typography
            sx={{
              color: PodcastinoColor,
              fontWeight: 400,
              fontSize: "48px",
              fontFamily: "Nanum Pen",
              mt: 4,
              ml: 4,
            }}
          >
            Podcastino
          </Typography>
          <img
            src={mainPic}
            alt="Main"
            style={{ width: "500px", height: "auto", opacity: 0.4 }}
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            gutterBottom
            sx={{
              color: CreateAccountColor,
              mb: 4,
              fontWeight: 700,
              fontSize: "48px",
            }}
          >
            Create Account
          </Typography>
          <Container
            sx={{
              height: "580px",
              width: "640px",
              backgroundColor: ContainerColor,
              padding: 4,
              borderRadius: "30px",
              boxShadow: 3,
              color: "white",
            }}
          >
            <form onSubmit={handleSignup}>
              {/* Email Field */}
              <Box sx={{ textAlign: "left", mb: 2, paddingX: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: TextfieldsColor, fontSize: "20px", fontWeight: 700 }}
                >
                  Email
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    style: { borderRadius: "10px", color: "white" },
                  }}
                  sx={textFieldSx}
                />
              </Box>

              {/* Username Field */}
              <Box sx={{ textAlign: "left", mb: 2, paddingX: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: TextfieldsColor, fontSize: "20px", fontWeight: 700 }}
                >
                  Username
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  InputProps={{
                    style: { borderRadius: "10px", color: "white" },
                  }}
                  sx={textFieldSx}
                />
              </Box>

              {/* Phone Number Field */}
              <Box sx={{ textAlign: "left", mb: 4, paddingX: 1 }}>
                <Typography
                  variant="subtitle1"
                  sx={{ color: TextfieldsColor, fontSize: "20px", fontWeight: 700 }}
                >
                  Phone Number
                </Typography>
                <TextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  size="small"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  InputProps={{
                    style: { borderRadius: "10px", color: "white" },
                  }}
                  sx={textFieldSx}
                />
              </Box>

              {/* Password and Confirm Password Fields */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 10,
                  mt: 2,
                  mb: 4,
                  paddingX: 1,
                }}
              >
                <Box sx={{ flex: 1, textAlign: "left" }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: TextfieldsColor, fontSize: "20px", fontWeight: 700 }}
                  >
                    Password
                  </Typography>
                  <TextField
                    fullWidth
                    type="password"
                    margin="normal"
                    variant="outlined"
                    size="small"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      style: { borderRadius: "10px", color: "white" },
                    }}
                    sx={textFieldSx}
                  />
                </Box>
                <Box sx={{ flex: 1, textAlign: "left" }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ color: TextfieldsColor, fontSize: "20px", fontWeight: 700 }}
                  >
                    Confirm Password
                  </Typography>
                  <TextField
                    fullWidth
                    type="password"
                    margin="normal"
                    variant="outlined"
                    size="small"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    InputProps={{
                      style: { borderRadius: "10px", color: "white" },
                    }}
                    sx={textFieldSx}
                  />
                </Box>
              </Box>

              {/* Error / Success Messages */}
              {error && (
                <Typography sx={{ color: "red", mb: 2 }}>{error}</Typography>
              )}
              {success && (
                <Typography sx={{ color: "green", mb: 2 }}>{success}</Typography>
              )}

              {/* Submit Button */}
              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{
                  mt: 2,
                  borderRadius: "25px",
                  backgroundColor: "#26245F",
                  fontSize: "24px",
                  color: "#97A9B2",
                  textTransform: "none",
                  "&:hover": { backgroundColor: "#211D55" },
                }}
              >
                Sign Up
              </Button>
            </form>
          </Container>
          <Box sx={{ display: "flex", justifyContent: "flex-start", mt: 2, pl: 2 }}>
            <Typography variant="body2" sx={{ color: "#AC77B1", fontSize: "16px" }}>
              already have an account?{" "}
              <a href="/login" style={{ color: "#AC77B1", textDecoration: "underline" }}>
                log in
              </a>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};