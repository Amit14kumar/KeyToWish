import React from 'react';
import { 
  Container, 
  Typography, 
  Grid, 
  Box, 
  Card, 
  CardContent, 
  CardMedia, 
  Button,
  Paper,
  useTheme,
  alpha,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import Layout from '@/components/layout/Layout';
import CakeIcon from '@mui/icons-material/Cake';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';

// New birthday card template
const birthdayCard = {
  id: 'birthday-card-1',
  name: "Birthday Card 1.0",
  description: "Animated confetti birthday card with personalized message and interactive effects",
  image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=400&h=250",
  price: "$4.99",
  features: ["Animated confetti", "Personalized name", "Interactive clicks"]
};

const BirthdayCategoryPage = () => {
  const theme = useTheme();
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: birthdayCard.id,
      name: birthdayCard.name,
      price: parseFloat(birthdayCard.price.replace('$', '')),
      image: birthdayCard.image,
      category: 'Birthday',
    });
  };

  return (
    <Layout>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: alpha('#1976d2', 0.05),
          py: 6,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container>
          <Breadcrumbs 
            separator={<NavigateNextIcon fontSize="small" />} 
            aria-label="breadcrumb"
            sx={{ mb: 3 }}
          >
            <MuiLink component={Link} href="/" color="inherit" underline="hover">
              Home
            </MuiLink>
            <MuiLink component={Link} href="/category" color="inherit" underline="hover">
              Categories
            </MuiLink>
            <Typography color="text.primary">Birthday</Typography>
          </Breadcrumbs>
          
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  sx={{ 
                    mr: 2,
                    p: 1.5,
                    bgcolor: alpha('#1976d2', 0.1),
                    borderRadius: '50%',
                    color: '#1976d2'
                  }}
                >
                  <CakeIcon fontSize="large" />
                </Box>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '2.5rem' } 
                  }}
                >
                  Birthday Wishes
                </Typography>
              </Box>
              
              <Typography 
                variant="subtitle1" 
                sx={{ 
                  mb: 3,
                  fontSize: { xs: '1rem', md: '1.25rem' },
                  color: 'text.secondary'
                }}
              >
                Make someone's birthday unforgettable with personalized wishes
              </Typography>
              
              <Typography variant="body1" paragraph>
                Select from our collection of beautiful birthday card templates and create a customized message that will make their day extra special. Our birthday cards can be personalized with your own text, images, and wishes.
              </Typography>
              
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                sx={{ mt: 2 }}
              >
                Create Birthday Card
              </Button>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=500&h=400"
                alt="Birthday celebration"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 12px 24px rgba(0,0,0,0.15)'
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Templates Section */}
      <Box sx={{ py: 8 }}>
        <Container>
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 1,
              fontWeight: 700
            }}
          >
            Birthday Card Templates
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mb: 4,
              color: 'text.secondary'
            }}
          >
            Choose our premium animated birthday card template
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card 
                elevation={0}
                component={Link}
                href="/cards/birthday-card-1"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  border: '1px solid',
                  borderColor: 'divider',
                  textDecoration: 'none',
                  color: 'inherit',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                    '& .MuiCardMedia-root': {
                      transform: 'scale(1.05)'
                    }
                  }
                }}
              >
                <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height={200}
                    image={birthdayCard.image}
                    alt={birthdayCard.name}
                    sx={{ 
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 12, 
                      right: 12, 
                      bgcolor: 'primary.main',
                      color: 'white',
                      py: 0.5,
                      px: 1.5,
                      borderRadius: 1,
                      fontSize: '0.875rem',
                      fontWeight: 'medium'
                    }}
                  >
                    {birthdayCard.price}
                  </Box>
                  <Box 
                    sx={{ 
                      position: 'absolute', 
                      top: 12, 
                      left: 12, 
                      bgcolor: 'secondary.main',
                      color: 'white',
                      py: 0.5,
                      px: 1.5,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      fontWeight: 'medium'
                    }}
                  >
                    NEW
                  </Box>
                </Box>
                
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    {birthdayCard.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {birthdayCard.description}
                  </Typography>
                  
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                      Features:
                    </Typography>
                    {birthdayCard.features.map((feature, index) => (
                      <Typography key={index} variant="caption" display="block" color="text.secondary">
                        • {feature}
                      </Typography>
                    ))}
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                    <Button 
                      variant="outlined" 
                      color="primary"
                      component={Link}
                      href="/cards/birthday-card-1"
                      size="small"
                      sx={{ 
                        flex: 1,
                        fontSize: '0.75rem',
                        py: 0.75
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        handleAddToCart();
                      }}
                      sx={{ 
                        flex: 1,
                        fontSize: '0.75rem',
                        py: 0.75
                      }}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography variant="body1" paragraph>
              Looking for something different?
            </Typography>
            <Button 
              variant="contained" 
              color="secondary"
              component={Link}
              href="/category"
            >
              Browse All Categories
            </Button>
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default BirthdayCategoryPage;
