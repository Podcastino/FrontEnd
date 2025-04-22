import React, { useState } from "react";
import { Box, Card, CardContent, Typography, TextField, Button, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import pic4 from "../assets/Vector.png";
import pic1 from "../assets/Vector-2.png";
import pic2 from "../assets/Vector-1.png";
import pic3 from "../assets/Vector-3.png";

const customColor = "rgba(209,196,210,0.61)";
const containerBg = "rgba(0,16,26,0.9)";
const CreateAccountColor = "rgb(41, 51, 92)";
const borderSx = {
  "& .MuiOutlinedInput-root": {
    "& fieldset": { borderColor: customColor, borderWidth: 2 },
    "&:hover fieldset": { borderColor: customColor },
    "&.Mui-focused fieldset": { borderColor: customColor },
    color: customColor,
    borderRadius: "10px",
  },
};

export default function Login() {
  // State variables for input fields and error messages
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validations:
    if (!email.trim()) {
      setError("email is required.");
      return;
    }
    if (!password) {
      setError("Password is required.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError(
        "Please enter a valid email"
      );
      return;
    }

    try {
      const response = await fetch("https://podcastino.darkube.app/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      console.log("Login successful:", data);
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#222", position: "relative" }}>
      <Box sx={{ position: "absolute", inset: 0, display: "flex", zIndex: 0 }}>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <img src={pic1} alt="Decoration" style={{ width: "100%", height: "50%" }} />
          <img src={pic3} alt="Decoration" style={{ width: "100%", height: "50%" }} />
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <img src={pic2} alt="Decoration" style={{ width: "100%", height: "50%" }} />
          <img src={pic4} alt="Decoration" style={{ width: "100%", height: "50%" }} />
        </Box>
      </Box>

      <Box
        sx={{
          zIndex: 2,
          display: "flex",
          height: "100vh",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          gutterBottom
          sx={{
            color: CreateAccountColor,
            mb: 4,
            fontWeight: 700,
            fontSize: "48px",
          }}
        >
          Log In
        </Typography>
        <Card
          sx={{
            width: 640,
            bgcolor: containerBg,
            borderRadius: "30px",
            boxShadow: 3,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleLogin}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ color: customColor, fontWeight: 700 }}>
                  Email
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  sx={borderSx}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Box>

              <Box sx={{ mb: 1 }}>
                <Typography variant="subtitle1" sx={{ color: customColor, fontWeight: 700 }}>
                  Password
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  size="small"
                  sx={borderSx}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>

              {error && (
                <Typography sx={{ color: "red", mb: 2 }}>{error}</Typography>
              )}

              <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
                <Button variant="text" sx={{ textTransform: "none", color: "#74588C" }}>
                  Forgot password?
                </Button>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
                <Divider sx={{ flexGrow: 1, bgcolor: "#AC77B1" }} />
                <Typography sx={{ mx: 2, color: "#AC77B1", fontSize: 16 }}>OR</Typography>
                <Divider sx={{ flexGrow: 1, bgcolor: "#AC77B1" }} />
              </Box>

              <Box sx={{ display: "flex", gap: 2, mb: 5 }}>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={
                    <img
                      src="https://developers.google.com/identity/images/g-logo.png"
                      alt="Google"
                      style={{ width: 20, height: 20 }}
                    />
                  }
                  sx={{
                    backgroundColor: "#391A53",
                    color: "#D9AFAF",
                    borderRadius: 3,
                    textTransform: "none",
                    boxShadow: 1,
                    "&:hover": { backgroundColor: "#391A73" },
                  }}
                >
                  Continue with Google
                </Button>
                <Button
                  fullWidth
                  variant="contained"
                  startIcon={
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                      alt="Facebook"
                      style={{ width: 20, height: 20 }}
                    />
                  }
                  sx={{
                    backgroundColor: "#3b5998",
                    color: "#D9AFAF",
                    borderRadius: 3,
                    textTransform: "none",
                    boxShadow: 1,
                    "&:hover": { backgroundColor: "#334d84" },
                  }}
                >
                  Continue with Facebook
                </Button>
              </Box>

              <Button
                fullWidth
                type="submit"
                sx={{
                  backgroundColor: "#26245F",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "#97A9B2",
                  borderRadius: "25px",
                  textTransform: "none",
                  mb: 2,
                  "&:hover": { backgroundColor: "#211D55" },
                }}
              >
                Log In
              </Button>
            </form>
          </CardContent>
        </Card>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mt: 2,
          }}
        >
          <Typography sx={{ color: "#AC77B1", fontSize: 20, fontWeight: 500 }}>
            Don’t have an account?
            <Button variant="text" sx={{ color: "#DD6DE7", textTransform: "none", fontSize: 20, fontWeight: 500 }}>
              Sign Up
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}