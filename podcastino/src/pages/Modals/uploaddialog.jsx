import React, { useState, useCallback } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  IconButton,
  styled,
  TextField,
  MenuItem,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  Divider,
  Grid,
  ListItemAvatar
} from '@mui/material';
import {
  Upload as UploadIcon,
  Close as CloseIcon,
  CloudUpload as CloudUploadIcon,
  Mic as MicIcon,
  Category as CategoryIcon,
  Collections as CollectionsIcon
} from '@mui/icons-material';

const UploadArea = styled('div')(({ theme, isDragActive }) => ({
  border: `2px dashed ${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  textAlign: 'center',
  backgroundColor: isDragActive ? `${theme.palette.primary.light}20` : theme.palette.background.paper,
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  marginBottom: theme.spacing(2)
}));

const FileUploadDialog = ({ open, onClose, creatorShows }) => {
  const [files, setFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const [episodeDetails, setEpisodeDetails] = useState({
    title: '',
    description: '',
    category: '',
    show: '',
    tags: []
  });
  
  const [newTag, setNewTag] = useState('');

  const categories = ['Technology', 'Business', 'Science', 'Health', 'Entertainment', 'News'];

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  }, []);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    setIsUploading(true);
    const interval = setInterval(() => {
      setUploadProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 300);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleDetailChange = (e) => {
    const { name, value } = e.target;
    setEpisodeDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !episodeDetails.tags.includes(newTag.trim())) {
      setEpisodeDetails(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setEpisodeDetails(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Upload New Episode
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center' }}>
            <MicIcon sx={{ mr: 1 }} /> Episode Details
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Episode Title"
                name="title"
                value={episodeDetails.title}
                onChange={handleDetailChange}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Category"
                name="category"
                value={episodeDetails.category}
                onChange={handleDetailChange}
                sx={{ mb: 2 }}
                InputProps={{
                  startAdornment: <CategoryIcon sx={{ mr: 1, color: 'action.active' }} />
                }}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={episodeDetails.description}
            onChange={handleDetailChange}
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          
          <TextField
            fullWidth
            select
            label="Belongs to Show"
            name="show"
            value={episodeDetails.show}
            onChange={handleDetailChange}
            sx={{ mb: 2 }}
            InputProps={{
              startAdornment: <CollectionsIcon sx={{ mr: 1, color: 'action.active' }} />
            }}
          >
            {creatorShows.map((show) => (
              <MenuItem key={show.id} value={show.id}>
                {show.title}
              </MenuItem>
            ))}
          </TextField>
          
          <Box sx={{ mb: 2 }}>
     
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {episodeDetails.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  onDelete={() => handleRemoveTag(tag)}
                  size="small"
                />
              ))}
            </Box>
          </Box>
        </Box>
        
        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Episode File
          </Typography>
          <UploadArea
            isDragActive={isDragActive}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              style={{ display: 'none' }}
              accept="audio/*"
              onChange={handleFileChange}
            />
            <label htmlFor="file-upload">
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CloudUploadIcon fontSize="large" color="primary" sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  {isDragActive ? 'Drop audio file here' : 'Drag & drop your episode audio'}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Supported formats: MP3, WAV, AAC
                </Typography>
                <Button 
                  variant="outlined" 
                  color="primary"
                  component="span"
                >
                  Select Audio File
                </Button>
              </Box>
            </label>
          </UploadArea>

          {files.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <List>
                {files.map((file, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton 
                        edge="end" 
                        onClick={() => removeFile(index)}
                        color="error"
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <MicIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={file.name}
                      secondary={`${(file.size / (1024 * 1024)).toFixed(2)} MB`}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Cancel
        </Button>
        <Button 
          onClick={handleUpload}
          variant="contained"
          color="primary"
          disabled={files.length === 0 || isUploading || !episodeDetails.title || !episodeDetails.show}
          startIcon={<UploadIcon />}
        >
          {isUploading ? `Uploading... ${uploadProgress}%` : 'Publish Episode'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FileUploadDialog;