import { loadStripe } from "@stripe/stripe-js"
import { getCardById, paymentDetails } from "../service/CustomerServices/CardServices"

const getExpireMonthAndYear = (expire) => {
    const expireDate = new Date(expire)

    const month = expireDate.getMonth() + 1
    const year = expireDate.getFullYear()

    return {month, year}
}

export const processPayment = async (cardId) => {
    const cardDetails = await paymentDetails(cardId)
    const { month, year } = getExpireMonthAndYear(cardDetails.expireDate);
  
    const stripe = await loadStripe(import.meta.env.VITE_OAUTH_STRIPE_PAYMENT_ID);
  
    try {
      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: {
          number: cardDetails.cardNumber,
          exp_month: month,
          exp_year: year,
          cvc: cardDetails.cvc,
        },
      });
  
      return paymentMethod.id;
    } catch (error) {
      console.error("Stripe Error:", error);
      return { status: 'error', message: error.message };
    }
  };

    // const createPaymentIntent = async () => {
    //     try {
    //     const { data } = await axios.post(
    //         `${process.env.REACT_APP_API}/create-payment-intent`,
    //         {},
    //         {
    //         headers: {
    //             Authorization: `Bearer ${getCookie("token")}`,
    //         },
    //         }
    //     );
    //     return data.clientSecret;
    //     } catch (error) {
    //     console.log(error);
    //     }
    // };
    
    // return createPaymentIntent()
    //     .then((clientSecret) => {
    //     stripe.confirmCardPayment(clientSecret, {
    //         payment_method: {
    //         card: elements.getElement(CardElement),
    //         billing_details: {
    //             name: paymentData.name,
    //         },
    //         },
    //     });
    //     })
    //     .then(({ paymentIntent }) => {
    //     // paymentIntent = payment confirmation
    //     const orderData = {
    //         products: paymentData.products,
    //         transaction_id: paymentIntent.id,
    //         amount: paymentIntent.amount,
    //     };
    
    //     createOrder(orderData);
    //     })
    //     .catch((error) => console.log(error));