import { useEffect, useState } from "react";
import moment from "moment";
import { Helmet } from "react-helmet-async";
import useAuth from "../../hooks/useAuth";

const PaymtHistory = () => {
  const { user } = useAuth();
  const [paymentHistory, setPaymentHistory] = useState([]);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/payment-history/${user?.email}`)
      .then((response) => response.json())
      .then((data) => {
        setPaymentHistory(data);
      })
      .catch((error) => {
        console.error("Error retrieving payment history:", error);
      });
  }, [user]);

  return (
    <>
      <Helmet>
        <title>HealthyFit | Payment History</title>
      </Helmet>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Payment History</h2>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-200 font-semibold">
                Transaction ID
              </th>
              <th className="py-2 px-4 bg-gray-200 font-semibold">Price</th>
              <th className="py-2 px-4 bg-gray-200 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {paymentHistory.map((payment) => (
              <tr key={payment._id}>
                <td className="py-2 px-4 border text-center">
                  {payment.transactionId}
                </td>
                <td className="py-2 px-4 border text-center">
                  ${payment.price}
                </td>
                <td className="py-2 px-4 border text-center">
                  <small>
                    {moment(payment?.date).format("MMMM Do YYYY, h:mm:ss a")}
                  </small>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PaymtHistory;
