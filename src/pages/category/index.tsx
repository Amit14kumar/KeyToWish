import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  Card, 
  Button,
  useTheme,
  alpha,
} from '@mui/material';
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

// Import category icons
import CakeIcon from '@mui/icons-material/Cake';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

// Define category data
const categories = [
  { 
    name: 'Birthday', 
    icon: <CakeIcon sx={{ fontSize: 40 }} />, 
    path: '/category/birthday/birthday',
    color: '#1976d2',
    description: 'Make someone\'s birthday extra special with personalized wishes.',
    image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?auto=format&fit=crop&q=80&w=400&h=250'
  },
  { 
    name: 'Anniversary', 
    icon: <FavoriteIcon sx={{ fontSize: 40 }} />, 
    path: '/category/anniversary/anniversary',
    color: '#e53935',
    description: 'Celebrate love & commitment with heartfelt anniversary messages.',
    image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=400&h=250'
  },
  { 
    name: 'New Baby', 
    icon: <ChildCareIcon sx={{ fontSize: 40 }} />, 
    path: '/category/new-baby/new-baby',
    color: '#42a5f5',
    description: 'Welcome the newest family member with joy and love.',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=400&h=250'
  },
  { 
    name: 'Friendship', 
    icon: <PeopleIcon sx={{ fontSize: 40 }} />, 
    path: '/category/friendship/friendship',
    color: '#66bb6a',
    description: 'Show appreciation for the friends in your life.',
    image: 'https://images.unsplash.com/photo-1532498551838-b7a1cffa5daa?auto=format&fit=crop&q=80&w=400&h=250'
  },
  { 
    name: 'Motivation', 
    icon: <EmojiEmotionsIcon sx={{ fontSize: 40 }} />, 
    path: '/category/motivation/motivation',
    color: '#ffb74d',
    description: 'Encourage and inspire with positive messages.',
    image: 'https://images.unsplash.com/photo-1522120657009-060ca01afcd6?auto=format&fit=crop&q=80&w=400&h=250'
  },
  { 
    name: 'Graduation', 
    icon: <SchoolIcon sx={{ fontSize: 40 }} />, 
    path: '/category/graduation/graduation',
    color: '#7e57c2',
    description: 'Celebrate academic achievements and new beginnings.',
    image: 'https://images.unsplash.com/photo-1532649538693-f3a2ec1bf8bd?auto=format&fit=crop&q=80&w=400&h=250'
  },
  { 
    name: 'Job Success', 
    icon: <WorkIcon sx={{ fontSize: 40 }} />, 
    path: '/category/job-success/job-success',
    color: '#26a69a',
    description: 'Congratulate career milestones and achievements.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=400&h=250'
  },
];

const CategoryIndexPage = () => {
  const theme = useTheme();

  return (
    <Layout>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: alpha(theme.palette.primary.main, 0.05),
          py: 8,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container>
          <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'center', mb: 6 }}>
            <Typography 
              variant="h2" 
              component="h1" 
              sx={{ 
                fontWeight: 800, 
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}
            >
              Browse Categories
            </Typography>
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 400, 
                mb: 3,
                color: 'text.secondary',
                fontSize: { xs: '1.2rem', md: '1.5rem' }
              }}
            >
              Find the perfect card for every occasion
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
              Explore our selection of personalized digital cards for birthdays, anniversaries, and more. Each card can be customized with your own message and unlocked by the recipient with a special key.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Categories Grid */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category.name}>
              <Card 
                elevation={0}
                component={Link}
                href={category.path}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  borderRadius: 4,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  border: '1px solid',
                  borderColor: 'divider',
                  textDecoration: 'none',
                  color: 'inherit',
                  position: 'relative',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  }
                }}
              >
                <Box 
                  sx={{ 
                    height: 200, 
                    backgroundImage: `url(${category.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative'
                  }}
                >
                  <Box 
                    sx={{ 
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: `linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7) 100%)`,
                      zIndex: 1
                    }}
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 16, 
                      left: 16, 
                      bgcolor: 'white',
                      borderRadius: '50%',
                      width: 60,
                      height: 60,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: category.color,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      zIndex: 2
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography 
                    variant="h5" 
                    component="h2" 
                    sx={{ 
                      position: 'absolute',
                      bottom: 16,
                      left: 16,
                      color: 'white',
                      fontWeight: 700,
                      zIndex: 2
                    }}
                  >
                    {category.name}
                  </Typography>
                </Box>
                <Box sx={{ p: 3, flexGrow: 1 }}>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                    {category.description}
                  </Typography>
                  <Button 
                    variant="text" 
                    color="primary" 
                    sx={{ 
                      mt: 'auto',
                      fontWeight: 600,
                      '&:hover': { backgroundColor: 'transparent' }
                    }}
                  >
                    Browse Designs
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default CategoryIndexPage;
