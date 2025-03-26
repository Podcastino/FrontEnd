import React from "react";
import { Box, Container, Typography, TextField, Button } from "@mui/material";
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

const Signup = () => {
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
                InputProps={{
                  style: { borderRadius: "10px", color: "white" },
                }}
                sx={textFieldSx}
              />
            </Box>
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
                InputProps={{
                  style: { borderRadius: "10px", color: "white" },
                }}
                sx={textFieldSx}
              />
            </Box>
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
                InputProps={{
                  style: { borderRadius: "10px", color: "white" },
                }}
                sx={textFieldSx}
              />
            </Box>
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
                  InputProps={{
                    style: { borderRadius: "10px", color: "white" },
                  }}
                  sx={textFieldSx}
                />
              </Box>
            </Box>
            <Button
              fullWidth
              variant="contained"
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

export default Signup;