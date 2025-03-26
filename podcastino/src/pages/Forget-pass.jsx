import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import pic4 from "../assets/Vector.png";
import pic1 from "../assets/Vector-2.png";
import pic2 from "../assets/Vector-1.png";
import pic3 from "../assets/Vector-3.png";

const customColor = "rgba(209,196,210,0.61)";
const containerBg = "rgba(0,16,26,0.4)";
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

export default function ForgetPassword() {
  return (
    <Box
      sx={{ minHeight: "100vh", backgroundColor: "#222", position: "relative" }}
    >
      <Box sx={{ position: "absolute", inset: 0, display: "flex", zIndex: 0 }}>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <img src={pic1} alt="" style={{ width: "100%", height: "50%" }} />
          <img src={pic3} alt="" style={{ width: "100%", height: "50%" }} />
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <img src={pic2} alt="" style={{ width: "100%", height: "50%" }} />
          <img src={pic4} alt="" style={{ width: "100%", height: "50%" }} />
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
            fontWeight: 700,
            fontSize: "48px",
          }}
        >
          Can’t Log in?
        </Typography>
        <Card
          sx={{
            bgcolor: containerBg,
            borderRadius: "30px",
            p: 3,
            boxShadow: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{width: '470px', mb: 4}}>
              <Typography
                sx={{ color: "#FEA1A1", fontWeight: "600", fontSize: "22px" }}
              >
                Enter your email, phone, or username and we'll send you a link
                to get back into your account.
              </Typography>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle1"
                sx={{ color: customColor, fontWeight: 700 }}
              >
                Enter your email address
              </Typography>
              <TextField fullWidth size="small" sx={borderSx} />
            </Box>

            <Button
              fullWidth
              sx={{
                backgroundColor: "#26245F",
                fontSize: 20,
                fontWeight: 700,
                color: "#97A9B2",
                borderRadius: "25px",
                textTransform: "none",
                mb: 4,
                "&:hover": { backgroundColor: "#211D55" },
              }}
            >
              Send login link
            </Button>
            <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
              <Divider sx={{ flexGrow: 1, bgcolor: "#AC77B1" }} />
              <Typography sx={{ mx: 2, color: "#AC77B1", fontSize: 16 }}>
                OR
              </Typography>
              <Divider sx={{ flexGrow: 1, bgcolor: "#AC77B1" }} />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="text"
                sx={{
                  textTransform: "none",
                  color: "#572E58",
                  textDecoration: "none",
                  fontWeight: 900,
                  fontSize: "40px",
                }}
              >
                Create New Account
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
