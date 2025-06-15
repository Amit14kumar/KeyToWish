import React from 'react';
import { Box, Typography } from '@mui/material';
import CakeIcon from '@mui/icons-material/Cake';

interface BirthdayTemplateProps {
  order: {
    recipient: string;
    occasion: string;
    photoUrl: string;
  };
}

const BirthdayTemplate: React.FC<BirthdayTemplateProps> = ({ order }) => {
  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <CakeIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
      
      <Typography variant="h4" component="h1" gutterBottom>
        Happy {order.occasion}, {order.recipient}!
      </Typography>
      
      <Box sx={{ my: 3 }}>
        <img 
          src={order.photoUrl} 
          alt={`${order.occasion} wish for ${order.recipient}`} 
          style={{ 
            maxWidth: '100%', 
            height: 'auto', 
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
          }} 
        />
      </Box>
      
      <Typography variant="body1" sx={{ mt: 2 }}>
        Wishing you a day filled with happiness and a year filled with joy!
      </Typography>
    </Box>
  );
};

export default BirthdayTemplate;
