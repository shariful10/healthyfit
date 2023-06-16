import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import "./CheckoutForm.css";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const CheckoutForm = ({ classPaid, price }) => {
  // console.log(cart);
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [axiosSecure] = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (price > 0) {
      axiosSecure
        .post(`${import.meta.env.VITE_API_URL}/create-payment-intent`, {
          price,
        })
        .then((res) => {
          // console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      console.log("error", error);
      setCardError(error.message);
    } else {
      setCardError("");
      // console.log("payment method", paymentMethod);
    }
    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }

    setProcessing(false);
    if (paymentIntent.status === "succeeded")
      setTransactionId(paymentIntent?.id);
    // save payment information to the server
    const payment = {
      email: user?.email,
      transactionId: paymentIntent?.id,
      price,
      date: new Date(),
      studentId: classPaid?._id,
      classId: classPaid?.selectedClass?._id,
      availableSeats: classPaid?.selectedClass?.availableSeats,
      className: classPaid?.selectedClass?.className,
      classImage: classPaid?.selectedClass?.classImage,
      totalEnrolledStudents: classPaid?.selectedClass?.totalEnrolledStudents,
      instructorEmail: classPaid?.selectedClass?.instructor?.email,
      instructorName: classPaid?.selectedClass?.instructor?.name,
      instructorImage: classPaid?.selectedClass?.instructor?.image,
    };
    axiosSecure
      .post(`${import.meta.env.VITE_API_URL}/payments`, payment)
      .then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Payment Succesfully Complate",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-5">
        <form className="w-[500px] mx-auto mt-5" onSubmit={handleSubmit}>
          <CardElement
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <div>
            <button
              className="btn mt-2 btn-primary btn-sm  "
              type="submit"
              disabled={!stripe || !clientSecret || processing}
            >
              Payment
            </button>
          </div>
        </form>
        {cardError && <p className="text-red-600">{cardError}</p>}
        {transactionId && (
          <p className="text-green-500 text-center mt-5">
            Transaction complete with transactionId: {transactionId}
          </p>
        )}
      </div>
    </>
  );
};

export default CheckoutForm;
