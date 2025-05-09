import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
  Box
} from '@mui/material';
import { PlayArrow, FavoriteBorder } from '@mui/icons-material';

const GenrePage = () => {
  const { name } = useParams();
  
  const genreData = {
    "true-crime": {
      name: "True Crime",
      description: "Explore mysterious cases, investigations, and criminal psychology",
      podcasts: [
        {
          title: "Serial",
          host: "Sarah Koenig",
          image: "https://images.unsplash.com/photo-1593697909683-bccb1b9e68a4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "Investigative journalism series that unfolds one story over the course of a season.",
          episodes: 42,
          rating: 4.9
        },
        {
          title: "My Favorite Murder",
          host: "Karen Kilgariff & Georgia Hardstark",
          image: "https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "True crime comedy podcast where the hosts tell each other their favorite tales of murder.",
          episodes: 356,
          rating: 4.8
        },
        {
          title: "Crime Junkie",
          host: "Ashley Flowers",
          image: "https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "Weekly podcast dedicated to giving you your true crime fix.",
          episodes: 215,
          rating: 4.7
        }
      ]
    },
    "comedy": {
      name: "Comedy",
      description: "Laugh out loud with hilarious hosts and stand-up specials",
      podcasts: [
        {
          title: "The Joe Rogan Experience",
          host: "Joe Rogan",
          image: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "Long-form conversations with comedians, actors, scientists, and more.",
          episodes: 1956,
          rating: 4.8
        },
        {
          title: "Conan O'Brien Needs a Friend",
          host: "Conan O'Brien",
          image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "Conan O'Brien talks to celebrities and friends with his signature humor.",
          episodes: 215,
          rating: 4.9
        },
        {
          title: "SmartLess",
          host: "Jason Bateman, Sean Hayes, Will Arnett",
          image: "https://images.unsplash.com/photo-1570158268183-d296b2892211?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "Surprise guest interviews with hilarious banter between three friends.",
          episodes: 142,
          rating: 4.8
        }
      ]
    },
    "news": {
      name: "News",
      description: "Stay informed with daily updates and in-depth analysis",
      podcasts: [
        {
          title: "The Daily",
          host: "Michael Barbaro",
          image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "This is what the news should sound like. The biggest stories of our time.",
          episodes: 1200,
          rating: 4.8
        },
        {
          title: "Up First",
          host: "NPR",
          image: "https://images.unsplash.com/photo-1585829365295-ab7cd400d7e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "The news you need to start your day in 10 minutes.",
          episodes: 850,
          rating: 4.7
        },
        {
          title: "Today, Explained",
          host: "Vox",
          image: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "Daily explainer of the most important stories of our time.",
          episodes: 650,
          rating: 4.6
        }
      ]
    },
    "business": {
      name: "Business",
      description: "Insights on entrepreneurship, finance, and market trends",
      podcasts: [
        {
          title: "How I Built This",
          host: "Guy Raz",
          image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "Interviews with entrepreneurs about how they built their companies.",
          episodes: 320,
          rating: 4.9
        },
        {
          title: "The Tim Ferriss Show",
          host: "Tim Ferriss",
          image: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "Deconstructs world-class performers to extract tools and tactics.",
          episodes: 650,
          rating: 4.8
        },
        {
          title: "Masters of Scale",
          host: "Reid Hoffman",
          image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "How companies grow from zero to a gazillion, told through stories.",
          episodes: 180,
          rating: 4.7
        }
      ]
    },
    "technology": {
      name: "Technology",
      description: "Cutting-edge tech news, gadgets, and future trends",
      podcasts: [
        {
          title: "Lex Fridman Podcast",
          host: "Lex Fridman",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "Conversations about science, technology, history, philosophy and aliens.",
          episodes: 350,
          rating: 4.9
        },
        {
          title: "Hard Fork",
          host: "The New York Times",
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "A show about the future being built right now, from crypto to AI.",
          episodes: 85,
          rating: 4.7
        },
        {
          title: "The Vergecast",
          host: "The Verge",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "The flagship podcast of The Verge about tech and gadgets.",
          episodes: 520,
          rating: 4.6
        }
      ]
    },
    "health": {
      name: "Health & Wellness",
      description: "Mental and physical health, fitness, and self-improvement",
      podcasts: [
        {
          title: "Huberman Lab",
          host: "Andrew Huberman",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "Neuroscience-based tools for everyday life from Stanford professor.",
          episodes: 120,
          rating: 4.9
        },
        {
          title: "The Doctor's Farmacy",
          host: "Dr. Mark Hyman",
          image: "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "Conversations about functional medicine and health optimization.",
          episodes: 280,
          rating: 4.8
        },
        {
          title: "Ten Percent Happier",
          host: "Dan Harris",
          image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "Practical meditation and happiness advice from experts.",
          episodes: 420,
          rating: 4.7
        }
      ]
    },
    "fiction": {
      name: "Fiction",
      description: "Immersive storytelling and dramatic performances",
      podcasts: [
        {
          title: "Welcome to Night Vale",
          host: "Cecil Baldwin",
          image: "https://images.unsplash.com/photo-1505506874110-6a7a69069a08?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "A fictional radio show from a mysterious desert town.",
          episodes: 210,
          rating: 4.8
        },
        {
          title: "The Magnus Archives",
          host: "Jonathan Sims",
          image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "Horror fiction anthology series with an overarching narrative.",
          episodes: 200,
          rating: 4.9
        },
        {
          title: "LeVar Burton Reads",
          host: "LeVar Burton",
          image: "https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
          description: "The beloved Reading Rainbow host reads short fiction.",
          episodes: 180,
          rating: 4.8
        }
      ]
    }
  };

  const genre = genreData[name] || {
    name: name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    description: `The best ${name.replace('-', ' ')} podcasts from around the world`,
    podcasts: [
      {
        title: `The ${name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Show`,
        host: "Alex Johnson",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: `Weekly deep dives into ${name.replace('-', ' ')} topics with industry experts`,
        episodes: Math.floor(Math.random() * 200) + 50,
        rating: (Math.random() * 0.5 + 4.5).toFixed(1)
      },
      {
        title: `${name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Today`,
        host: "Maria Garcia",
        image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: `Daily updates and analysis on ${name.replace('-', ' ')} news and trends`,
        episodes: Math.floor(Math.random() * 300) + 100,
        rating: (Math.random() * 0.5 + 4.5).toFixed(1)
      },
      {
        title: `Deep ${name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}`,
        host: "Dr. James Wilson",
        image: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: `Academic perspectives on ${name.replace('-', ' ')} from leading researchers`,
        episodes: Math.floor(Math.random() * 150) + 30,
        rating: (Math.random() * 0.5 + 4.5).toFixed(1)
      },
      {
        title: `${name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Unfiltered`,
        host: "Taylor Smith",
        image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: `Raw, unfiltered conversations about ${name.replace('-', ' ')} without the fluff`,
        episodes: Math.floor(Math.random() * 250) + 75,
        rating: (Math.random() * 0.5 + 4.5).toFixed(1)
      },
      {
        title: `The ${name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Hour`,
        host: "Chris Thompson",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        description: `Hour-long specials exploring ${name.replace('-', ' ')} in depth`,
        episodes: Math.floor(Math.random() * 180) + 40,
        rating: (Math.random() * 0.5 + 4.5).toFixed(1)
      }
    ]
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: 700, mb: 2 }}>
        {genre.name} Podcasts
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        {genre.description}
      </Typography>
      
      <Grid container spacing={4}>
        {genre.podcasts.map((podcast, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={podcast.image}
                alt={podcast.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {podcast.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Hosted by {podcast.host}
                </Typography>
                <Typography variant="body2">
                  {podcast.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Button size="small" startIcon={<PlayArrow />}>
                  Listen
                </Button>
                <Button size="small" startIcon={<FavoriteBorder />}>
                  Save
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default GenrePage;