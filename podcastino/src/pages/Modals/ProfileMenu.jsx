import React from 'react';
import {
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  Avatar
} from '@mui/material';

import {
  AccountCircle as AccountCircleIcon,
  Dashboard as DashboardIcon,
  History as HistoryIcon,
  CheckCircle as CheckCircleIcon,
  ExitToApp as ExitToAppIcon,
  Mic as MicIcon,
  Headphones as HeadphonesIcon,
  Subscriptions as SubscriptionsIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ProfileMenu = ({ anchorEl, open, onClose, onSignOut, userData }) => {
  const navigate = useNavigate();
  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        elevation: 4,
        sx: {
          bgcolor: 'background.paper',
          borderRadius: "12px",
          minWidth: 280,
          border: "1px solid rgba(103, 58, 183, 0.3)",
          overflow: 'visible',
          '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
            borderLeft: '1px solid rgba(103, 58, 183, 0.3)',
            borderTop: '1px solid rgba(103, 58, 183, 0.3)'
          },
          "& .MuiMenuItem-root": {
            py: 1.5,
            px: 2,
            borderRadius: '6px',
            mx: 1,
            mt: 0.5,
            "&:hover": {
              bgcolor: 'primary.light + 20',
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
        <Stack direction="row" spacing={2} alignItems="center" width="100%">
          <Avatar 
            sx={{ 
              width: 48, 
              height: 48, 
              bgcolor: 'primary.main',
              color: 'primary.contrastText'
            }}
          >
            {userData?.name?.charAt(0) || 'JD'}
          </Avatar>
          <Stack width="100%">
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {userData?.name || 'John Doe'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {userData?.email || 'user@example.com'}
            </Typography>
            <Stack direction="row" spacing={2} mt={1}>
              <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
                <HeadphonesIcon color="primary" sx={{ fontSize: 14, mr: 0.5 }} />
                42 Following
              </Typography>
              <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
                <MicIcon color="primary" sx={{ fontSize: 14, mr: 0.5 }} />
                5 Shows
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </MenuItem>

      <Divider sx={{ my: 1, borderColor: 'divider' }} />

      {/* Menu Items */}
      <MenuItem onClick={() => {navigate('/profile')}}>
        <ListItemIcon sx={{ color: 'primary.main' }}>
          <DashboardIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="body2">Dashboard</Typography>
        </ListItemText>
      </MenuItem>

      <MenuItem onClick={onClose}>
        <ListItemIcon sx={{ color: 'primary.main' }}>
          <MicIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="body2">My Podcasts</Typography>
        </ListItemText>
      </MenuItem>

      <MenuItem onClick={onClose}>
        <ListItemIcon sx={{ color: 'primary.main' }}>
          <SubscriptionsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="body2">Subscriptions</Typography>
        </ListItemText>
      </MenuItem>

      <MenuItem onClick={onClose}>
        <ListItemIcon sx={{ color: 'primary.main' }}>
          <HistoryIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="body2">Listening History</Typography>
        </ListItemText>
      </MenuItem>

      <Divider sx={{ my: 1, borderColor: 'divider' }} />

      <MenuItem
        onClick={() => {
          onSignOut();
          onClose();
        }}
      >
        <ListItemIcon sx={{ color: 'error.main' }}>
          <ExitToAppIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          <Typography variant="body2" color="error.main">Sign Out</Typography>
        </ListItemText>
      </MenuItem>
    </Menu>
  );
};

export default ProfileMenu;