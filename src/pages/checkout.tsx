import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  Divider,
  TextField,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
  InputAdornment,
  Alert,
  Card,
  CardContent,
  useTheme,
  IconButton,
} from '@mui/material';
import Head from 'next/head';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Link from 'next/link';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PaymentsIcon from '@mui/icons-material/Payments';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import QrCodeIcon from '@mui/icons-material/QrCode2';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { alpha } from '@mui/material/styles';
import { useRouter } from 'next/router';

const steps = ['Shipping Information', 'Payment Method', 'Review & Complete'];

const CheckoutPage = () => {
  const theme = useTheme();
  const router = useRouter();
  const { state: cartState, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
    saveInfo: false,
  });
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [cardInfo, setCardInfo] = useState({
    cardNumber: '',
    nameOnCard: '',
    expiry: '',
    cvv: '',
  });
  const [orderComplete, setOrderComplete] = useState(false);
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('');
  const [upiIdCopied, setUpiIdCopied] = useState(false);

  const upiApps = [
    { id: 'gpay', name: 'Google Pay', logo: '/images/gpay-logo.png' },
    { id: 'phonepe', name: 'PhonePe', logo: '/images/phonepe-logo.png' },
    { id: 'paytm', name: 'Paytm', logo: '/images/paytm-logo.png' },
    { id: 'bhim', name: 'BHIM', logo: '/images/bhim-logo.png' },
    { id: 'amazonpay', name: 'Amazon Pay', logo: '/images/amazonpay-logo.png' },
  ];

  const handleShippingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: name === 'saveInfo' ? checked : value,
    });
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  const handleCardInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo({
      ...cardInfo,
      [name]: value,
    });
  };

  const handleUpiAppSelect = (appId: string) => {
    setSelectedUpiApp(appId);
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText('keytowish@upi');
    setUpiIdCopied(true);
    setTimeout(() => setUpiIdCopied(false), 2000);
  };

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handlePlaceOrder = () => {
    setOrderComplete(true);
    clearCart();
    setTimeout(() => {
      router.push('/order-confirmation');
    }, 3000);
  };

  const formatPrice = (price: number): string => {
    return `$${price.toFixed(2)}`;
  };

  const isShippingInfoValid = () => {
    const { firstName, lastName, email, phone, address, city, state, zip } = shippingInfo;
    return firstName && lastName && email && phone && address && city && state && zip;
  };

  const isPaymentInfoValid = () => {
    if (paymentMethod === 'creditCard') {
      const { cardNumber, nameOnCard, expiry, cvv } = cardInfo;
      return cardNumber && nameOnCard && expiry && cvv;
    }
    if (paymentMethod === 'upi') {
      return upiId.includes('@') || selectedUpiApp;
    }
    return true;
  };

  const renderShippingForm = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="firstName"
          name="firstName"
          label="First Name"
          fullWidth
          variant="outlined"
          value={shippingInfo.firstName}
          onChange={handleShippingInfoChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="lastName"
          name="lastName"
          label="Last Name"
          fullWidth
          variant="outlined"
          value={shippingInfo.lastName}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="email"
          name="email"
          label="Email Address"
          fullWidth
          variant="outlined"
          type="email"
          value={shippingInfo.email}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="phone"
          name="phone"
          label="Phone Number"
          fullWidth
          variant="outlined"
          value={shippingInfo.phone}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          id="address"
          name="address"
          label="Address"
          fullWidth
          variant="outlined"
          value={shippingInfo.address}
          onChange={handleShippingInfoChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HomeIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="city"
          name="city"
          label="City"
          fullWidth
          variant="outlined"
          value={shippingInfo.city}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="state"
          name="state"
          label="State/Province/Region"
          fullWidth
          variant="outlined"
          value={shippingInfo.state}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          id="zip"
          name="zip"
          label="Zip / Postal code"
          fullWidth
          variant="outlined"
          value={shippingInfo.zip}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          id="country"
          name="country"
          label="Country"
          fullWidth
          variant="outlined"
          value={shippingInfo.country}
          onChange={handleShippingInfoChange}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              name="saveInfo"
              color="primary"
              checked={shippingInfo.saveInfo}
              onChange={handleShippingInfoChange}
            />
          }
          label="Save this information for next time"
        />
      </Grid>
    </Grid>
  );

  const renderPaymentForm = () => (
    <Box>
      <FormControl component="fieldset">
        <FormLabel component="legend">Payment Method</FormLabel>
        <RadioGroup
          name="paymentMethod"
          value={paymentMethod}
          onChange={handlePaymentMethodChange}
        >
          <Paper elevation={0} variant="outlined" sx={{ mb: 2, p: 2, borderRadius: 2 }}>
            <FormControlLabel
              value="creditCard"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PaymentIcon sx={{ mr: 1 }} />
                  <Typography>Credit / Debit Card</Typography>
                </Box>
              }
            />
          </Paper>

          <Paper elevation={0} variant="outlined" sx={{ mb: 2, p: 2, borderRadius: 2 }}>
            <FormControlLabel
              value="upi"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneIphoneIcon sx={{ mr: 1 }} />
                  <Typography>UPI Payment</Typography>
                  <Box
                    component="span"
                    sx={{
                      ml: 1,
                      bgcolor: 'success.light',
                      color: 'success.contrastText',
                      px: 1,
                      py: 0.2,
                      borderRadius: 1,
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                    }}
                  >
                    Popular in India
                  </Box>
                </Box>
              }
            />
          </Paper>

          <Paper elevation={0} variant="outlined" sx={{ mb: 2, p: 2, borderRadius: 2 }}>
            <FormControlLabel
              value="bankTransfer"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccountBalanceIcon sx={{ mr: 1 }} />
                  <Typography>Bank Transfer</Typography>
                </Box>
              }
            />
          </Paper>

          <Paper elevation={0} variant="outlined" sx={{ mb: 2, p: 2, borderRadius: 2 }}>
            <FormControlLabel
              value="paypal"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PaymentsIcon sx={{ mr: 1 }} />
                  <Typography>PayPal</Typography>
                </Box>
              }
            />
          </Paper>
        </RadioGroup>
      </FormControl>

      {paymentMethod === 'creditCard' && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Card Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="cardNumber"
                name="cardNumber"
                label="Card Number"
                fullWidth
                variant="outlined"
                value={cardInfo.cardNumber}
                onChange={handleCardInfoChange}
                placeholder="1234 5678 9012 3456"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CreditCardIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="nameOnCard"
                name="nameOnCard"
                label="Name on Card"
                fullWidth
                variant="outlined"
                value={cardInfo.nameOnCard}
                onChange={handleCardInfoChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="expiry"
                name="expiry"
                label="Expiry Date"
                fullWidth
                variant="outlined"
                placeholder="MM/YY"
                value={cardInfo.expiry}
                onChange={handleCardInfoChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="cvv"
                name="cvv"
                label="CVV"
                fullWidth
                variant="outlined"
                placeholder="123"
                value={cardInfo.cvv}
                onChange={handleCardInfoChange}
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {paymentMethod === 'upi' && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            UPI Payment
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  p: 2,
                  textAlign: 'center',
                  mb: { xs: 2, md: 0 },
                }}
              >
                <Typography variant="subtitle1" gutterBottom fontWeight={500}>
                  Scan QR Code to Pay
                </Typography>

                <Box
                  sx={{
                    maxWidth: 200,
                    height: 200,
                    mx: 'auto',
                    my: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    p: 2,
                    position: 'relative',
                  }}
                >
                  <QrCodeIcon
                    sx={{
                      width: '100%',
                      height: '100%',
                      color: 'text.secondary',
                      opacity: 0.7,
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <Typography variant="body2" sx={{ mr: 1 }}>
                    UPI ID:
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    keytowish@upi
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={copyUpiId}
                    color={upiIdCopied ? 'success' : 'default'}
                    sx={{ ml: 0.5 }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Box>

                {upiIdCopied && (
                  <Typography variant="caption" color="success.main" sx={{ fontWeight: 'medium' }}>
                    Copied to clipboard!
                  </Typography>
                )}
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom>
                Pay with UPI Apps
              </Typography>

              <Typography variant="body2" color="text.secondary" paragraph>
                Select your preferred UPI app to make the payment
              </Typography>

              <Grid container spacing={1}>
                {upiApps.map((app) => (
                  <Grid item xs={4} key={app.id}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 1,
                        border: '1px solid',
                        borderColor: selectedUpiApp === app.id ? 'primary.main' : 'divider',
                        borderRadius: 2,
                        cursor: 'pointer',
                        textAlign: 'center',
                        bgcolor: selectedUpiApp === app.id ? alpha(theme.palette.primary.main, 0.05) : 'transparent',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.05),
                        },
                      }}
                      onClick={() => handleUpiAppSelect(app.id)}
                    >
                      <Box
                        sx={{
                          height: 40,
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: 0.5,
                        }}
                      >
                        <Box
                          component="img"
                          src={app.logo}
                          alt={app.name}
                          sx={{
                            height: 30,
                            width: 'auto',
                            maxWidth: '100%',
                            opacity: selectedUpiApp === app.id ? 1 : 0.7,
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/images/upi-logo.png';
                          }}
                        />
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: selectedUpiApp === app.id ? 'bold' : 'regular',
                          color: selectedUpiApp === app.id ? 'primary.main' : 'text.secondary',
                        }}
                      >
                        {app.name}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>

              <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                Or Enter UPI ID
              </Typography>

              <TextField
                fullWidth
                size="small"
                label="Your UPI ID"
                placeholder="example@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                helperText="Enter your UPI ID like yourname@bankname"
              />

              <Button variant="outlined" fullWidth sx={{ mt: 2 }} disabled={!upiId.includes('@')}>
                Verify UPI ID
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );

  const renderOrderReview = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>

      <Paper
        elevation={0}
        variant="outlined"
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          mb: 3,
        }}
      >
        {cartState.items.map((item) => (
          <Box
            key={item.id}
            sx={{
              p: 2,
              display: 'flex',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box sx={{ position: 'relative', width: 60, height: 60, flexShrink: 0 }}>
              <Image
                src={item.image}
                alt={item.name}
                fill
                style={{ objectFit: 'cover', borderRadius: 4 }}
              />
            </Box>

            <Box sx={{ ml: 2, width: '100%' }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body1" fontWeight={500}>
                  {item.name}
                </Typography>
                <Typography variant="body1" fontWeight={600}>
                  {formatPrice(item.price * item.quantity)}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  {formatPrice(item.price)} × {item.quantity}
                </Typography>

                {item.category && (
                  <Typography variant="body2" color="text.secondary">
                    {item.category}
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        ))}
      </Paper>

      <Paper elevation={0} variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Shipping Information
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="body2">
              {shippingInfo.firstName} {shippingInfo.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">{shippingInfo.address}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">
              {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">{shippingInfo.country}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">{shippingInfo.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2">{shippingInfo.phone}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={0} variant="outlined" sx={{ p: 2, borderRadius: 2, mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Payment Method
        </Typography>

        <Typography variant="body2">
          {paymentMethod === 'creditCard' ? (
            `Credit Card ending in ${cardInfo.cardNumber.slice(-4)}`
          ) : paymentMethod === 'bankTransfer' ? (
            'Bank Transfer'
          ) : paymentMethod === 'upi' ? (
            selectedUpiApp
              ? `UPI Payment via ${upiApps.find((app) => app.id === selectedUpiApp)?.name || 'UPI app'}`
              : upiId
              ? `UPI ID: ${upiId}`
              : 'UPI Payment via QR Code'
          ) : (
            'PayPal'
          )}
        </Typography>
      </Paper>

      <Paper elevation={0} variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1">Subtotal</Typography>
          <Typography variant="body1">{formatPrice(cartState.total)}</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1">Shipping</Typography>
          <Typography variant="body1">Free</Typography>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="body1">Tax</Typography>
          <Typography variant="body1">{formatPrice(cartState.total * 0.1)}</Typography>
        </Box>

        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight={600}>
            Total
          </Typography>
          <Typography variant="h6" fontWeight={600} color="primary.main">
            {formatPrice(cartState.total * 1.1)}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );

  if (cartState.items.length === 0 && !orderComplete) {
    return (
      <>
        <Head>
          <title>Checkout | KeyToWish</title>
        </Head>
        <Layout>
          <Box sx={{ py: 8, bgcolor: 'background.default' }}>
            <Container maxWidth="md">
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="h5" gutterBottom>
                  Your cart is empty
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 4 }}>
                  Please add some items to your cart before checking out.
                </Typography>
                <Button variant="contained" component={Link} href="/category" size="large">
                  Browse Categories
                </Button>
              </Paper>
            </Container>
          </Box>
        </Layout>
      </>
    );
  }

  if (orderComplete) {
    return (
      <>
        <Head>
          <title>Order Successful | KeyToWish</title>
        </Head>
        <Layout>
          <Box
            sx={{
              py: 8,
              bgcolor: 'background.default',
              minHeight: '70vh',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Container maxWidth="md">
              <Paper
                elevation={0}
                sx={{
                  p: { xs: 3, md: 5 },
                  textAlign: 'center',
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <CheckCircleOutlineIcon
                  color="success"
                  sx={{
                    fontSize: 80,
                    mb: 2,
                  }}
                />

                <Typography variant="h4" gutterBottom fontWeight={700}>
                  Order Placed Successfully!
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
                >
                  Thank you for your purchase! We have sent an order confirmation to{' '}
                  <strong>{shippingInfo.email}</strong>. You will be redirected to the order confirmation page shortly.
                </Typography>

                <Alert severity="info" sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}>
                  Your order number is:{' '}
                  <strong>#KW{Math.floor(Math.random() * 10000).toString().padStart(5, '0')}</strong>
                </Alert>

                <Button variant="contained" component={Link} href="/" size="large">
                  Continue Shopping
                </Button>
              </Paper>
            </Container>
          </Box>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Checkout | KeyToWish</title>
      </Head>
      <Layout>
        <Box sx={{ py: 8, bgcolor: 'background.default' }}>
          <Container maxWidth="lg">
            <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
              Checkout
            </Typography>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 6 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 2, md: 3 },
                    mb: { xs: 3, md: 0 },
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  {activeStep === 0 && renderShippingForm()}
                  {activeStep === 1 && renderPaymentForm()}
                  {activeStep === 2 && renderOrderReview()}

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>
                      Back
                    </Button>
                    <Box>
                      {activeStep === steps.length - 1 ? (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handlePlaceOrder}
                          size="large"
                        >
                          Place Order
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleNext}
                          disabled={
                            (activeStep === 0 && !isShippingInfoValid()) ||
                            (activeStep === 1 && !isPaymentInfoValid())
                          }
                        >
                          Next
                        </Button>
                      )}
                    </Box>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card
                  elevation={0}
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    position: { md: 'sticky' },
                    top: { md: '100px' },
                  }}
                >
                  <CardContent sx={{ p: 0 }}>
                    <Box
                      sx={{
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        p: 2,
                        borderTopLeftRadius: theme.shape.borderRadius,
                        borderTopRightRadius: theme.shape.borderRadius,
                      }}
                    >
                      <Typography variant="subtitle1" fontWeight={600}>
                        Order Summary
                      </Typography>
                    </Box>

                    <Box sx={{ p: 2, maxHeight: 300, overflowY: 'auto' }}>
                      {cartState.items.map((item) => (
                        <Box
                          key={item.id}
                          sx={{
                            display: 'flex',
                            mb: 2,
                            pb: 2,
                            borderBottom: '1px solid',
                            borderColor: 'divider',
                            '&:last-child': {
                              mb: 0,
                              pb: 0,
                              borderBottom: 'none',
                            },
                          }}
                        >
                          <Box sx={{ position: 'relative', width: 40, height: 40, flexShrink: 0 }}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              style={{ objectFit: 'cover', borderRadius: 4 }}
                            />
                          </Box>
                          <Box sx={{ ml: 1.5, flexGrow: 1 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                              <Typography variant="body2" fontWeight={500} noWrap sx={{ maxWidth: 150 }}>
                                {item.name}
                              </Typography>
                              <Typography variant="body2" fontWeight={500}>
                                {formatPrice(item.price * item.quantity)}
                              </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              {item.quantity} × {formatPrice(item.price)}
                            </Typography>
                          </Box>
                        </Box>
                      ))}
                    </Box>

                    <Divider />

                    <Box sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Subtotal</Typography>
                        <Typography variant="body2">{formatPrice(cartState.total)}</Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Shipping</Typography>
                        <Typography variant="body2">Free</Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2">Tax (10%)</Typography>
                        <Typography variant="body2">{formatPrice(cartState.total * 0.1)}</Typography>
                      </Box>

                      <Divider sx={{ my: 1.5 }} />

                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          Total
                        </Typography>
                        <Typography variant="subtitle1" fontWeight={600} color="primary.main">
                          {formatPrice(cartState.total * 1.1)}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Layout>
    </>
  );
};

export default CheckoutPage;
