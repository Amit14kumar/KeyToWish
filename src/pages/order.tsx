import React, { useState } from 'react';
import { Container, Typography, Paper, Box, Grid, Snackbar, Alert } from '@mui/material';
import OrderForm from '@/components/order/OrderForm';

export default function OrderPage() {
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderKey, setOrderKey] = useState('');

  const handleOrderSubmit = async (formData: any) => {
    try {
      // Simulate API call
      const response = await fetch('/api/createOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      setOrderKey(data.key);
      setOrderSuccess(true);
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography 
        variant="h3" 
        component="h1" 
        align="center" 
        gutterBottom
        sx={{ typography: { xs: 'h4', md: 'h3' }, mb: 4 }}
      >
        Create Your Wish Card
      </Typography>
      
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 4 } }}>
        <OrderForm onSubmit={handleOrderSubmit} />
      </Paper>
      
      <Snackbar 
        open={orderSuccess} 
        autoHideDuration={10000} 
        onClose={() => setOrderSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setOrderSuccess(false)}>
          Your wish card has been created! Share it with: 
          <Box component="span" sx={{ display: 'block', mt: 1, fontWeight: 'bold' }}>
            https://yourdomain.com/wishes/{orderKey}
          </Box>
        </Alert>
      </Snackbar>
    </Container>
  );
}
