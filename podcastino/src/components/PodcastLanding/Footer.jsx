// src/components/PodcastLanding/Footer.jsx

import React from "react";
import { Box, Container, Typography, Button, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export default function Footer({ isMobile }) {
  const theme = useTheme();

  return (
    <>
      {/* Call to Action */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "primary.contrastText",
          py: isMobile ? 4 : 8,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant={isMobile ? "h4" : "h3"}
            sx={{
              fontWeight: 700,
              mb: 3,
              fontSize: isMobile ? "1.5rem" : "2.5rem",
            }}
          >
            Ready to start listening?
          </Typography>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            sx={{
              mb: 4,
              fontSize: isMobile ? "1rem" : "1.5rem",
            }}
          >
            Join millions of podcast enthusiasts today.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size={isMobile ? "medium" : "large"}
            sx={{
              px: isMobile ? 4 : 6,
              py: isMobile ? 1 : 1.5,
              fontSize: isMobile ? "0.875rem" : "1.1rem",
              fontWeight: 600,
            }}
            href="/signup"
          >
            Sign Up Free
          </Button>
        </Container>
      </Box>

      {/* Footer Links */}
      <Divider sx={{ my: isMobile ? 2 : 4 }} />
      <Container maxWidth="lg" sx={{ py: isMobile ? 2 : 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: isMobile ? 2 : 4,
            flexWrap: isMobile ? "wrap" : "nowrap",
          }}
        >
          <Button size="small">Privacy Policy</Button>
          <Button size="small">Terms of Service</Button>
          <Button size="small">Contact Us</Button>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{
            mt: 2,
            fontSize: isMobile ? "0.75rem" : "0.875rem",
          }}
        >
          © {new Date().getFullYear()} Podcastino. All rights reserved.
        </Typography>
      </Container>
    </>
  );
}
