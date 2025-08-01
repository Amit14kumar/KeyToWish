import React from 'react';
import Layout from '@/components/layout/Layout';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Divider,
  Chip,
  useTheme,
} from '@mui/material';
import Head from 'next/head';
import Link from 'next/link';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EventIcon from '@mui/icons-material/Event';

const OrderConfirmationPage = () => {
  const theme = useTheme();
  // Mock data for order confirmation
  const orderDetails = {
    orderNumber: 'KW12345',
    orderDate: new Date().toLocaleDateString(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  };

  return (
    <>
      <Head>
        <title>Order Confirmation | KeyToWish</title>
      </Head>
      <Layout>
        <Box 
          sx={{ 
            py: 8, 
            bgcolor: 'background.default',
            minHeight: '70vh',
          }}
        >
          <Container maxWidth="md">
            <Box 
              sx={{ 
                mb: 4, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Box 
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'success.main',
                  color: 'white',
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  mb: 2,
                }}
              >
                <CheckCircleIcon sx={{ fontSize: 50 }} />
              </Box>
              
              <Typography variant="h4" component="h1" gutterBottom textAlign="center" fontWeight="bold">
                Thank You for Your Order!
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" textAlign="center" gutterBottom>
                Your order has been placed successfully. We have sent a confirmation email to your registered email address.
              </Typography>
              
              <Chip 
                label={`Order #${orderDetails.orderNumber}`} 
                color="primary" 
                sx={{ mt: 1, fontWeight: 500, fontSize: '1rem', py: 2.5, px: 2 }}
              />
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    height: '100%',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <ReceiptIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                      Order Details
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Grid container spacing={2}>
                    <Grid item xs={5}>
                      <Typography variant="body2" color="text.secondary">
                        Order Number
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body1" fontWeight={500}>
                        {orderDetails.orderNumber}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={5}>
                      <Typography variant="body2" color="text.secondary">
                        Order Date
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body1">
                        {orderDetails.orderDate}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={5}>
                      <Typography variant="body2" color="text.secondary">
                        Payment Method
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body1">
                        Credit Card
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={5}>
                      <Typography variant="body2" color="text.secondary">
                        Email
                      </Typography>
                    </Grid>
                    <Grid item xs={7}>
                      <Typography variant="body1">
                        customer@example.com
                      </Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    height: '100%',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocalShippingIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" fontWeight="bold">
                      Shipping Information
                    </Typography>
                  </Box>
                  <Divider sx={{ mb: 2 }} />
                  
                  <Typography variant="body1" paragraph>
                    <strong>John Doe</strong><br />
                    123 Main Street<br />
                    Apartment 4B<br />
                    New York, NY 10001<br />
                    United States<br />
                    Phone: (555) 123-4567
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <EventIcon sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="body2">
                      Estimated Delivery: <strong>{orderDetails.estimatedDelivery}</strong>
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
              
              <Grid item xs={12}>
                <Box 
                  sx={{ 
                    display: 'flex', 
                    justifyContent: 'center',
                    gap: 2,
                    mt: 2,
                  }}
                >
                  <Button 
                    component={Link}
                    href="/"
                    variant="contained" 
                    color="primary"
                    size="large"
                  >
                    Continue Shopping
                  </Button>
                  
                  <Button 
                    component="a" 
                    href={`mailto:support@keytowish.com?subject=Question about order ${orderDetails.orderNumber}`}
                    variant="outlined"
                    size="large"
                  >
                    Contact Support
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    </>
  );
};

export default OrderConfirmationPage;
