import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Snackbar, Alert } from '@mui/material';
import OrderForm from '@/components/order/OrderForm';
import Layout from '@/components/layout/Layout'; // Import Layout component
import Head from 'next/head'; // Import Head for SEO

export default function OrderPage() {
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderKey, setOrderKey] = useState('');

  const handleOrderSubmit = async (formData: any) => {
    try {
      // Simulate API call
      console.log('Order submitted:', formData);
      
      // Simulate successful response
      setTimeout(() => {
        setOrderKey('demo-' + Math.random().toString(36).substring(2, 8));
        setOrderSuccess(true);
      }, 1000);
      
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Create Wish Card | KeyToWish</title>
        <meta name="description" content="Create your personalized wish card for any occasion" />
      </Head>
      
      <Layout>
        <Box sx={{ bgcolor: 'background.default', py: 8, minHeight: '80vh' }}>
          <Container maxWidth="md">
            <Typography 
              variant="h3" 
              component="h1" 
              align="center" 
              gutterBottom
              sx={{ typography: { xs: 'h4', md: 'h3' }, mb: 4, fontWeight: 700 }}
            >
              Create Your Wish Card
            </Typography>
            
            <Paper 
              elevation={0} 
              sx={{ 
                p: { xs: 2, sm: 4 }, 
                borderRadius: 3, 
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.05)',
              }}
            >
              <OrderForm onSubmit={handleOrderSubmit} />
            </Paper>
            
            <Snackbar 
              open={orderSuccess} 
              autoHideDuration={10000} 
              onClose={() => setOrderSuccess(false)}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
              <Alert 
                severity="success" 
                onClose={() => setOrderSuccess(false)}
                sx={{ width: '100%' }}
              >
                Your wish card has been created! Share it with: 
                <Box component="span" sx={{ display: 'block', mt: 1, fontWeight: 'bold' }}>
                  https://keytowish.com/wishes/{orderKey}
                </Box>
              </Alert>
            </Snackbar>
          </Container>
        </Box>
      </Layout>
    </>
  );
}
