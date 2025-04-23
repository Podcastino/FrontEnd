import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
  Grid,
  Stack,
  TextField,
  MenuItem,
  Button,
  Typography, 
  FormControl,
  InputLabel, 
  Select, 
  LinearProgress
} from '@mui/material';
import {
    CloudUpload as CloudUploadIcon,
    Close as CloseIcon,
} from '@mui/icons-material';

const UploadModal = ({ open, onClose }) => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [file, setFile] = useState(null);
    const [coverArt, setCoverArt] = useState(null);

    const handleFileUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            // Simulate upload progress
            let progress = 0;
            const interval = setInterval(() => {
                progress += 10;
                setUploadProgress(progress);
                if (progress >= 100) clearInterval(interval);
            }, 200);
        }
    };

    const handleCoverArtUpload = (event) => {
        setCoverArt(URL.createObjectURL(event.target.files[0]));
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
                Upload New Podcast
                <IconButton onClick={onClose} sx={{ color: "#A100FF" }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent sx={{ py: 4 }}>
                <Grid container spacing={4}>
                    {/* Left Column */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                border: "2px dashed #A100FF",
                                mt: 2,
                                borderRadius: "12px",
                                p: 4,
                                textAlign: "center",
                                cursor: "pointer",
                                "&:hover": {
                                    bgcolor: "rgba(161, 0, 255, 0.05)",
                                },
                            }}
                        >
                            <input
                                type="file"
                                accept="audio/*"
                                onChange={handleFileUpload}
                                hidden
                                id="podcast-upload"
                            />
                            <label htmlFor="podcast-upload">
                                <CloudUploadIcon
                                    sx={{
                                        fontSize: 48,
                                        color: "#A100FF",
                                        mb: 2,
                                    }}
                                />
                                <Typography variant="h6" sx={{ color: "#FFF" }}>
                                    Drag & Drop Audio File
                                </Typography>
                                <Typography variant="body2" sx={{ color: "#A0A0A0", mt: 1 }}>
                                    or click to browse files
                                </Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: "#666",
                                        display: "block",
                                        mt: 2,
                                    }}
                                >
                                    Supported formats: MP3, WAV, AAC (Max 500MB)
                                </Typography>
                            </label>
                        </Box>

                        {file && (
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="body2" sx={{ color: "#FFF" }}>
                                    Selected file: {file.name}
                                </Typography>
                                <LinearProgress
                                    variant="determinate"
                                    value={uploadProgress}
                                    sx={{
                                        mt: 1,
                                        height: 8,
                                        borderRadius: 4,
                                        bgcolor: "#2A1A47",
                                        "& .MuiLinearProgress-bar": {
                                            bgcolor: "#A100FF",
                                        },
                                    }}
                                />
                            </Box>
                        )}
                    </Grid>

                    {/* Right Column */}
                    <Grid item xs={12} md={6}>
                        <Stack spacing={3} sx={{ p: 2 }}>
                            <TextField
                                fullWidth
                                label="Episode Title"
                                variant="outlined"
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
                                label="Description"
                                multiline
                                rows={4}
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

                            <FormControl fullWidth>
                                <InputLabel sx={{ color: "#A0A0A0" }}>Category</InputLabel>
                                <Select
                                    label="Category"
                                    sx={{
                                        color: "#FFF",
                                        borderRadius: "8px",
                                        bgcolor: "#2A1A47",
                                        "& .MuiSelect-icon": { color: "#A100FF" },
                                    }}
                                >
                                    {["Technology", "Business", "Education", "Entertainment"].map(
                                        (cat) => (
                                            <MenuItem
                                                key={cat}
                                                value={cat}
                                                sx={{
                                                    bgcolor: "#1A132F",
                                                    "&:hover": { bgcolor: "#2A1A47" },
                                                }}
                                            >
                                                {cat}
                                            </MenuItem>
                                        )
                                    )}
                                </Select>
                            </FormControl>

                            <Box sx={{ mt: 2 }}>
                                <Typography variant="body2" sx={{ color: "#FFF", mb: 1 }}>
                                    Cover Art
                                </Typography>
                                <input
                                    accept="image/*"
                                    type="file"
                                    hidden
                                    id="cover-art-upload"
                                    onChange={handleCoverArtUpload}
                                />
                                <label htmlFor="cover-art-upload">
                                    <Box
                                        sx={{
                                            width: "100%",
                                            height: 150,
                                            border: "2px dashed #A100FF",
                                            borderRadius: "8px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            cursor: "pointer",
                                            bgcolor: coverArt
                                                ? "transparent"
                                                : "rgba(161, 0, 255, 0.05)",
                                            "&:hover": {
                                                bgcolor: "rgba(161, 0, 255, 0.1)",
                                            },
                                        }}
                                    >
                                        {coverArt ? (
                                            <img
                                                src={coverArt}
                                                alt="Cover art"
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    borderRadius: "6px",
                                                }}
                                            />
                                        ) : (
                                            <Typography sx={{ color: "#A100FF" }}>
                                                Click to upload cover image
                                            </Typography>
                                        )}
                                    </Box>
                                </label>
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
                    sx={{
                        bgcolor: "#A100FF",
                        borderRadius: "8px",
                        px: 4,
                        "&:hover": { bgcolor: "#8A00D4" },
                    }}
                >
                    Publish Episode
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UploadModal