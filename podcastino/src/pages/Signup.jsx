import React from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
import pic4 from "../assets/Vector.png";
import pic1 from "../assets/Vector-2.png";
import pic2 from "../assets/Vector-1.png";
import pic3 from "../assets/Vector-3.png";
import mainPic from "../assets/podcastino-signup.png"; // Import your main image

const Signup = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#222222",
        position: "relative",
      }}
    >
      {/* Background layer with pictures arranged in 2 columns */}
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
        {/* Left Column */}
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

        {/* Right Column */}
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

      {/* Flex container for main image and signup form arranged in a row */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          minHeight: "100vh",
          gap: 4,
        }}
      >
        {/* Main image on the left */}
        <Box>
          <img src={mainPic} alt="Main" style={{ width: "500px", height: "auto", marginTop: '50px' }} />
        </Box>

        {/* Wrapper Box for "Create Account" and the form container */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            gutterBottom
            sx={{ color: "#16ABBCF0", mb: 4, fontWeight: 700, fontSize: "48px" }}
          >
            Create Account
          </Typography>
          {/* Signup form container */}
          <Container
            sx={{
              height: "600px",
              width: "640px",
              backgroundColor: "#183C53",
              padding: 4,
              borderRadius: '20px',
              boxShadow: 3,
              color: "white",
            }}
          >
            {/* Email Field */}
            <Box sx={{ textAlign: "left", mb: 2, paddingX: 1 }}>
              <Typography variant="subtitle1" color="#AA41AD" fontSize="20px" fontWeight={700}>
                Email
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                InputProps={{
                  style: { borderRadius: "10px", backgroundColor: "#FFFFF0", color: "#222222" },
                }}
                sx={{ mt: 0 }}
              />
            </Box>

            {/* Username Field */}
            <Box sx={{ textAlign: "left", mb: 2, paddingX: 1 }}>
              <Typography variant="subtitle1" color="#AA41AD" fontSize="20px" fontWeight={700}>
                Username
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                InputProps={{
                  style: { borderRadius: "10px", backgroundColor: "#FFFFF0", color: "#222222" },
                }}
                sx={{ mt: 0 }}
              />
            </Box>

            {/* Phone Number Field */}
            <Box sx={{ textAlign: "left", mb: 4, paddingX: 1 }}>
              <Typography variant="subtitle1" color="#AA41AD" fontSize="20px" fontWeight={700}>
                Phone Number
              </Typography>
              <TextField
                fullWidth
                margin="normal"
                variant="outlined"
                size="small"
                InputProps={{
                  style: { borderRadius: "10px", backgroundColor: "#FFFFF0", color: "#222222" },
                }}
                sx={{ mt: 0 }}
              />
            </Box>

            {/* Row for Password and Confirm Password */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 10,
                mt: 2,
                mb: 2,
                paddingX: 1,
              }}
            >
              <Box sx={{ flex: 1, textAlign: "left" }}>
                <Typography variant="subtitle1" color="#AA41AD" fontSize="20px" fontWeight={700}>
                  Password
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  margin="normal"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    style: { borderRadius: "10px", backgroundColor: "#FFFFF0", color: "#222222" },
                  }}
                  sx={{ mt: 0 }}
                />
              </Box>
              <Box sx={{ flex: 1, textAlign: "left" }}>
                <Typography variant="subtitle1" color="#AA41AD" fontSize="20px" fontWeight={700}>
                  Confirm Password
                </Typography>
                <TextField
                  fullWidth
                  type="password"
                  margin="normal"
                  variant="outlined"
                  size="small"
                  InputProps={{
                    style: { borderRadius: "10px", backgroundColor: "#FFFFF0", color: "#222222" },
                  }}
                  sx={{ mt: 0 }}
                />
              </Box>
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                borderRadius: "10px",
                backgroundColor: "#A3189E",
                fontSize: "24px",
                "&:hover": { backgroundColor: "#8e1780" },
              }}
            >
              Sign Up
            </Button>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;