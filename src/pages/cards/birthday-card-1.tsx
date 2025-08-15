import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  Button,
  Paper,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import Layout from '@/components/layout/Layout';
import BirthdayCard1 from '@/components/cards/BirthdayCard1';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCart } from '@/contexts/CartContext';

const BirthdayCard1DetailPage = () => {
  const router = useRouter();
  const { addItem } = useCart();

  const cardData = {
    id: 'birthday-card-1',
    name: 'Birthday Card 1.0',
    description: 'Animated confetti birthday card with personalized message',
    price: 4.99,
    features: [
      'Animated confetti effect',
      'Personalized with your name',
      'Interactive click animation',
      'High-quality design',
      'Instant digital delivery'
    ]
  };

  const handleAddToCart = () => {
    addItem({
      id: cardData.id,
      name: cardData.name,
      price: cardData.price,
      image: '/api/placeholder/400/250', // We'll generate a preview
      category: 'Birthday',
    });
  };

  const handleCustomize = () => {
    router.push(`/order?template=${cardData.id}`);
  };

  return (
    <Layout>
      <Container sx={{ py: 4 }}>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          sx={{ mb: 4 }}
        >
          <MuiLink component={Link} href="/" color="inherit" underline="hover">
            Home
          </MuiLink>
          <MuiLink component={Link} href="/category" color="inherit" underline="hover">
            Categories
          </MuiLink>
          <MuiLink component={Link} href="/category/birthday/birthday" color="inherit" underline="hover">
            Birthday
          </MuiLink>
          <Typography color="text.primary">{cardData.name}</Typography>
        </Breadcrumbs>

        <Grid container spacing={6}>
          {/* Card Preview */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Card Preview
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Click on the card to see the confetti animation! 
                <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>
                  {' '}Use the maximize button for fullscreen view.
                </Box>
              </Typography>
              <BirthdayCard1 />
            </Paper>

            {/* Card Description */}
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                About This Card
              </Typography>
              <Typography variant="body1" paragraph>
                {cardData.description}
              </Typography>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                Features:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {cardData.features.map((feature, index) => (
                  <Typography component="li" variant="body1" key={index} sx={{ mb: 1 }}>
                    {feature}
                  </Typography>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Card Info & Actions */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, position: 'sticky', top: 20 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                {cardData.name}
              </Typography>
              
              <Typography variant="h5" color="primary" sx={{ fontWeight: 600, mb: 3 }}>
                ${cardData.price}
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleCustomize}
                  fullWidth
                >
                  Customize & Order
                </Button>
                
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  onClick={handleAddToCart}
                  fullWidth
                >
                  Add to Cart
                </Button>
              </Box>

              <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 1 }}>
                <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                  What you get:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Digital birthday card with animation<br />
                  • Personalized with recipient's name<br />
                  • High-resolution download<br />
                  • Instant delivery
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default BirthdayCard1DetailPage;
