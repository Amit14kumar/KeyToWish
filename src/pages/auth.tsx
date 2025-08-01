import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
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
  Divider,
  InputAdornment,
  IconButton,
  Link as MuiLink,
  Alert,
  CircularProgress,
  Avatar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import Link from 'next/link';
import SimpleLogo from '@/components/common/SimpleLogo';

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
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
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

const AuthPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const router = useRouter();
  const { login, signup, loading, user } = useAuth();
  const [activeTab, setActiveTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [forgotPasswordMode, setForgotPasswordMode] = useState(false);
  
  // Form states
  const [loginValues, setLoginValues] = useState({
    email: '',
    password: '',
  });
  
  const [signupValues, setSignupValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  // Check if user is already logged in
  React.useEffect(() => {
    if (user) {
      const redirectTo = router.query.redirect as string || '/account';
      router.push(redirectTo);
    }
  }, [user, router]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setError(null);
    setSuccessMessage(null);
    setForgotPasswordMode(false);
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  };

  const handleSignupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupValues({
      ...signupValues,
      [name]: value,
    });
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      await login(loginValues.email, loginValues.password);
      // Redirect handled by useEffect when user state changes
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    // Validation
    if (signupValues.password !== signupValues.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (signupValues.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }
    
    try {
      await signup(signupValues.name, signupValues.email, signupValues.password);
      // Redirect handled by useEffect when user state changes
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      // In a real app, call the forgotPassword function from your auth context
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccessMessage('Password reset email sent. Please check your inbox.');
    } catch (error) {
      setError((error as Error).message);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleForgotPasswordMode = () => {
    setForgotPasswordMode(!forgotPasswordMode);
    setError(null);
    setSuccessMessage(null);
  };

  // If the page is still checking authentication status
  if (loading) {
    return (
      <Layout>
        <Box 
          sx={{ 
            minHeight: '70vh', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}
        >
          <CircularProgress />
        </Box>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>{activeTab === 0 ? 'Login' : 'Sign Up'} | KeyToWish</title>
      </Head>
      <Layout>
        <Box 
          sx={{ 
            py: 8,
            minHeight: '80vh',
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'grey.50',
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4} justifyContent="center">
              {!isMobile && (
                <Grid item xs={12} md={6} lg={5}>
                  <Box 
                    sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column',
                      justifyContent: 'center' 
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                      <SimpleLogo width={50} height={50} />
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          ml: 1, 
                          fontWeight: 700,
                          fontFamily: '"Varela Round", sans-serif',
                        }}
                      >
                        KeyToWish
                      </Typography>
                    </Box>
                    
                    <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
                      {activeTab === 0 ? 'Welcome Back!' : 'Create an Account'}
                    </Typography>
                    
                    <Typography variant="body1" color="text.secondary" paragraph sx={{ fontSize: '1.1rem' }}>
                      {activeTab === 0 
                        ? 'Sign in to access your account, manage your wish cards, and track your orders.'
                        : 'Join KeyToWish to start creating personalized wish cards that will bring joy to your loved ones.'}
                    </Typography>
                    
                    <Box 
                      sx={{
                        mt: 4,
                        p: 3,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'primary.main',
                        bgcolor: 'primary.light',
                        color: 'primary.contrastText',
                      }}
                    >
                      <Typography variant="body1" fontWeight="medium" sx={{ mb: 1 }}>
                        {activeTab === 0 
                          ? 'Don\'t have an account?'
                          : 'Already have an account?'}
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {activeTab === 0 
                          ? 'Sign up to get started with creating your personalized wish cards.'
                          : 'Log in to access your account and manage your wish cards.'}
                      </Typography>
                      <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={() => setActiveTab(activeTab === 0 ? 1 : 0)}
                        fullWidth
                      >
                        {activeTab === 0 ? 'Sign Up' : 'Login'}
                      </Button>
                    </Box>
                  </Box>
                </Grid>
              )}
              
              <Grid item xs={12} md={6} lg={5}>
                <Paper 
                  elevation={3}
                  sx={{ 
                    p: 4, 
                    borderRadius: 2,
                  }}
                >
                  {isMobile && (
                    <Box sx={{ mb: 4 }}>
                      <Tabs 
                        value={activeTab} 
                        onChange={handleTabChange} 
                        variant="fullWidth"
                      >
                        <Tab label="Login" />
                        <Tab label="Sign Up" />
                      </Tabs>
                    </Box>
                  )}
                  
                  {!isMobile && (
                    <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                      {activeTab === 0 
                        ? (forgotPasswordMode ? 'Reset Password' : 'Login to Your Account')
                        : 'Create Your Account'}
                    </Typography>
                  )}
                  
                  {error && (
                    <Alert severity="error" sx={{ mb: 3 }}>
                      {error}
                    </Alert>
                  )}
                  
                  {successMessage && (
                    <Alert severity="success" sx={{ mb: 3 }}>
                      {successMessage}
                    </Alert>
                  )}
                  
                  <TabPanel value={activeTab} index={0}>
                    {forgotPasswordMode ? (
                      // Forgot Password Form
                      <Box component="form" onSubmit={handleForgotPasswordSubmit}>
                        <Typography variant="body1" paragraph>
                          Enter your email address and we'll send you a link to reset your password.
                        </Typography>
                        
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="forgot-email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          value={forgotPasswordEmail}
                          onChange={(e) => setForgotPasswordEmail(e.target.value)}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                        
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3 }}
                          disabled={loading}
                        >
                          {loading ? <CircularProgress size={24} /> : 'Send Reset Link'}
                        </Button>
                        
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                          <MuiLink
                            component="button"
                            variant="body2"
                            onClick={toggleForgotPasswordMode}
                            sx={{ cursor: 'pointer' }}
                          >
                            Back to Login
                          </MuiLink>
                        </Box>
                      </Box>
                    ) : (
                      // Login Form
                      <Box component="form" onSubmit={handleLoginSubmit}>
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                          value={loginValues.email}
                          onChange={handleLoginChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon color="action" />
                              </InputAdornment>
                            ),
                          }}
                        />
                        
                        <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type={showPassword ? 'text' : 'password'}
                          id="password"
                          autoComplete="current-password"
                          value={loginValues.password}
                          onChange={handleLoginChange}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon color="action" />
                              </InputAdornment>
                            ),
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={togglePasswordVisibility}
                                  edge="end"
                                >
                                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                        
                        <Box sx={{ textAlign: 'right', mt: 1 }}>
                          <MuiLink
                            component="button"
                            variant="body2"
                            onClick={toggleForgotPasswordMode}
                            sx={{ cursor: 'pointer' }}
                          >
                            Forgot password?
                          </MuiLink>
                        </Box>
                        
                        <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                          disabled={loading}
                        >
                          {loading ? <CircularProgress size={24} /> : 'Sign In'}
                        </Button>
                        
                        <Divider sx={{ my: 3 }}>
                          <Typography variant="body2" color="text.secondary">
                            OR
                          </Typography>
                        </Divider>
                        
                        <Grid container spacing={2}>
                          <Grid item xs={4}>
                            <Button
                              fullWidth
                              variant="outlined"
                              color="primary"
                              startIcon={<GoogleIcon />}
                              sx={{ textTransform: 'none' }}
                              onClick={() => alert('Google login integration goes here')}
                            >
                              Google
                            </Button>
                          </Grid>
                          <Grid item xs={4}>
                            <Button
                              fullWidth
                              variant="outlined"
                              color="primary"
                              startIcon={<FacebookIcon />}
                              sx={{ textTransform: 'none' }}
                              onClick={() => alert('Facebook login integration goes here')}
                            >
                              Facebook
                            </Button>
                          </Grid>
                          <Grid item xs={4}>
                            <Button
                              fullWidth
                              variant="outlined"
                              color="primary"
                              startIcon={<TwitterIcon />}
                              sx={{ textTransform: 'none' }}
                              onClick={() => alert('Twitter login integration goes here')}
                            >
                              Twitter
                            </Button>
                          </Grid>
                        </Grid>
                        
                        {isMobile && (
                          <Box sx={{ mt: 3, textAlign: 'center' }}>
                            <Typography variant="body2">
                              Don't have an account?{' '}
                              <MuiLink
                                component="button"
                                variant="body2"
                                onClick={() => setActiveTab(1)}
                                sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                              >
                                Sign Up
                              </MuiLink>
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    )}
                  </TabPanel>
                  
                  <TabPanel value={activeTab} index={1}>
                    <Box component="form" onSubmit={handleSignupSubmit}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoComplete="name"
                        value={signupValues.name}
                        onChange={handleSignupChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                      
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="signup-email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={signupValues.email}
                        onChange={handleSignupChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                      
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        id="signup-password"
                        autoComplete="new-password"
                        value={signupValues.password}
                        onChange={handleSignupChange}
                        helperText="Password must be at least 8 characters long"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon color="action" />
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={togglePasswordVisibility}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="confirmPassword"
                        label="Confirm Password"
                        type={showPassword ? 'text' : 'password'}
                        id="confirm-password"
                        value={signupValues.confirmPassword}
                        onChange={handleSignupChange}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                      />
                      
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading}
                      >
                        {loading ? <CircularProgress size={24} /> : 'Create Account'}
                      </Button>
                      
                      <Typography variant="body2" color="text.secondary" align="center">
                        By signing up, you agree to our{' '}
                        <MuiLink component={Link} href="/terms">
                          Terms of Service
                        </MuiLink>{' '}
                        and{' '}
                        <MuiLink component={Link} href="/privacy">
                          Privacy Policy
                        </MuiLink>
                      </Typography>
                      
                      <Divider sx={{ my: 3 }}>
                        <Typography variant="body2" color="text.secondary">
                          OR
                        </Typography>
                      </Divider>
                      
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            startIcon={<GoogleIcon />}
                            sx={{ textTransform: 'none' }}
                            onClick={() => alert('Google signup integration goes here')}
                          >
                            Google
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            startIcon={<FacebookIcon />}
                            sx={{ textTransform: 'none' }}
                            onClick={() => alert('Facebook signup integration goes here')}
                          >
                            Facebook
                          </Button>
                        </Grid>
                        <Grid item xs={4}>
                          <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            startIcon={<TwitterIcon />}
                            sx={{ textTransform: 'none' }}
                            onClick={() => alert('Twitter signup integration goes here')}
                          >
                            Twitter
                          </Button>
                        </Grid>
                      </Grid>
                      
                      {isMobile && (
                        <Box sx={{ mt: 3, textAlign: 'center' }}>
                          <Typography variant="body2">
                            Already have an account?{' '}
                            <MuiLink
                              component="button"
                              variant="body2"
                              onClick={() => setActiveTab(0)}
                              sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                            >
                              Login
                            </MuiLink>
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </TabPanel>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    </>
  );
};

export default AuthPage;
