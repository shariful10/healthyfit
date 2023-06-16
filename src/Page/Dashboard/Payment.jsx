import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm/CheckoutForm";
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";
// Todp: provide pubish key
const striptPromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
const Payment = () => {
  const locaiton = useLocation();
  const from = locaiton?.state?.state;

  const price = parseFloat(from?.selectedClass?.classPrice?.toFixed(2));

  return (
    <>
      <Helmet>
        <title>HealthyFit | Payment</title>
      </Helmet>
      <div>
        <Elements stripe={striptPromise}>
          <CheckoutForm classPaid={from} price={price} />
        </Elements>
      </div>
    </>
  );
};

export default Payment;
