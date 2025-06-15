import React from 'react';
import { Container, Typography, Button, Grid, Box, Card, CardContent, CardMedia } from '@mui/material';
import styles from '@/styles/Home.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import CakeIcon from '@mui/icons-material/Cake';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const Home = () => {
  const features = [
    { title: 'Custom Templates', description: 'Choose from a variety of beautiful templates' },
    { title: 'Instant Delivery', description: 'Share your wishes instantly via link' },
    { title: 'Easy to Share', description: 'Simple sharing via social media or messaging' },
  ];

  const highlights = [
    { title: 'Birthday Wishes', icon: <CakeIcon fontSize="large" /> },
    { title: 'Anniversary Wishes', icon: <FavoriteIcon fontSize="large" /> },
    { title: 'New Baby Congratulations', icon: <ChildCareIcon fontSize="large" /> },
    { title: 'Friendship Greetings', icon: <PeopleIcon fontSize="large" /> },
    { title: 'Motivational Notes', icon: <EmojiEmotionsIcon fontSize="large" /> },
  ];

  return (
    <>
      {/* Hero Section */}
      <Box className={styles.hero}>
        <Container>
          <Box className={styles.heroContent}>
            <Typography 
              variant="h3" 
              component="h1" 
              gutterBottom
              sx={{ typography: { xs: 'h4', md: 'h3' } }}
            >
              Your Key to Unlocking Personalized Wishes
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              color="primary"
              component={Link} 
              href="/order"
            >
              Get Started
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Feature Cards */}
      <Container sx={{ my: 6 }}>
        <Typography 
          variant="h4" 
          component="h2" 
          align="center" 
          gutterBottom
          sx={{ typography: { xs: 'h5', md: 'h4' }, mb: 4 }}
        >
          Our Features
        </Typography>
        
        <Grid container spacing={3}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Card className={styles.featureCard} elevation={2}>
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Highlights Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 6 }}>
        <Container>
          <Typography 
            variant="h4" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{ typography: { xs: 'h5', md: 'h4' }, mb: 4 }}
          >
            Popular Categories
          </Typography>
          
          <Grid container spacing={2} justifyContent="center">
            {highlights.map((highlight, index) => (
              <Grid item xs={6} sm={4} md={2.4} key={index}>
                <Card className={styles.highlightCard}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    {highlight.icon}
                    <Typography variant="body1" component="h3" sx={{ mt: 1 }}>
                      {highlight.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Home;
