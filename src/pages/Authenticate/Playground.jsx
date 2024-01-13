import React from 'react'

import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet.
        return;
      }
  
      const cardElement = elements.getElement(CardElement);
  
      try {
        const { token, error } = await stripe.createToken(cardElement);
  
        if (error) {
          console.error(error);
        } else {
          // Send the token to your server
          sendTokenToServer(token);
        }
      } catch (error) {
        console.error('Error creating token:', error);
      }
    };
  
    const sendTokenToServer = (token) => {
      // Make a request to your server to process the payment
      // You can use Fetch, Axios, or any other HTTP library here
      fetch('/your-server-endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: token.id }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Payment successful:', data);
        })
        .catch((error) => {
          console.error('Error processing payment:', error);
        });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    );
  };
  

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const Playground = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};


export default Playground