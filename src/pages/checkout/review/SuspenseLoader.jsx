import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { Button, CircularProgress, Container, Typography } from '@mui/material';

const PlaceOrderComponent = ({ loadingState }) => {
  const [error, setError] = useState(null);
  const history = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      loadingState(true);

      // Make your place order request here
      // Example: const response = await api.placeOrder();

      // Assuming a successful response for demonstration
      const response = { success: true };

      if (response.success) {
        // Navigate to success page
        history.push('/');
      } else {
        setError('Failed to place order');
        // Navigate to checkout page with error
        history.push('/checkout');
      }
    } catch (error) {
      setError('An error occurred');
      // Navigate to checkout page with error
      history.push('/checkout');
    } finally {
      loadingState(false);
    }
  };

  return (
    <Container maxWidth="md" className="bg-white p-8">
      <Typography variant="h4" className="mb-4">
        Place Your Order
      </Typography>
      {loadingState && (
        <div className="flex items-center justify-center mb-4">
          <CircularProgress size={24} />
          <Typography variant="body1" className="ml-2">
            Placing order...
          </Typography>
        </div>
      )}
      {error && (
        <div className="bg-red-500 p-4 text-white mb-4">
          <Typography variant="body1">{error}</Typography>
        </div>
      )}
      <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </Container>
  );
};

export default PlaceOrderComponent;
