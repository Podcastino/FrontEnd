import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Paper,
  Divider,
  Alert
} from "@mui/material";
import { 
  Email, 
  Lock, 
  Person, 
  Visibility, 
  VisibilityOff,
  RecordVoiceOver,
  VerifiedUser
} from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const SignUpPage = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "" : "Invalid email format";
      case 'username':
        return value.length >= 4 ? "" : "Username must be at least 4 characters";
      case 'password':
        return value.length >= 8 ? "" : "Password must be 8+ characters";
      case 'confirmPassword':
        return value === formData.password ? "" : "Passwords don't match";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate all fields
    const newErrors = {
      email: validateField('email', formData.email),
      username: validateField('username', formData.username),
      password: validateField('password', formData.password),
      confirmPassword: validateField('confirmPassword', formData.confirmPassword)
    };
    setErrors(newErrors);

    if (Object.values(newErrors).every(error => !error)) {
      console.log("Form submitted:", formData);
      // Submit logic here
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      background: theme.palette.mode === 'dark' 
        ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, #1a1a2e 100%)`
        : `linear-gradient(135deg, ${theme.palette.primary.light} 0%, #f8f9fa 100%)`,
      position: 'relative',
      overflow: 'hidden',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: theme.palette.mode === 'dark'
          ? `radial-gradient(circle at 20% 30%, ${theme.palette.primary.main}20 0%, transparent 40%)`
          : `radial-gradient(circle at 20% 30%, ${theme.palette.primary.light}15 0%, transparent 40%)`,
        zIndex: 0,
      }
    }}>
      {/* Floating voice wave elements */}
      <Box sx={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        animation: 'pulse 8s ease-in-out infinite',
        '@keyframes pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.2 },
          '50%': { transform: 'scale(1.2)', opacity: 0.4 }
        }
      }}>
        <RecordVoiceOver sx={{ 
          fontSize: 80, 
          color: theme.palette.primary.light,
          transform: 'rotate(-15deg)'
        }} />
      </Box>

      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper elevation={24} sx={{
          p: 4,
          borderRadius: 4,
          background: theme.palette.background.paper,
          backdropFilter: 'blur(10px)',
          border: theme.palette.mode === 'dark'
            ? '1px solid rgba(255, 255, 255, 0.1)'
            : '1px solid rgba(0, 0, 0, 0.1)',
          boxShadow: theme.palette.mode === 'dark'
            ? `0 8px 32px ${theme.palette.primary.main}20`
            : `0 8px 32px ${theme.palette.primary.light}15`,
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)'
          }
        }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 800,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: 1,
              mb: 1
            }}>
              Join Podcastino
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Begin your audio journey with us
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color={errors.email ? "error" : "primary"} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: theme.palette.divider,
                  },
                }
              }}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Username"
              name="username"
              variant="outlined"
              margin="normal"
              error={!!errors.username}
              helperText={errors.username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color={errors.username ? "error" : "primary"} />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: theme.palette.divider,
                  },
                }
              }}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color={errors.password ? "error" : "primary"} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: theme.palette.divider,
                  },
                }
              }}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <VerifiedUser color={errors.confirmPassword ? "error" : "primary"} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: theme.palette.divider,
                  },
                }
              }}
              onChange={handleChange}
            />

            {errors.confirmPassword && formData.confirmPassword && (
              <Alert severity="error" sx={{ mt: 1, mb: 1 }}>
                Passwords do not match
              </Alert>
            )}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              disabled={Object.values(errors).some(error => error) || 
                        !formData.email || 
                        !formData.username || 
                        !formData.password || 
                        !formData.confirmPassword}
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: 1,
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                boxShadow: `0 4px 20px ${theme.palette.primary.main}30`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: `0 6px 24px ${theme.palette.primary.main}40`,
                },
                '&:disabled': {
                  background: theme.palette.action.disabledBackground,
                  boxShadow: 'none'
                },
                transition: 'all 0.3s ease',
              }}
            >
              Create Account
            </Button>

            <Divider sx={{ my: 3, borderColor: theme.palette.divider }} />

            <Typography variant="body2" color="text.secondary" align="center">
              Already have an account?{' '}
              <Link 
                to="/login" 
                style={{ 
                  color: theme.palette.secondary.main,
                  textDecoration: 'none',
                  fontWeight: 600
                }}
              >
                Sign In
              </Link>
            </Typography>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default SignUpPage;