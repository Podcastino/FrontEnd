import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Avatar,
    Box,
    Grid,
    Stack,
    TextField,
    MenuItem,
    Chip,
    Button,
    Typography
} from '@mui/material';
import {
    Close as CloseIcon,
    Edit as EditIcon
} from '@mui/icons-material';


const EditProfileModal = ({ open, onClose, userData, onSave }) => {
    const [profilePic, setProfilePic] = useState(null);
    const [formData, setFormData] = useState({
        username: userData.username,
        email: userData.email,
        age: userData.age,
        gender: userData.gender,
        bio: userData.bio,
        // interests: [...userData.interests],
    });

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setProfilePic(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleInterestDelete = (interestToDelete) => {
        setFormData({
            ...formData,
            interests: formData.interests.filter(
                (interest) => interest !== interestToDelete
            ),
        });
    };

    const handleSubmit = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            PaperProps={{
                sx: {
                    bgcolor: "#1A132F",
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.05)",
                    backdropFilter: "blur(12px)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                },
            }}
        >
            <DialogTitle
                sx={{
                    color: "#FFF",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                Edit Profile
                <IconButton onClick={onClose} sx={{ color: "#A100FF" }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ py: 4 }}>
                <Grid container spacing={4}>
                    {/* Left Column - Profile Picture */}
                    <Grid item xs={12} md={4}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                mt: 2,
                            }}
                        >
                            <input
                                accept="image/*"
                                type="file"
                                hidden
                                id="profile-pic-upload"
                                onChange={handleFileUpload}
                            />
                            <label htmlFor="profile-pic-upload">
                                <Avatar
                                    src={profilePic}
                                    sx={{
                                        width: 150,
                                        height: 150,
                                        border: "2px solid #A100FF",
                                        bgcolor: "#2A1A47",
                                        cursor: "pointer",
                                        "&:hover": { opacity: 0.8 },
                                    }}
                                >
                                    <EditIcon sx={{ fontSize: 40 }} />
                                </Avatar>
                            </label>
                            <Typography variant="body2" sx={{ color: "#A100FF", mt: 2 }}>
                                Click to change photo
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Right Column - Form */}
                    <Grid item xs={12} md={8}>
                        <Stack spacing={3} sx={{ pt: 2 }}>
                            <TextField
                                fullWidth
                                label="Username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                InputLabelProps={{ sx: { color: "#A0A0A0" } }}
                                InputProps={{
                                    sx: {
                                        color: "#FFF",
                                        borderRadius: "8px",
                                        bgcolor: "#2A1A47",
                                        "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                                    },
                                }}
                            />

                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                InputLabelProps={{ sx: { color: "#A0A0A0" } }}
                                InputProps={{
                                    sx: {
                                        color: "#FFF",
                                        borderRadius: "8px",
                                        bgcolor: "#2A1A47",
                                        "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                                    },
                                }}
                            />

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Age"
                                        name="age"
                                        type="number"
                                        value={formData.age}
                                        onChange={handleChange}
                                        InputLabelProps={{ sx: { color: "#A0A0A0" } }}
                                        InputProps={{
                                            sx: {
                                                color: "#FFF",
                                                borderRadius: "8px",
                                                bgcolor: "#2A1A47",
                                                "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        fullWidth
                                        label="Gender"
                                        name="gender"
                                        select
                                        value={formData.gender}
                                        onChange={handleChange}
                                        InputLabelProps={{ sx: { color: "#A0A0A0" } }}
                                        InputProps={{
                                            sx: {
                                                color: "#FFF",
                                                borderRadius: "8px",
                                                bgcolor: "#2A1A47",
                                                "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                                            },
                                        }}
                                        MenuProps={{
                                            PaperProps: {
                                                sx: {
                                                    bgcolor: "#1A132F", // Match your dark background
                                                    color: "#E0E0E0", // Text color
                                                    "& .MuiMenuItem-root": {
                                                        // Style for each menu item
                                                        "&:hover": {
                                                            bgcolor: "rgba(161, 0, 255, 0.1)", // Hover effect
                                                        },
                                                        "&.Mui-selected": {
                                                            bgcolor: "rgba(161, 0, 255, 0.2)", // Selected item
                                                        },
                                                        "&.Mui-focusVisible": {
                                                            bgcolor: "rgba(161, 0, 255, 0.1)", // Focus effect
                                                        },
                                                    },
                                                },
                                            },
                                            MenuListProps: {
                                                sx: {
                                                    padding: 0, // Remove default padding
                                                },
                                            },
                                        }}
                                    >
                                        {["Male", "Female", "Other"].map((option) => (
                                            <MenuItem
                                                key={option}
                                                value={option}
                                                sx={{
                                                    bgcolor: "#1A132F", // Match dropdown background
                                                    color: '#E0E0E0',
                                                    fontSize: '0.9rem',
                                                    "&:hover": { bgcolor: "#2A1A47" },
                                                }}
                                            >
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </Grid>

                            <TextField
                                fullWidth
                                label="Bio"
                                name="bio"
                                multiline
                                rows={4}
                                value={formData.bio}
                                onChange={handleChange}
                                InputLabelProps={{ sx: { color: "#A0A0A0" } }}
                                InputProps={{
                                    sx: {
                                        color: "#FFF",
                                        borderRadius: "8px",
                                        bgcolor: "#2A1A47",
                                        "& fieldset": { borderColor: "rgba(255,255,255,0.1)" },
                                    },
                                }}
                            />

                            <Box>
                                <Typography variant="body2" sx={{ color: "#A100FF", mb: 1 }}>
                                    Interests
                                </Typography>
                                <Box
                                    sx={{
                                        p: 2,
                                        borderRadius: "8px",
                                        bgcolor: "#2A1A47",
                                        minHeight: 80,
                                    }}
                                >
                                    <Stack direction="row" spacing={1} flexWrap="wrap">
                                        {/* {formData.interests.map((interest, index) => (
                      <Chip
                        key={index}
                        label={interest}
                        onDelete={() => handleInterestDelete(interest)}
                        sx={{
                          bgcolor: "rgba(161, 0, 255, 0.1)",
                          color: "#A100FF",
                          borderRadius: "6px",
                          mb: 1,
                        }}
                      />
                    ))} */}
                                        <Button
                                            variant="outlined"
                                            sx={{
                                                color: "#A100FF",
                                                borderColor: "#A100FF",
                                                borderRadius: "6px",
                                                height: 32,
                                                "&:hover": { bgcolor: "rgba(161, 0, 255, 0.05)" },
                                            }}
                                        >
                                            Add Interest
                                        </Button>
                                    </Stack>
                                </Box>
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </DialogContent>

            <DialogActions
                sx={{
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    p: 3,
                }}
            >
                <Button
                    onClick={onClose}
                    sx={{
                        color: "#A100FF",
                        border: "1px solid #A100FF",
                        borderRadius: "8px",
                        px: 4,
                        "&:hover": { bgcolor: "rgba(161, 0, 255, 0.1)" },
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        bgcolor: "#A100FF",
                        borderRadius: "8px",
                        px: 4,
                        "&:hover": { bgcolor: "#8A00D4" },
                    }}
                >
                    Save Changes
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProfileModal;