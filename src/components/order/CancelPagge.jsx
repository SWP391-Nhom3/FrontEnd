import React from "react";
import { Link } from "react-router-dom";

const CancelPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white dark:bg-gray-900">
      <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        Payment Canceled
      </h1>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        Your payment has been canceled. You can try again or continue shopping.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/cart"
          className="rounded bg-primary-700 px-4 py-2 text-white hover:bg-primary-800"
        >
          Go to Cart
        </Link>
        <Link
          to="/"
          className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-gray-800"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;
