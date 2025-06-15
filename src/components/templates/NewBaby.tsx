import React from 'react';
import { Box, Typography } from '@mui/material';
import ChildCareIcon from '@mui/icons-material/ChildCare';

interface NewBabyTemplateProps {
  order: {
    recipient: string;
    occasion: string;
    photoUrl: string;
  };
}

const NewBabyTemplate: React.FC<NewBabyTemplateProps> = ({ order }) => {
  return (
    <Box sx={{ textAlign: 'center', p: 2 }}>
      <ChildCareIcon sx={{ fontSize: 60, color: '#42a5f5', mb: 2 }} />
      
      <Typography variant="h4" component="h1" gutterBottom>
        Congratulations on your {order.occasion}, {order.recipient}!
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
        Welcoming this precious new life with joy and best wishes!
      </Typography>
    </Box>
  );
};

export default NewBabyTemplate;
