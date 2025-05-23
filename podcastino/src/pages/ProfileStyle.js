import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

export const ProfileHeader = styled(Box)(({ theme }) => ({
  position: "relative",
  height: "400px",
  background: "linear-gradient(45deg, #0F0B1F 0%, #2A1A47 100%)",
  borderRadius: "24px",
  marginTop: theme.spacing(4),
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 100%)",
  },
}));

export const GlassCard = styled(Box)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.05)",
  backdropFilter: "blur(12px)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  padding: theme.spacing(4),
  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
  marginTop: theme.spacing(4),
}));

export const StatCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  background: "linear-gradient(145deg, #1A132F 0%, #2A1A47 100%)",
  borderRadius: "12px",
  textAlign: "center",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
  },
}));