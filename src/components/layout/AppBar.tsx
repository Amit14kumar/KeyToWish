import React, { useState, useEffect } from 'react';
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
  useTheme,
  Container,
  Popover,
  Grid,
  Paper,
  Divider,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SimpleLogo from '@/components/common/SimpleLogo';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CartDropdown from '@/components/cart/CartDropdown';
import { useAuth } from '@/contexts/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Import category icons
import CakeIcon from '@mui/icons-material/Cake';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';

// Define categories with updated paths to match the new file structure
const categories = [
  { name: 'Birthday', icon: <CakeIcon sx={{ color: '#1976d2' }} />, path: '/category/birthday/birthday', description: 'Birthday celebrations' },
  { name: 'Anniversary', icon: <FavoriteIcon sx={{ color: '#e53935' }} />, path: '/category/anniversary/anniversary', description: 'Love & anniversaries' },
  { name: 'New Baby', icon: <ChildCareIcon sx={{ color: '#42a5f5' }} />, path: '/category/new-baby/new-baby', description: 'Welcome new arrivals' },
  { name: 'Friendship', icon: <PeopleIcon sx={{ color: '#66bb6a' }} />, path: '/category/friendship/friendship', description: 'Celebrate friendships' },
  { name: 'Motivation', icon: <EmojiEmotionsIcon sx={{ color: '#ffb74d' }} />, path: '/category/motivation/motivation', description: 'Motivational messages' },
  { name: 'Graduation', icon: <SchoolIcon sx={{ color: '#7e57c2' }} />, path: '/category/graduation/graduation', description: 'Academic achievements' },
  { name: 'Job Success', icon: <WorkIcon sx={{ color: '#26a69a' }} />, path: '/category/job-success/job-success', description: 'Career milestones' },
];

const AppBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState<null | HTMLElement>(null);
  
  // Category dropdown state
  const [categoryAnchorEl, setCategoryAnchorEl] = useState<HTMLElement | null>(null);
  const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
  
  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Improved handle open method for more reliable behavior
  const handleCategoryOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setCategoryAnchorEl(event.currentTarget);
  };

  // Improved handle close with delay
  const handleCategoryClose = () => {
    const timeout = setTimeout(() => {
      setCategoryAnchorEl(null);
    }, 300);
    setCloseTimeout(timeout);
  };

  // Handle mouse enter for popup itself
  const handlePopoverEnter = () => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
  };

  // Handle direct category item click
  const handleCategoryClick = (path: string) => {
    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(null);
    }
    setCategoryAnchorEl(null);
    router.push(path);
  };

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (closeTimeout) {
        clearTimeout(closeTimeout);
      }
    };
  }, [closeTimeout]);

  const isActive = (path: string) => router.pathname === path;

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    logout();
  };

  return (
    <MuiAppBar 
      position="sticky" 
      color="primary" 
      elevation={scrolled ? 4 : 0}
      sx={{
        bgcolor: scrolled ? 'primary.main' : 'transparent',
        transition: 'all 0.3s ease',
        boxShadow: scrolled ? '0 4px 18px rgba(0,0,0,0.12)' : 'none',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
        zIndex: 1100,
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ py: 1 }}>
          <Box display="flex" alignItems="center">
            <SimpleLogo 
              width={45} 
              height={45} 
              inverted={scrolled}
            />
            <Typography 
              variant="h6" 
              sx={{ 
                ml: 0,
                fontWeight: 700,
                color: scrolled ? 'white' : 'primary.main',
                transition: 'all 0.3s ease',
                letterSpacing: '0.2px', // Tighter letter spacing to make text appear denser
                fontFamily: '"Varela Round", sans-serif',
                fontSize: '1.55rem',
                textShadow: scrolled ? 
                  '0 0 0.5px rgba(255,255,255,0.9), 0 1px 2px rgba(0,0,0,0.2)' : 
                  '0 0 0.5px rgba(25,118,210,0.9)', // Text stroke effect
                WebkitTextStroke: scrolled ? '0.2px white' : '0.2px #1976d2', // Subtle text stroke
                textRendering: 'geometricPrecision', // Sharper text rendering
                padding: '0 4px', // Add padding to give the text more presence
              }}
            >
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
                sx={{ color: scrolled ? 'white' : 'primary.main' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 3,
                  sx: { borderRadius: 2, mt: 1 }
                }}
              >
                <MenuItem onClick={handleMenuClose} component={Link} href="/" selected={isActive('/')}>
                  Home
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} href="/category" selected={router.pathname.startsWith('/category')}>
                  Categories
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} href="/order" selected={isActive('/order')}>
                  Order
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} href="/wishes/demo" selected={isActive('/wishes/demo')}>
                  Demo
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} href="/cart">
                  Cart
                </MenuItem>
                
                <Divider />
                
                {user ? (
                  [
                    <MenuItem key="account" onClick={handleMenuClose} component={Link} href="/account">
                      My Account
                    </MenuItem>,
                    <MenuItem key="logout" onClick={() => {
                      handleMenuClose();
                      logout();
                    }}>
                      Logout
                    </MenuItem>
                  ]
                ) : (
                  <MenuItem onClick={handleMenuClose} component={Link} href="/auth">
                    Login / Sign Up
                  </MenuItem>
                )}
              </Menu>
            </>
          ) : (
            <>
              <Box sx={{ 
                flexGrow: 1, 
                display: 'flex', 
                ml: 5,
                alignItems: 'center', // Better vertical alignment
                height: '100%',
              }}>
                <Button 
                  component={Link} 
                  href="/"
                  sx={{ 
                    mx: 1.5, // Increased horizontal spacing
                    px: 1, // Add horizontal padding
                    py: 1, // Add vertical padding
                    color: scrolled ? 'white' : 'primary.main',
                    borderBottom: isActive('/') ? '2px solid' : 'none',
                    borderRadius: 0,
                    fontSize: '1.05rem', // Larger font
                    fontWeight: 600, // Bolder text
                    letterSpacing: '0.3px', // Better letter spacing
                    textTransform: 'none', // Preserve case
                    '&:hover': {
                      backgroundColor: 'transparent',
                      borderBottom: '2px solid',
                      transform: 'none',
                    },
                    boxShadow: 'none',
                  }}
                >
                  Home
                </Button>
                
                <Box 
                  onMouseEnter={handleCategoryOpen}
                  onMouseLeave={handleCategoryClose}
                  sx={{ position: 'relative' }}
                >
                  <Button
                    component={Link} 
                    href="/category"
                    aria-controls="category-menu"
                    aria-haspopup="true"
                    sx={{ 
                      mx: 1.5, // Increased horizontal spacing
                      px: 1, // Add horizontal padding
                      py: 1, // Add vertical padding
                      color: scrolled ? 'white' : 'primary.main',
                      borderBottom: router.pathname.startsWith('/category') ? '2px solid' : 'none',
                      borderRadius: 0,
                      fontSize: '1.05rem', // Larger font
                      fontWeight: 600, // Bolder text
                      letterSpacing: '0.3px', // Better letter spacing
                      textTransform: 'none', // Preserve case
                      '&:hover': {
                        backgroundColor: 'transparent',
                        borderBottom: '2px solid',
                      },
                      boxShadow: 'none',
                    }}
                  >
                    Categories
                  </Button>
                  
                  <Popover
                    id="category-menu"
                    open={Boolean(categoryAnchorEl)}
                    anchorEl={categoryAnchorEl}
                    onClose={() => setCategoryAnchorEl(null)}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    disableRestoreFocus
                    sx={{ 
                      mt: 0.5,
                      pointerEvents: 'none',
                    }}
                    slotProps={{
                      paper: {
                        onMouseEnter: handlePopoverEnter,
                        onMouseLeave: handleCategoryClose,
                        sx: {
                          pointerEvents: 'auto',
                          width: 620,
                          p: 3,
                          borderRadius: 3,
                          boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
                          zIndex: 1200,
                          maxHeight: 'calc(100vh - 100px)',
                          overflowY: 'auto'
                        }
                      }
                    }}
                  >
                    <Typography variant="h6" sx={{ mb: 3, fontWeight: 700 }}>
                      Browse Categories
                    </Typography>
                    
                    <Grid container spacing={2}>
                      {categories.map((category) => (
                        <Grid item xs={6} sm={4} key={category.name}>
                          <Paper
                            component={Link}
                            href={category.path} // This path is now correctly pointing to the new file structure
                            elevation={0}
                            onClick={() => setCategoryAnchorEl(null)}
                            sx={{
                              p: 2,
                              height: '100%',
                              borderRadius: 2,
                              border: '1px solid',
                              borderColor: 'divider',
                              transition: 'all 0.2s ease',
                              display: 'flex',
                              flexDirection: 'column',
                              cursor: 'pointer',
                              textDecoration: 'none',
                              color: 'inherit',
                              '&:hover': {
                                boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
                                transform: 'translateY(-4px)',
                                borderColor: 'primary.main',
                              }
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                              <Box sx={{ mr: 1, fontSize: 24 }}>
                                {category.icon}
                              </Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {category.name}
                              </Typography>
                            </Box>
                            
                            <Typography variant="caption" color="text.secondary" sx={{ mb: 1.5, flexGrow: 1 }}>
                              {category.description}
                            </Typography>
                            
                            <Box
                              sx={{ 
                                display: 'flex',
                                alignItems: 'center',
                                color: 'primary.main',
                                fontWeight: 'medium',
                                fontSize: '0.875rem'
                              }}
                            >
                              View Details 
                              <ArrowForwardIcon fontSize="small" sx={{ ml: 0.5 }} />
                            </Box>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button 
                        component={Link}
                        href="/category"
                        variant="contained" 
                        color="primary"
                        onClick={() => setCategoryAnchorEl(null)}
                        sx={{ mt: 1 }}
                      >
                        View All Categories
                      </Button>
                    </Box>
                  </Popover>
                </Box>
                
                <Button 
                  component={Link} 
                  href="/order"
                  sx={{ 
                    mx: 1.5, // Increased horizontal spacing
                    px: 1, // Add horizontal padding
                    py: 1, // Add vertical padding
                    color: scrolled ? 'white' : 'primary.main',
                    borderBottom: isActive('/order') ? '2px solid' : 'none',
                    borderRadius: 0,
                    fontSize: '1.05rem', // Larger font
                    fontWeight: 600, // Bolder text
                    letterSpacing: '0.3px', // Better letter spacing
                    textTransform: 'none', // Preserve case
                    '&:hover': {
                      backgroundColor: 'transparent',
                      borderBottom: '2px solid',
                      transform: 'none',
                    },
                    boxShadow: 'none',
                  }}
                >
                  Order
                </Button>
                
                <Button 
                  component={Link} 
                  href="/wishes/demo"
                  sx={{ 
                    mx: 1.5, // Increased horizontal spacing
                    px: 1, // Add horizontal padding
                    py: 1, // Add vertical padding
                    color: scrolled ? 'white' : 'primary.main',
                    borderBottom: isActive('/wishes/demo') ? '2px solid' : 'none',
                    borderRadius: 0,
                    fontSize: '1.05rem', // Larger font
                    fontWeight: 600, // Bolder text
                    letterSpacing: '0.3px', // Better letter spacing
                    textTransform: 'none', // Preserve case
                    '&:hover': {
                      backgroundColor: 'transparent',
                      borderBottom: '2px solid',
                      transform: 'none',
                    },
                    boxShadow: 'none',
                  }}
                >
                  Demo
                </Button>
              </Box>
              
              {/* Cart Dropdown */}
              <CartDropdown scrolled={scrolled} />
              
              {/* Login Button or User Menu */}
              {user ? (
                <>
                  <IconButton
                    onClick={handleUserMenuOpen}
                    sx={{ 
                      ml: 2,
                      border: scrolled ? '2px solid white' : 'none',
                    }}
                  >
                    {user.avatar ? (
                      <Avatar 
                        src={user.avatar} 
                        alt={user.name} 
                        sx={{ width: 32, height: 32 }}
                      />
                    ) : (
                      <AccountCircleIcon 
                        sx={{ 
                          color: scrolled ? 'white' : 'primary.main',
                          fontSize: 32,
                        }} 
                      />
                    )}
                  </IconButton>
                  <Menu
                    anchorEl={userMenuAnchorEl}
                    open={Boolean(userMenuAnchorEl)}
                    onClose={handleUserMenuClose}
                    PaperProps={{
                      elevation: 3,
                      sx: { 
                        mt: 1.5,
                        minWidth: 180,
                        borderRadius: 2,
                      }
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <Box sx={{ px: 2, py: 1 }}>
                      <Typography variant="subtitle2" noWrap>
                        {user.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" noWrap sx={{ fontSize: '0.8rem' }}>
                        {user.email}
                      </Typography>
                    </Box>
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <MenuItem component={Link} href="/account">
                      My Account
                    </MenuItem>
                    <MenuItem component={Link} href="/account?tab=2">
                      Order History
                    </MenuItem>
                    <MenuItem component={Link} href="/account?tab=3">
                      Saved Cards
                    </MenuItem>
                    
                    <Divider />
                    
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <Button 
                  component={Link}
                  href="/auth"
                  variant={scrolled ? "outlined" : "contained"} 
                  sx={{
                    color: scrolled ? 'white' : 'white',
                    borderColor: scrolled ? 'white' : 'transparent',
                    ml: 2, // Add margin to separate from nav items
                    px: 2.5, // Wider button
                    py: 0.8, // Taller button
                    fontSize: '0.95rem', // Slightly larger font
                    fontWeight: 600, // Bolder text
                    textTransform: 'none', // Preserve case
                  }}
                >
                  Login
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </Container>
    </MuiAppBar>
  );
};

export default AppBar;
