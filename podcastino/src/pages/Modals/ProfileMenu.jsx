import React from 'react';
import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from '@mui/material';

import {
  AccountCircle as AccountCircleIcon,
  Dashboard as DashboardIcon,
  History as HistoryIcon,
  CheckCircle as CheckCircleIcon,
  ExitToApp as ExitToAppIcon
} from '@mui/icons-material';

const ProfileMenu = ({ anchorEl, open, onClose, onSignOut, userData }) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        elevation: 0,
        sx: {
          bgcolor: "#1A132F",
          borderRadius: "8px",
          minWidth: 240,
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.05)",
          "& .MuiMenuItem-root": {
            py: 1.5,
            px: 2,
            "&:hover": {
              bgcolor: "rgba(161, 0, 255, 0.1)",
            },
            "&.Mui-disabled": {
              opacity: 1,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {/* User Profile Header */}
      <MenuItem disabled sx={{ '&.Mui-disabled': { opacity: 1 } }}>
        <Stack direction="row" spacing={2} alignItems="center">
          <AccountCircleIcon sx={{ color: "#A100FF", fontSize: 40 }} />
          <Stack>
            <Typography variant="body1" sx={{ color: "#FFF", fontWeight: 500 }}>
              {userData?.username || 'John Doe'}
            </Typography>
            <Typography variant="caption" sx={{ color: "#B0B0B0" }}>
              {userData?.handle || '@johndoe'}
            </Typography>
          </Stack>
        </Stack>
      </MenuItem>

      <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.1)" }} />

      {/* Menu Items */}
      <MenuItem onClick={onClose}>
        <ListItemIcon sx={{ color: "#A100FF" }}>
          <DashboardIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            sx: {
              color: '#E0E0E0',
              fontSize: '0.9rem'
            }
          }}
        >
          Creator Studio
        </ListItemText>
      </MenuItem>

      <MenuItem onClick={onClose}>
        <ListItemIcon sx={{ color: "#A100FF" }}>
          <HistoryIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            sx: {
              color: '#E0E0E0',
              fontSize: '0.9rem'
            }
          }}
        >
          History
        </ListItemText>
      </MenuItem>

      <MenuItem onClick={onClose}>
        <ListItemIcon sx={{ color: "#A100FF" }}>
          <CheckCircleIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            sx: {
              color: '#E0E0E0',
              fontSize: '0.9rem'
            }
          }}
        >
          Subscribed
        </ListItemText>
      </MenuItem>

      <Divider sx={{ my: 1, borderColor: "rgba(255,255,255,0.1)" }} />

      <MenuItem
        onClick={() => {
          onSignOut();
          onClose();
        }}
      >
        <ListItemIcon sx={{ color: "#FF5555" }}>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            sx: {
              color: '#FF5555',
              fontSize: '0.9rem'
            }
          }}
        >
          Sign Out
        </ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;