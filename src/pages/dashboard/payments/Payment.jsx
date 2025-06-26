import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import PaymentForm from "./PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51NnGyJJW3YxHcKJgCGF4Utw7KxPvM0m29LOk7JZwZuFUECmm5c9cC9w9Cbm5jR9Q3yrA4E6zX1P8qvlctu5TDr0K00wQOoxKBa"
);

const Payment = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default Payment;
