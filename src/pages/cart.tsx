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
  IconButton,
  Card,
  CardMedia,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Head from 'next/head';

const CartPage = () => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (id: string, newValue: string) => {
    const quantity = parseInt(newValue, 10);
    if (!isNaN(quantity) && quantity > 0) {
      updateQuantity(id, quantity);
    }
  };

  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <>
      <Head>
        <title>Your Cart | KeyToWish</title>
        <meta name="description" content="Review and checkout your personalized wish cards" />
      </Head>
      
      <Layout>
        <Box sx={{ py: 8, bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
              Your Cart
            </Typography>

            {state.items.length === 0 ? (
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  mb: 4,
                  textAlign: 'center',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="h5" sx={{ mb: 3 }}>
                  Your cart is empty
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                  Looks like you haven't added any cards to your cart yet.
                </Typography>
                <Button
                  variant="contained"
                  component={Link}
                  href="/category"
                  size="large"
                >
                  Browse Categories
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 2, md: 3 },
                      mb: 4,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 2,
                      }}
                    >
                      <Typography variant="h6" fontWeight={600}>
                        Items ({state.itemCount})
                      </Typography>
                      <Button
                        startIcon={<DeleteIcon />}
                        color="error"
                        onClick={clearCart}
                        size="small"
                      >
                        Clear Cart
                      </Button>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {state.items.map((item) => (
                      <Box
                        key={item.id}
                        sx={{
                          display: 'flex',
                          py: 2,
                          borderBottom: '1px solid',
                          borderColor: 'divider',
                        }}
                      >
                        <Box
                          sx={{
                            width: 100,
                            height: 100,
                            borderRadius: 1,
                            overflow: 'hidden',
                            position: 'relative',
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            style={{ objectFit: 'cover' }}
                          />
                        </Box>

                        <Box sx={{ ml: 2, flexGrow: 1 }}>
                          <Typography variant="h6" fontWeight={500}>
                            {item.name}
                          </Typography>
                          
                          {item.category && (
                            <Typography variant="body2" color="text.secondary">
                              Category: {item.category}
                            </Typography>
                          )}

                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              mt: 2,
                              justifyContent: 'space-between',
                            }}
                          >
                            <Typography variant="h6" color="primary" fontWeight={600}>
                              {formatPrice(item.price)}
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <TextField
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                type="number"
                                inputProps={{ min: 1, style: { textAlign: 'center' } }}
                                sx={{ width: 60, mx: 1 }}
                                size="small"
                              />
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                              
                              <IconButton
                                sx={{ ml: 2 }}
                                color="error"
                                onClick={() => removeItem(item.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      position: { md: 'sticky' },
                      top: { md: '100px' },
                    }}
                  >
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      Order Summary
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography>Subtotal:</Typography>
                      <Typography fontWeight={500}>{formatPrice(state.total)}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 1,
                      }}
                    >
                      <Typography>Shipping:</Typography>
                      <Typography fontWeight={500}>Free</Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        mb: 3,
                      }}
                    >
                      <Typography variant="h6">Total:</Typography>
                      <Typography variant="h6" fontWeight={600} color="primary">
                        {formatPrice(state.total)}
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      component={Link}
                      href="/checkout"
                    >
                      Proceed to Checkout
                    </Button>
                    
                    <Button
                      variant="text"
                      component={Link}
                      href="/category"
                      fullWidth
                      sx={{ mt: 2 }}
                    >
                      Continue Shopping
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            )}
          </Container>
        </Box>
      </Layout>
    </>
  );
};

export default CartPage;
