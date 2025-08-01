import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Button,
  Popover,
  Badge,
  Chip,
  Paper,
  Stack,
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '@/contexts/CartContext';
import Link from 'next/link';
import Image from 'next/image';

interface CartDropdownProps {
  children?: React.ReactNode;
  scrolled?: boolean;
}

const CartDropdown = ({ scrolled = false }: CartDropdownProps) => {
  const { state, removeItem, updateQuantity } = useCart();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleCartClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  return (
    <>
      <IconButton
        aria-label="cart"
        color="inherit"
        onClick={handleCartClick}
        sx={{ 
          color: scrolled ? 'white' : 'primary.main',
          position: 'relative',
        }}
      >
        <Badge 
          badgeContent={state.itemCount} 
          color="secondary"
          sx={{
            '& .MuiBadge-badge': {
              fontWeight: 'bold',
              minWidth: '18px',
              height: '18px',
            }
          }}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        slotProps={{
          paper: {
            elevation: 4,
            sx: {
              mt: 1.5,
              width: { xs: '90vw', sm: 350 },
              maxWidth: 400,
              overflow: 'hidden',
              borderRadius: 2,
            }
          }
        }}
      >
        <Box sx={{ 
          p: 2, 
          bgcolor: 'primary.main', 
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ShoppingCartIcon fontSize="small" />
            <Typography variant="subtitle1" fontWeight={600}>
              Your Cart
            </Typography>
          </Box>
          <Chip 
            label={state.itemCount} 
            color="secondary" 
            size="small" 
            sx={{ 
              fontWeight: 'bold',
              height: 24,
              minWidth: 24,
            }} 
          />
        </Box>

        {state.items.length === 0 ? (
          <Box sx={{ py: 4, px: 2, textAlign: 'center' }}>
            <ShoppingCartIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 1, opacity: 0.3 }} />
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Your cart is empty
            </Typography>
            <Button 
              component={Link}
              href="/category"
              variant="outlined"
              size="small"
              onClick={handleClose}
            >
              Browse Categories
            </Button>
          </Box>
        ) : (
          <>
            <List 
              sx={{ 
                maxHeight: { xs: '50vh', sm: 320 }, 
                overflowY: 'auto',
                py: 0
              }}
            >
              {state.items.map((item) => (
                <Paper 
                  key={item.id}
                  elevation={0}
                  sx={{ 
                    mb: 0.5, 
                    '&:hover': { 
                      bgcolor: 'action.hover' 
                    } 
                  }}
                >
                  <ListItem
                    sx={{ px: 2, py: 1.5 }}
                  >
                    <Box sx={{ position: 'relative', width: 50, height: 50, flexShrink: 0, mr: 2 }}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        style={{ objectFit: 'cover', borderRadius: 4 }}
                      />
                    </Box>
                    
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              fontWeight: 500,
                              maxWidth: 150,
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis'
                            }}
                          >
                            {item.name}
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'primary.main' }}>
                            {formatPrice(item.price * item.quantity)}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Box 
                          sx={{ 
                            display: 'flex', 
                            justifyContent: 'space-between',
                            alignItems: 'center', 
                            mt: 0.5
                          }}
                        >
                          <Box 
                            sx={{ 
                              display: 'inline-flex', 
                              alignItems: 'center',
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: 1,
                              overflow: 'hidden'
                            }}
                          >
                            <IconButton 
                              size="small" 
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity === 1}
                              sx={{ 
                                borderRadius: 0,
                                p: 0.5
                              }}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography 
                              sx={{ 
                                px: 1.5,
                                userSelect: 'none',
                                fontSize: '0.875rem'
                              }}
                            >
                              {item.quantity}
                            </Typography>
                            <IconButton 
                              size="small" 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              sx={{ 
                                borderRadius: 0,
                                p: 0.5
                              }}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </Box>
                          
                          <IconButton 
                            size="small" 
                            onClick={() => removeItem(item.id)}
                            sx={{ color: 'error.main' }}
                          >
                            <DeleteOutlineIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      }
                      secondaryTypographyProps={{ component: 'div' }}
                    />
                  </ListItem>
                </Paper>
              ))}
            </List>

            <Divider />

            <Box sx={{ p: 2 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                mb: 1 
              }}>
                <Typography variant="body2" color="text.secondary">
                  Subtotal ({state.itemCount} items)
                </Typography>
                <Typography variant="body1" fontWeight="600">
                  {formatPrice(state.total)}
                </Typography>
              </Box>

              <Stack spacing={1} sx={{ mt: 2 }}>
                <Button
                  component={Link}
                  href="/checkout"
                  fullWidth
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={handleClose}
                >
                  Checkout
                </Button>
                <Button
                  component={Link}
                  href="/cart"
                  fullWidth
                  variant="outlined"
                  size="medium"
                  onClick={handleClose}
                >
                  View Cart
                </Button>
              </Stack>
            </Box>
          </>
        )}
      </Popover>
    </>
  );
};

export default CartDropdown;
