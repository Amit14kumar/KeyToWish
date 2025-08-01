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

// Example birthday templates
const birthdayTemplates = [
  { 
    id: 'b1', 
    name: "Birthday Balloons", 
    description: "Colorful balloons for a joyful birthday celebration",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=400&h=250",
    price: "$4.99"
  },
  { 
    id: 'b2', 
    name: "Birthday Cake", 
    description: "Beautiful cake design for the special day",
    image: "https://images.unsplash.com/photo-1578922746376-051049a0bdf2?auto=format&fit=crop&q=80&w=400&h=250",
    price: "$4.99"
  },
  { 
    id: 'b3', 
    name: "Birthday Party", 
    description: "Festive party theme for birthdays",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&q=80&w=400&h=250",
    price: "$4.99"
  },
  { 
    id: 'b4', 
    name: "Birthday Gifts", 
    description: "Presents and gifts themed card",
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=400&h=250",
    price: "$4.99"
  },
  { 
    id: 'b5', 
    name: "Confetti Birthday", 
    description: "Colorful confetti celebration design",
    image: "https://images.unsplash.com/photo-1527359443443-84a48aec73d2?auto=format&fit=crop&q=80&w=400&h=250",
    price: "$4.99"
  },
  { 
    id: 'b6', 
    name: "Birthday Candles", 
    description: "Glowing candles for birthday wishes",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&q=80&w=400&h=250",
    price: "$4.99"
  },
];

const BirthdayCategoryPage = () => {
  const theme = useTheme();
  const { addItem } = useCart();

  const handleAddToCart = (template: any) => {
    addItem({
      id: template.id,
      name: template.name,
      price: parseFloat(template.price.replace('$', '')),
      image: template.image,
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
            Choose a template to customize for your special someone
          </Typography>

          <Grid container spacing={3}>
            {birthdayTemplates.map((template) => (
              <Grid item xs={12} sm={6} md={4} key={template.id}>
                <Card 
                  elevation={0}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    border: '1px solid',
                    borderColor: 'divider',
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
                      image={template.image}
                      alt={template.name}
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
                      {template.price}
                    </Box>
                  </Box>
                  
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                      {template.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {template.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
                      <Button 
                        variant="outlined" 
                        color="primary"
                        component={Link}
                        href={`/order?template=${template.id}`}
                        sx={{ flex: 1 }}
                      >
                        Customize
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddToCart(template)}
                        sx={{ flex: 1 }}
                      >
                        Add to Cart
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
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
