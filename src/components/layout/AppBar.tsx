import React, { useState } from 'react';
import { 
  AppBar as MuiAppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Menu, 
  MenuItem, 
  useMediaQuery,
  useTheme 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Link from 'next/link';

const AppBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <MuiAppBar position="static" color="primary">
      <Toolbar>
        <Box display="flex" alignItems="center">
          <VpnKeyIcon />
          <CardGiftcardIcon />
          <Typography variant="h6" sx={{ ml: 1 }}>
            KeyToWish
          </Typography>
        </Box>
        
        {isMobile ? (
          <>
            <Box flexGrow={1} />
            <IconButton
              color="inherit"
              edge="end"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose} component={Link} href="/">Home</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} href="/order">Order</MenuItem>
              <MenuItem onClick={handleMenuClose} component={Link} href="/wishes/demo">Demo</MenuItem>
              <MenuItem onClick={handleMenuClose}>Login</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Box sx={{ flexGrow: 1, display: 'flex', ml: 3 }}>
              <Button color="inherit" component={Link} href="/">
                Home
              </Button>
              <Button color="inherit" component={Link} href="/order">
                Order
              </Button>
              <Button color="inherit" component={Link} href="/wishes/demo">
                Demo
              </Button>
            </Box>
            <Button color="inherit" variant="outlined">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;
