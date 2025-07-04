import React from "react";
import { Link } from "react-router";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Forbidden</h1>
      <p className="mb-6">You do not have permission to view this page.</p>
      <Link to="/" className="text-blue-500 underline">
        Go Home
      </Link>
    </div>
  );
};

export default Forbidden;
