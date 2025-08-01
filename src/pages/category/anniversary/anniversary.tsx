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
  Breadcrumbs
} from '@mui/material';
import Layout from '@/components/layout/Layout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';
import MuiLink from '@mui/material/Link';

// Example anniversary templates
const anniversaryTemplates = [
  { 
    id: 'a1', 
    name: "Happy Anniversary", 
    description: "Classic anniversary design for your loved one",
    image: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=400&h=250",
    price: "$4.99"
  },
  { 
    id: 'a2', 
    name: "Hearts & Roses", 
    description: "Romantic design with hearts and roses",
    image: "https://images.unsplash.com/photo-1527162788840-22b038312791?auto=format&fit=crop&q=80&w=400&h=250",
    price: "$4.99"
  },
  { 
    id: 'a3', 
    name: "Golden Years", 
    description: "Elegant gold design for milestone anniversaries",
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&q=80&w=400&h=250",
    price: "$4.99"
  },
  { 
    id: 'a4', 
    name: "Forever Love", 
    description: "Timeless design celebrating eternal love",
    image: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&q=80&w=400&h=250",
    price: "$4.99"
  },
];

const AnniversaryCategoryPage = () => {
  const theme = useTheme();

  return (
    <Layout>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: alpha('#e53935', 0.05),
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
            <Typography color="text.primary">Anniversary</Typography>
          </Breadcrumbs>
          
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box 
                  sx={{ 
                    mr: 2,
                    p: 1.5,
                    bgcolor: alpha('#e53935', 0.1),
                    borderRadius: '50%',
                    color: '#e53935'
                  }}
                >
                  <FavoriteIcon fontSize="large" />
                </Box>
                <Typography 
                  variant="h3" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '2.5rem' } 
                  }}
                >
                  Anniversary Wishes
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
                Celebrate love and commitment with heartfelt anniversary messages
              </Typography>
              
              <Typography variant="body1" paragraph>
                Mark another year of love with a personalized anniversary card. Choose from our romantic designs to create a custom message that expresses your feelings for your special someone on your anniversary.
              </Typography>
              
              <Button 
                variant="contained" 
                color="error"
                size="large"
                sx={{ mt: 2 }}
              >
                Create Anniversary Card
              </Button>
            </Grid>
            
            <Grid item xs={12} md={5}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=500&h=400"
                alt="Anniversary celebration"
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
          {/* ...template listing section similar to birthday... */}
          <Typography 
            variant="h4" 
            component="h2" 
            sx={{ 
              mb: 1,
              fontWeight: 700
            }}
          >
            Anniversary Card Templates
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            sx={{ 
              mb: 4,
              color: 'text.secondary'
            }}
          >
            Choose a template to celebrate your special day
          </Typography>

          <Grid container spacing={3}>
            {anniversaryTemplates.map((template) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={template.id}>
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
                        bgcolor: 'error.main',
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
                    
                    <Button 
                      variant="outlined" 
                      color="error"
                      sx={{ mt: 'auto' }}
                      component={Link}
                      href={`/order?template=${template.id}`}
                    >
                      Use This Template
                    </Button>
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

export default AnniversaryCategoryPage;
