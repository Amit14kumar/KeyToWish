import React from 'react';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import { 
  Box, 
  Button, 
  Container, 
  Grid, 
  Typography,
  Card, 
  CardContent, 
  Paper,
  Fade,
  useMediaQuery,
  useTheme
} from '@mui/material';
import styles from '@/styles/Home.module.scss';
import Link from 'next/link';
import CakeIcon from '@mui/icons-material/Cake';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import DesignServicesIcon from '@mui/icons-material/DesignServices';
import SpeedIcon from '@mui/icons-material/Speed';
import ShareIcon from '@mui/icons-material/Share';

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const features = [
    { 
      title: 'Custom Templates', 
      description: 'Choose from a variety of beautiful templates for any occasion', 
      icon: <DesignServicesIcon fontSize="large" />
    },
    { 
      title: 'Instant Delivery', 
      description: 'Share your wishes instantly with anyone, anywhere via easy link', 
      icon: <SpeedIcon fontSize="large" />
    },
    { 
      title: 'Easy to Share', 
      description: 'Simple sharing via social media, messaging apps or email', 
      icon: <ShareIcon fontSize="large" />
    },
  ];

  const highlights = [
    { title: 'Birthday Wishes', icon: <CakeIcon fontSize="large" />, color: '#FFAB91' },
    { title: 'Anniversary Wishes', icon: <FavoriteIcon fontSize="large" />, color: '#F48FB1' },
    { title: 'New Baby Congratulations', icon: <ChildCareIcon fontSize="large" />, color: '#81D4FA' },
    { title: 'Friendship Greetings', icon: <PeopleIcon fontSize="large" />, color: '#A5D6A7' },
    { title: 'Motivational Notes', icon: <EmojiEmotionsIcon fontSize="large" />, color: '#FFE082' },
  ];

  return (
    <>
      <Head>
        <title>KeyToWish | Personalized Wish Cards</title>
        <meta name="description" content="Create personalized unlockable wish cards for every special occasion" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        {/* Hero Section */}
        <section className={styles.hero}>
          <Container>
            <div className={styles.heroContent}>
              <Typography variant="h1" component="h1">
                Personalized Wish Cards
              </Typography>
              <Typography variant="body1" paragraph>
                Create unique unlockable wish cards for every special occasion. Send personalized messages that can only be revealed by the recipient.
              </Typography>
              <Button variant="contained" color="secondary" size="large" href="/order">
                Create Your Card
              </Button>
            </div>
          </Container>
        </section>

        {/* Feature Cards */}
        <Container className={styles.featureSection}>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Fade in={true} timeout={1000 + (index * 500)}>
                  <Card className={styles.featureCard} elevation={3}>
                    <CardContent sx={{ p: 4 }}>
                      <Box className={styles.iconWrapper}>
                        {feature.icon}
                      </Box>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {feature.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        {feature.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Highlights Section */}
        <Box className={styles.waveSection} sx={{ bgcolor: 'grey.100', py: 8, mt: 10 }}>
          <Container>
            <Typography 
              variant="h3" 
              component="h2" 
              align="center" 
              gutterBottom
              className={styles.sectionHeading}
              sx={{ typography: { xs: 'h4', md: 'h3' } }}
            >
              Popular Categories
            </Typography>
            
            <Grid container spacing={3} justifyContent="center">
              {highlights.map((highlight, index) => (
                <Grid item xs={6} sm={4} md={2.4} key={index}>
                  <Fade in={true} timeout={1000 + (index * 300)}>
                    <Paper 
                      elevation={2} 
                      className={styles.highlightCard}
                      sx={{ 
                        '&:hover': { 
                          bgcolor: highlight.color + '20' 
                        } 
                      }}
                    >
                      <Box sx={{ color: highlight.color, mb: 1 }}>
                        {highlight.icon}
                      </Box>
                      <Typography variant="body1" component="h3" sx={{ fontWeight: 500 }}>
                        {highlight.title}
                      </Typography>
                    </Paper>
                  </Fade>
                </Grid>
              ))}
            </Grid>
            
            <Box textAlign="center" mt={6}>
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                component={Link}
                href="/order"
              >
                Get Started Now
              </Button>
            </Box>
          </Container>
        </Box>
      </Layout>
    </>
  );
}
