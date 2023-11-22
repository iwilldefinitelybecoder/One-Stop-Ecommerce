import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51ODfo6SIFJyDhGg8oAtubY2vaJLeBvmG57raPpcGJIVkRLDalSWa9UvDvTrqSF22yKnhzoHa57vwjGpGQx6shOOL00RJGmooQA');

const CheckoutForm= () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
        console.log('PaymentMethod', paymentMethod);
    }
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


const Payment= () => {
    return (
      <Elements stripe={stripePromise}>
        {/* Components using useStripe or useElements should be nested here */}
        <CheckoutForm />
        {/* Other components */}
      </Elements>
    );
  };

export default Payment;
