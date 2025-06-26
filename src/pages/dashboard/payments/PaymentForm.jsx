import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState("");

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
            Pay
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
