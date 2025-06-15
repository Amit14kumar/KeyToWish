import React from 'react';
import { Box, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface AnniversaryTemplateProps {
  order: {
    recipient: string;
    occasion: string;
    photoUrl: string;
  };
}

const AnniversaryTemplate: React.FC<AnniversaryTemplateProps> = ({ order }) => {
  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <FavoriteIcon sx={{ fontSize: 60, color: '#e91e63', mb: 2 }} />
      
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
        Celebrating another wonderful year of love and happiness together!
      </Typography>
    </Box>
  );
};

export default AnniversaryTemplate;
