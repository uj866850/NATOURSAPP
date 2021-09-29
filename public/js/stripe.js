import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51JSxYxSEmRh1SvI3bMzB3jiMrhWichwxw2hEqOf51KlILhFM1AX0WCDI3bYUdxbWe3GrYsZZ4A2QnQ0c6vZVNyRm00AAndz5WG'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
