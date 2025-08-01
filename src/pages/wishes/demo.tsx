import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  TextField, 
  Paper,
  Card, 
  CardContent, 
  CardMedia,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Fade
} from '@mui/material';
import Layout from '@/components/layout/Layout';
import Head from 'next/head';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const DemoPage = () => {
  const [key, setKey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
    setError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!key) {
      setError('Please enter the key to unlock.');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (key.toLowerCase() === 'demo') {
        setUnlocked(true);
      } else {
        setError('Invalid key. Hint: The key is "demo"');
      }
      setLoading(false);
    }, 1500);
  };

  const handleViewUnlockedCard = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Layout>
      <Head>
        <title>Demo Wish Card | KeyToWish</title>
        <meta name="description" content="Try out our wish card unlocking feature with this demo" />
      </Head>
      
      <Box sx={{ bgcolor: 'background.default', py: 8, minHeight: '80vh' }}>
        <Container maxWidth="md">
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              textAlign: 'center', 
              mb: 4,
              fontWeight: 700
            }}
          >
            Demo Card
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            sx={{ 
              textAlign: 'center', 
              mb: 6,
              maxWidth: 600,
              mx: 'auto',
              color: 'text.secondary'
            }}
          >
            This is a demonstration of how our wish cards work. Enter the key "demo" to unlock and see the special message.
          </Typography>
          
          <Card 
            elevation={0} 
            sx={{ 
              maxWidth: 500, 
              mx: 'auto',
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
              position: 'relative'
            }}
          >
            <CardMedia
              component="img"
              height={300}
              image="https://images.unsplash.com/photo-1530103862676-de8c9debad1d"
              alt="Birthday Card"
            />
            
            <Box 
              sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                bgcolor: 'rgba(0,0,0,0.4)',
                opacity: unlocked ? 0 : 1,
                transition: 'opacity 0.5s ease',
                pointerEvents: unlocked ? 'none' : 'auto',
              }}
            >
              <LockIcon sx={{ fontSize: 40, color: 'white', mb: 2 }} />
              <Typography color="white" variant="h5" fontWeight={600} mb={3}>
                This card is locked
              </Typography>
              <Typography color="white" variant="body1" mb={4} sx={{ px: 4, textAlign: 'center' }}>
                Enter the correct key to unlock and view the special message
              </Typography>
            </Box>
            
            <CardContent>
              <Typography gutterBottom variant="h5">
                Happy Birthday!
              </Typography>
              
              {unlocked ? (
                <Fade in={unlocked} timeout={1000}>
                  <Box>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Dear Friend,
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Wishing you the happiest of birthdays! May your day be filled with joy, laughter, and beautiful moments to cherish.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 3 }}>
                      With love,
                    </Typography>
                    <Typography variant="body1">
                      Your Friend
                    </Typography>
                    
                    <Box 
                      sx={{ 
                        mt: 3, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                    >
                      <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                      <Typography color="success.main">
                        Card unlocked successfully!
                      </Typography>
                    </Box>
                    
                    <Button 
                      fullWidth 
                      variant="contained" 
                      sx={{ mt: 3 }}
                      onClick={handleViewUnlockedCard}
                    >
                      View Full Card
                    </Button>
                  </Box>
                </Fade>
              ) : (
                <Box 
                  component="form" 
                  onSubmit={handleSubmit}
                  sx={{ mt: 2 }}
                >
                  <TextField
                    fullWidth
                    label="Enter Key"
                    variant="outlined"
                    value={key}
                    onChange={handleKeyChange}
                    error={Boolean(error)}
                    helperText={error}
                    placeholder="demo"
                    sx={{ mb: 2 }}
                  />
                  
                  <Button 
                    fullWidth 
                    type="submit" 
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <LockOpenIcon />}
                  >
                    {loading ? 'Unlocking...' : 'Unlock Card'}
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
          
          <Box sx={{ mt: 6, textAlign: 'center' }}>
            <Typography variant="body1" paragraph>
              Want to create your own personalized wish card?
            </Typography>
            <Button 
              variant="contained" 
              color="secondary"
              href="/order"
            >
              Create Your Card
            </Button>
          </Box>
        </Container>
      </Box>
      
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Your Unlocked Birthday Card</DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <img 
              src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d"
              alt="Birthday Card"
              style={{ width: '100%', borderRadius: 8, marginBottom: 24 }}
            />
            
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, textAlign: 'center' }}>
              Happy Birthday!
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ textAlign: 'center', fontSize: '1.2rem' }}>
              Dear Friend,
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ textAlign: 'center', fontSize: '1.2rem' }}>
              Wishing you the happiest of birthdays! May your day be filled with joy, laughter, and beautiful moments to cherish.
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ textAlign: 'center', fontSize: '1.2rem' }}>
              Another year older, but also another year wiser, kinder, and more amazing. Here's to celebrating you today and every day!
            </Typography>
            
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 4, fontSize: '1.2rem' }}>
              With love,<br />
              <strong>Your Friend</strong>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export default DemoPage;
