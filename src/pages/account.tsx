import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link'; // Add this import
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Tabs,
  Tab,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  ListItemAvatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import HistoryIcon from '@mui/icons-material/History';
import LogoutIcon from '@mui/icons-material/Logout';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import EditIcon from '@mui/icons-material/Edit';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import Image from 'next/image';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`account-tabpanel-${index}`}
      aria-labelledby={`account-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const Account = () => {
  const theme = useTheme();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [logoutConfirmOpen, setLogoutConfirmOpen] = useState(false);
  
  // Mock order history
  const orders = [
    {
      id: 'KW1234',
      date: '2023-05-15',
      items: [
        { name: 'Birthday Wishes Card', image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=400&h=250' }
      ],
      status: 'Completed',
      total: 9.99
    },
    {
      id: 'KW1235',
      date: '2023-06-22',
      items: [
        { name: 'Anniversary Card', image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=400&h=250' }
      ],
      status: 'Completed',
      total: 8.99
    }
  ];
  
  // Mock saved cards
  const savedCards = [
    {
      id: '1',
      name: 'Mom\'s Birthday',
      image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=400&h=250',
      date: '2023-07-10'
    },
    {
      id: '2',
      name: 'Wedding Anniversary',
      image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=400&h=250',
      date: '2023-08-15'
    }
  ];

  // Profile form state
  const [profileValues, setProfileValues] = useState({
    name: user?.name || '',
    email: user?.email || '',
  });

  // Password form state
  const [passwordValues, setPasswordValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      router.push('/auth?redirect=/account');
    }
  }, [user, router]);

  if (!user) {
    return null; // Will redirect via the useEffect
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileValues({
      ...profileValues,
      [name]: value,
    });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordValues({
      ...passwordValues,
      [name]: value,
    });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would call your API to update the user profile
    alert('Profile updated');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (passwordValues.newPassword !== passwordValues.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    // In a real app, you would call your API to update the password
    alert('Password updated');
    
    // Reset form
    setPasswordValues({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  const handleLogout = () => {
    setLogoutConfirmOpen(false);
    logout();
  };

  return (
    <>
      <Head>
        <title>My Account | KeyToWish</title>
      </Head>
      <Layout>
        <Box 
          sx={{ 
            pt: 4,
            pb: 8,
            bgcolor: 'grey.50'
          }}
        >
          <Container>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
                My Account
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage your profile, view order history, and access saved wish cards.
              </Typography>
            </Box>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={4} lg={3}>
                <Paper 
                  elevation={0}
                  sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    mb: { xs: 3, md: 0 },
                    position: { md: 'sticky' },
                    top: { md: '100px' },
                  }}
                >
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                      <Avatar
                        src={user.avatar}
                        sx={{ 
                          width: 100, 
                          height: 100,
                          margin: '0 auto',
                          border: '4px solid white',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        }}
                      />
                      <IconButton
                        size="small"
                        sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          bgcolor: 'background.paper',
                          border: '1px solid',
                          borderColor: 'divider',
                          '&:hover': {
                            bgcolor: 'grey.100',
                          },
                        }}
                      >
                        <AddAPhotoIcon fontSize="small" />
                      </IconButton>
                    </Box>
                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                      {user.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {user.email}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <List component="nav" disablePadding>
                    <ListItemButton
                      selected={activeTab === 0}
                      onClick={() => setActiveTab(0)}
                    >
                      <ListItemIcon>
                        <PersonIcon color={activeTab === 0 ? 'primary' : undefined} />
                      </ListItemIcon>
                      <ListItemText primary="Profile Information" />
                    </ListItemButton>
                    
                    <ListItemButton
                      selected={activeTab === 1}
                      onClick={() => setActiveTab(1)}
                    >
                      <ListItemIcon>
                        <SecurityIcon color={activeTab === 1 ? 'primary' : undefined} />
                      </ListItemIcon>
                      <ListItemText primary="Security" />
                    </ListItemButton>
                    
                    <ListItemButton
                      selected={activeTab === 2}
                      onClick={() => setActiveTab(2)}
                    >
                      <ListItemIcon>
                        <HistoryIcon color={activeTab === 2 ? 'primary' : undefined} />
                      </ListItemIcon>
                      <ListItemText primary="Order History" />
                    </ListItemButton>
                    
                    <ListItemButton
                      selected={activeTab === 3}
                      onClick={() => setActiveTab(3)}
                    >
                      <ListItemIcon>
                        <CardGiftcardIcon color={activeTab === 3 ? 'primary' : undefined} />
                      </ListItemIcon>
                      <ListItemText primary="Saved Cards" />
                    </ListItemButton>
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <ListItemButton
                      onClick={() => setLogoutConfirmOpen(true)}
                      sx={{
                        color: 'error.main',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.error.main, 0.08),
                        }
                      }}
                    >
                      <ListItemIcon>
                        <LogoutIcon color="error" />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </ListItemButton>
                  </List>
                </Paper>
              </Grid>
              
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, md: 3 },
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
                    <Tabs 
                      value={activeTab} 
                      onChange={handleTabChange}
                      aria-label="account tabs"
                      variant="scrollable"
                      scrollButtons="auto"
                    >
                      <Tab label="Profile Information" />
                      <Tab label="Security" />
                      <Tab label="Order History" />
                      <Tab label="Saved Cards" />
                    </Tabs>
                  </Box>
                  
                  <TabPanel value={activeTab} index={0}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Profile Information
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Update your personal details below.
                    </Typography>
                    
                    <Box component="form" onSubmit={handleProfileSubmit} mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={profileValues.name}
                            onChange={handleProfileChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Email Address"
                            name="email"
                            type="email"
                            value={profileValues.email}
                            onChange={handleProfileChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                          >
                            Save Changes
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </TabPanel>
                  
                  <TabPanel value={activeTab} index={1}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Security
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Update your password below.
                    </Typography>
                    
                    <Box component="form" onSubmit={handlePasswordSubmit} mt={3}>
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Current Password"
                            name="currentPassword"
                            type="password"
                            value={passwordValues.currentPassword}
                            onChange={handlePasswordChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="New Password"
                            name="newPassword"
                            type="password"
                            value={passwordValues.newPassword}
                            onChange={handlePasswordChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Confirm New Password"
                            name="confirmPassword"
                            type="password"
                            value={passwordValues.confirmPassword}
                            onChange={handlePasswordChange}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            type="submit"
                            variant="contained"
                          >
                            Update Password
                          </Button>
                        </Grid>
                      </Grid>
                    </Box>
                  </TabPanel>
                  
                  <TabPanel value={activeTab} index={2}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Order History
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      View your recent orders.
                    </Typography>
                    
                    {orders.length === 0 ? (
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          You haven't placed any orders yet.
                        </Typography>
                        <Button
                          component={Link}
                          href="/category"
                          variant="contained"
                          sx={{ mt: 2 }}
                        >
                          Browse Categories
                        </Button>
                      </Box>
                    ) : (
                      <List>
                        {orders.map((order) => (
                          <Paper
                            key={order.id}
                            elevation={0}
                            sx={{
                              mb: 2,
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: 2,
                              overflow: 'hidden',
                            }}
                          >
                            <Box
                              sx={{
                                p: 2,
                                bgcolor: 'primary.light',
                                color: 'primary.contrastText',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <Typography variant="subtitle1" fontWeight="bold">
                                Order #{order.id}
                              </Typography>
                              <Typography variant="body2">
                                {order.date}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ p: 2 }}>
                              {order.items.map((item, index) => (
                                <Box
                                  key={index}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 2,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      position: 'relative',
                                      width: 60,
                                      height: 60,
                                      flexShrink: 0,
                                      borderRadius: 1,
                                      overflow: 'hidden',
                                      mr: 2,
                                    }}
                                  >
                                    <Image
                                      src={item.image}
                                      alt={item.name}
                                      fill
                                      style={{ objectFit: 'cover' }}
                                    />
                                  </Box>
                                  <Box>
                                    <Typography variant="body1" fontWeight="medium">
                                      {item.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                      Status: {order.status}
                                    </Typography>
                                  </Box>
                                </Box>
                              ))}
                              
                              <Divider sx={{ my: 2 }} />
                              
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                }}
                              >
                                <Typography variant="subtitle1" fontWeight="bold">
                                  Total: ${order.total.toFixed(2)}
                                </Typography>
                                <Button
                                  variant="outlined"
                                  size="small"
                                  component={Link}
                                  href={`/order/${order.id}`}
                                >
                                  View Details
                                </Button>
                              </Box>
                            </Box>
                          </Paper>
                        ))}
                      </List>
                    )}
                  </TabPanel>
                  
                  <TabPanel value={activeTab} index={3}>
                    <Typography variant="h6" gutterBottom fontWeight="bold">
                      Saved Cards
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      View and manage your saved wish cards.
                    </Typography>
                    
                    {savedCards.length === 0 ? (
                      <Box sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body1" color="text.secondary">
                          You haven't saved any cards yet.
                        </Typography>
                        <Button
                          component={Link}
                          href="/category"
                          variant="contained"
                          sx={{ mt: 2 }}
                        >
                          Browse Categories
                        </Button>
                      </Box>
                    ) : (
                      <Grid container spacing={3}>
                        {savedCards.map((card) => (
                          <Grid item xs={12} sm={6} md={4} key={card.id}>
                            <Paper
                              elevation={0}
                              sx={{
                                borderRadius: 2,
                                overflow: 'hidden',
                                border: '1px solid',
                                borderColor: 'divider',
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'translateY(-4px)',
                                  boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
                                }
                              }}
                            >
                              <Box sx={{ position: 'relative', height: 160 }}>
                                <Image
                                  src={card.image}
                                  alt={card.name}
                                  fill
                                  style={{ objectFit: 'cover' }}
                                />
                                <IconButton
                                  sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                    bgcolor: 'white',
                                    '&:hover': {
                                      bgcolor: 'white',
                                      color: 'error.main',
                                    }
                                  }}
                                >
                                  <FavoriteIcon color="error" />
                                </IconButton>
                              </Box>
                              <Box sx={{ p: 2, flexGrow: 1 }}>
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                  {card.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  Created on: {card.date}
                                </Typography>
                              </Box>
                              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}>
                                <Button
                                  startIcon={<EditIcon />}
                                  size="small"
                                  component={Link}
                                  href={`/edit/${card.id}`}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="contained"
                                  size="small"
                                  component={Link}
                                  href={`/card/${card.id}`}
                                >
                                  View Card
                                </Button>
                              </Box>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    )}
                  </TabPanel>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
        
        {/* Logout confirmation dialog */}
        <Dialog
          open={logoutConfirmOpen}
          onClose={() => setLogoutConfirmOpen(false)}
        >
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to log out of your account?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLogoutConfirmOpen(false)}>Cancel</Button>
            <Button onClick={handleLogout} color="error">
              Logout
            </Button>
          </DialogActions>
        </Dialog>
      </Layout>
    </>
  );
};

export default Account;
