import React, { useState, useRef } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  Typography,
  ThemeProvider,
  CssBaseline,
} from '@mui/material';
import {
  PlayArrow,
  FavoriteBorder,
  TrendingUp,
  AccessTime,
  People
} from '@mui/icons-material';

export default function TopShowsPage ({Theme, isMobile, isTablet}) {
  const [activeTab, setActiveTab] = useState('weekly');
  
  // Create refs for each section
  const weeklyRef = useRef(null);
  const monthlyRef = useRef(null);
  const yearlyRef = useRef(null);
  const subscribersRef = useRef(null);

  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    // Update active tab based on which section we're scrolling to
    if (ref === weeklyRef) setActiveTab('weekly');
    else if (ref === monthlyRef) setActiveTab('monthly');
    else if (ref === yearlyRef) setActiveTab('yearly');
    else if (ref === subscribersRef) setActiveTab('subscribers');
  };

  // Sample data
  const shows = [
    {
      id: 1,
      title: 'Tech Today',
      host: 'Sarah Johnson',
      category: 'Technology',
      subscribers: '1.2M',
      episodes: 142,
      image: 'https://source.unsplash.com/3wylDrjxH-E/300x300',
      weeklyRank: 1,
      monthlyRank: 3,
      yearlyRank: 5
    },
    {
      id: 2,
      title: 'Business Insights',
      host: 'Michael Chen',
      category: 'Business',
      subscribers: '950K',
      episodes: 89,
      image: 'https://source.unsplash.com/7okkFhxrxNw/300x300',
      weeklyRank: 2,
      monthlyRank: 1,
      yearlyRank: 2
    },
    {
      id: 3,
      title: 'Science Weekly',
      host: 'Emma Rodriguez',
      category: 'Science',
      subscribers: '800K',
      episodes: 120,
      image: 'https://source.unsplash.com/QckxruozjRg/300x300',
      weeklyRank: 3,
      monthlyRank: 2,
      yearlyRank: 3
    },
    {
      id: 4,
      title: 'History Uncovered',
      host: 'David Wilson',
      category: 'History',
      subscribers: '750K',
      episodes: 110,
      image: 'https://source.unsplash.com/8CqDvPuo_kI/300x300',
      weeklyRank: 4,
      monthlyRank: 5,
      yearlyRank: 1
    },
    {
      id: 5,
      title: 'Health Matters',
      host: 'Lisa Park',
      category: 'Health',
      subscribers: '700K',
      episodes: 95,
      image: 'https://source.unsplash.com/zFrUz_tNjCY/300x300',
      weeklyRank: 5,
      monthlyRank: 4,
      yearlyRank: 4
    }
  ];

  const rankingSections = [
    {
      title: 'Weekly Top Picks',
      icon: <AccessTime />,
      sortBy: 'weeklyRank',
      timeframe: 'This Week',
      ref: weeklyRef,
      id: 'weekly'
    },
    {
      title: 'Monthly Leaders',
      icon: <TrendingUp />,
      sortBy: 'monthlyRank',
      timeframe: 'This Month',
      ref: monthlyRef,
      id: 'monthly'
    },
    {
      title: 'All-Time Greats',
      icon: <People />,
      sortBy: 'yearlyRank',
      timeframe: 'This Year',
      ref: yearlyRef,
      id: 'yearly'
    },
    {
      title: 'Most Subscribed',
      icon: <People />,
      sortBy: 'subscribers',
      timeframe: 'All Time',
      ref: subscribersRef,
      id: 'subscribers'
    }
  ];

  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Container maxWidth="xl" sx={{ py: isMobile ? 2 : 4 }}>
        {/* Header */}

        {/* Ranking Sections */}
        {rankingSections.map((section) => (
          <Box 
            key={section.title} 
            ref={section.ref}
            id={section.id}
            sx={{ 
              mb: isMobile ? 4 : 6, 
              scrollMarginTop: '100px',
              px: isMobile ? 1 : 0
            }}
          >
            <Box sx={{ 
              display: 'flex',
              alignItems: 'center',
              mb: isMobile ? 2 : 3,
              gap: 1,
              pl: isMobile ? 1 : 0
            }}>
              <IconButton sx={{ 
                color: 'primary.main',
                backgroundColor: Theme.palette.primary.main + '20',
                borderRadius: 2,
                p: isMobile ? 0.5 : 1
              }}>
                {React.cloneElement(section.icon, { 
                  fontSize: isMobile ? 'small' : 'medium' 
                })}
              </IconButton>
              <Typography variant={isMobile ? 'h5' : 'h4'} sx={{ 
                fontWeight: 700,
                fontSize: isMobile ? '1.25rem' : '1.5rem'
              }}>
                {section.title}
                <Typography component="span" sx={{ 
                  ml: 1,
                  color: 'text.secondary',
                  fontSize: isMobile ? '0.75rem' : '1rem'
                }}>
                  {section.timeframe}
                </Typography>
              </Typography>
            </Box>

            <Grid 
              container 
              spacing={isMobile ? 1 : 3} 
              sx={{ 
                overflowX: 'auto',
                flexWrap: 'nowrap',
                pb: 2,
                mx: isMobile ? -1 : 0
              }}
            >
              {shows
                .sort((a, b) => a[section.sortBy] - b[section.sortBy])
                .map((show, index) => (
                  <Grid item key={show.id} sx={{ 
                    minWidth: isMobile ? 200 : 300,
                    px: isMobile ? 1 : 0
                  }}>
                    <Card sx={{ 
                      height: '100%',
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)'
                      }
                    }}>
                      <CardMedia
                        component="img"
                        height={isMobile ? 150 : 200}
                        image={show.image}
                        alt={show.title}
                        sx={{ 
                          objectFit: 'cover',
                          position: 'relative',
                          '&::after': {
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            background: `linear-gradient(180deg, transparent 0%, ${Theme.palette.background.default} 100%)`
                          }
                        }}
                      />
                      <CardContent sx={{ p: isMobile ? 1 : 2 }}>
                        <Chip 
                          label={`#${index + 1}`}
                          color="primary"
                          size={isMobile ? 'small' : 'medium'}
                          sx={{ mb: 1 }}
                        />
                        <Typography 
                          variant={isMobile ? 'subtitle1' : 'h6'} 
                          gutterBottom
                          sx={{
                            fontSize: isMobile ? '0.875rem' : '1rem'
                          }}
                        >
                          {show.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary" 
                          sx={{ 
                            mb: 1,
                            fontSize: isMobile ? '0.75rem' : '0.875rem'
                          }}
                        >
                          {show.host}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Chip 
                            label={show.category}
                            size={isMobile ? 'small' : 'medium'}
                            color="secondary"
                            sx={{
                              fontSize: isMobile ? '0.625rem' : '0.75rem'
                            }}
                          />
                          <Chip 
                            label={`${show.subscribers} subs`}
                            size={isMobile ? 'small' : 'medium'}
                            variant="outlined"
                            sx={{
                              fontSize: isMobile ? '0.625rem' : '0.75rem'
                            }}
                          />
                        </Box>
                      </CardContent>
                      <Box sx={{ 
                        p: isMobile ? 1 : 2, 
                        display: 'flex', 
                        justifyContent: 'space-between' 
                      }}>
                        <Button 
                          startIcon={<PlayArrow fontSize={isMobile ? 'small' : 'medium'} />} 
                          size={isMobile ? 'small' : 'medium'}
                          sx={{
                            fontSize: isMobile ? '0.75rem' : '0.875rem'
                          }}
                        >
                          Play
                        </Button>
                        <IconButton size={isMobile ? 'small' : 'medium'}>
                          <FavoriteBorder fontSize={isMobile ? 'small' : 'medium'} />
                        </IconButton>
                      </Box>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Box>
        ))}

        {/* Divider */}
        <Divider sx={{ my: isMobile ? 4 : 6 }} />

        {/* Footer */}
        <Box sx={{ textAlign: 'center', py: isMobile ? 2 : 3 }}>
          <Typography variant="body2" color="text.secondary" sx={{
            fontSize: isMobile ? '0.75rem' : '0.875rem'
          }}>
            © {new Date().getFullYear()} Podcastino. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </ThemeProvider>
  );
};