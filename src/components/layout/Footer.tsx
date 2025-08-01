import React from 'react';
import { Box, Container, Typography, IconButton, Grid, Link as MuiLink } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import Link from 'next/link';
import SimpleLogo from '@/components/common/SimpleLogo';

const Footer = () => {
  const footerLinks = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Careers', href: '/careers' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms', href: '/terms' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Cookies', href: '/cookies' },
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Help Center', href: '/help' },
        { name: 'FAQs', href: '/faqs' },
        { name: 'Contact Support', href: '/support' },
      ]
    }
  ];

  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'primary.dark',
        color: 'white',
        pt: 8,
        pb: 4,
      }}
    >
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Box display="flex" alignItems="center">
              <SimpleLogo 
                width={50}
                height={50}
                inverted={true}
              />
              <Typography 
                variant="h6" 
                sx={{ 
                  ml: 0.25, 
                  fontWeight: 700,
                  fontFamily: '"Varela Round", sans-serif',
                  fontSize: '1.55rem',
                  letterSpacing: '0.2px', // Tighter letter spacing
                  textShadow: '0 0 0.5px rgba(255,255,255,0.9), 0 1px 2px rgba(0,0,0,0.3)', // Multiple shadow effect for stroke
                  WebkitTextStroke: '0.2px white', // Subtle text stroke
                  textRendering: 'geometricPrecision',
                  padding: '0 4px', // Add padding to give the text more presence
                }}
              >
                KeyToWish
              </Typography>
            </Box>
            <Typography 
              variant="body2" 
              sx={{ 
                mt: 2, 
                opacity: 0.8,
                textAlign: { xs: 'center', sm: 'left' } 
              }}
            >
              Personalized unlockable wish cards for every special occasion.
            </Typography>
            <Box 
              mt={2} 
              display="flex" 
              justifyContent={{ xs: 'center', sm: 'flex-start' }}
            >
              <IconButton color="inherit" size="small" sx={{ mr: 1 }}>
                <FacebookIcon />
              </IconButton>
              <IconButton color="inherit" size="small" sx={{ mr: 1 }}>
                <TwitterIcon />
              </IconButton>
              <IconButton color="inherit" size="small">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>

          {footerLinks.map((section) => (
            <Grid item xs={12} sm={4} md={3} key={section.title}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 500 }}>
                {section.title}
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {section.links.map((link) => (
                  <Box component="li" key={link.name} sx={{ mb: 1 }}>
                    <MuiLink 
                      component={Link} 
                      href={link.href}
                      sx={{ 
                        color: 'rgba(255,255,255,0.7)',
                        textDecoration: 'none',
                        '&:hover': { color: 'white' }
                      }}
                    >
                      {link.name}
                    </MuiLink>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>
        
        <Box 
          sx={{ 
            borderTop: '1px solid rgba(255,255,255,0.1)', 
            pt: 3, 
            mt: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7 }}>
            &copy; {new Date().getFullYear()} KeyToWish. All rights reserved.
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.7, mt: { xs: 2, sm: 0 } }}>
            Designed with ❤️ for special moments
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
