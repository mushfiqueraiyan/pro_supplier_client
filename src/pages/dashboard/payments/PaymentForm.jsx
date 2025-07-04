import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/AxiosSecure";
import useAuth from "../../../hooks/GetAuth";
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState("");

  const axiosSecure = useAxiosSecure();

  const { id } = useParams();

  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcels", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`parcels/${id}`);
      return res.data;
    },
  });

  const amount = parcelInfo.cost;
  const amountInCents = amount * 100;

  const navigate = useNavigate();

  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      console.log("PAYMENT: ", paymentMethod);

      //create payment intent

      const res = await axiosSecure.post("create-payment-intent", {
        amountInCents,
        id,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.paymentIntent.status === "succeeded") {
        const transactionId = result.paymentIntent.id;
        const paymentData = {
          parcelId: id,
          email: user.email,
          amount,
          transactionId: transactionId,
          paymentMethod: result.paymentIntent.payment_method_types[0],
        };

        const paymentRes = await axiosSecure.post("payments", paymentData);

        if (paymentRes.data.insertedId) {
          await Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
            confirmButtonText: "Go to My Parcels",
          });

          navigate("/dashboard/myParcels");
        }
      }

      //console.log(res);
    }
  };

  return (
    <div className="h-screen p-50">
      <div className=" p-6 bg-white rounded-2xl shadow-md mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Pay for Parcel Pickup
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-md focus-within:ring-2 focus-within:ring-blue-500 bg-gray-50">
            <CardElement />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            className="w-full bg-[#CAEB66] text-black py-2 px-4 rounded-md hover:bg-[#c8e27a] transition disabled:opacity-50"
            type="submit"
            disabled={!stripe}
          >
            Pay <span className="font-bold">${amount}</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
