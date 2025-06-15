import React, { useState } from 'react';
import { 
  Grid, 
  TextField, 
  MenuItem, 
  Button, 
  FormControl, 
  FormLabel, 
  FormControlLabel, 
  RadioGroup, 
  Radio, 
  Typography,
  Box,
  InputAdornment
} from '@mui/material';
import styles from '@/styles/OrderForm.module.scss';

const OCCASIONS = ['Birthday', 'Anniversary', 'New Baby', 'Friendship', 'Motivation'];
const TEMPLATES = ['Classic', 'Modern', 'Minimalist', 'Vibrant', 'Elegant'];
const PRICE = 4.99;

interface OrderFormProps {
  onSubmit: (data: any) => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    recipient: '',
    occasion: '',
    customKey: '',
    template: 'Classic',
    photo: null,
    voiceMessage: null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.recipient) {
      newErrors.recipient = 'Recipient name is required';
    }
    
    if (!formData.occasion) {
      newErrors.occasion = 'Please select an occasion';
    }
    
    if (formData.customKey && !/^[A-Za-z0-9-]{3,20}$/.test(formData.customKey)) {
      newErrors.customKey = 'Key must be 3-20 characters and contain only letters, numbers, or hyphens';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Recipient Name"
            name="recipient"
            value={formData.recipient}
            onChange={handleChange}
            error={!!errors.recipient}
            helperText={errors.recipient}
            required
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            select
            label="Occasion"
            name="occasion"
            value={formData.occasion}
            onChange={handleChange}
            error={!!errors.occasion}
            helperText={errors.occasion}
            required
          >
            {OCCASIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Custom Key (Optional)"
            name="customKey"
            value={formData.customKey}
            onChange={handleChange}
            error={!!errors.customKey}
            helperText={errors.customKey || "Create a custom URL (e.g. 'happy-birthday-john')"}
          />
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box className={styles.fileInput}>
            <Typography variant="body1" gutterBottom>Photo Upload</Typography>
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleFileChange}
              className={styles.input}
            />
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Box className={styles.fileInput}>
            <Typography variant="body1" gutterBottom>Voice Message Upload</Typography>
            <input
              type="file"
              name="voiceMessage"
              accept="audio/mp3,audio/wav"
              onChange={handleFileChange}
              className={styles.input}
            />
          </Box>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Payment Amount"
            value={`$${PRICE.toFixed(2)}`}
            InputProps={{
              readOnly: true,
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Template Choice</FormLabel>
            <RadioGroup
              row
              name="template"
              value={formData.template}
              onChange={handleChange}
            >
              {TEMPLATES.map((template) => (
                <FormControlLabel 
                  key={template} 
                  value={template} 
                  control={<Radio />} 
                  label={template} 
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Grid>
        
        <Grid item xs={12} textAlign="center">
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            size="large"
          >
            Place Order
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default OrderForm;
