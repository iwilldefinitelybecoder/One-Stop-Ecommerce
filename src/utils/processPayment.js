import { loadStripe } from "@stripe/stripe-js"
import { getCardById } from "../service/CustomerServices/CardServices"

export const processPayment = async (cardId) => {

    const cardDetails = await getCardById(cardId)

    const stripe = await loadStripe(import.meta.env.VITE_OAUTH_STRIPE_PAYMENT_ID)
    try {
        const { token} = await stripe.createToken('card',cardDetails)
        return token
        
    } catch (error) {
        console.log(error)
        return {status :'error', message: error.message}

        
    }


    }

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