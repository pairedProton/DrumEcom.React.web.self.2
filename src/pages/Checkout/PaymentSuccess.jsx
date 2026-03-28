import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div className="w-full min-h-[70vh] bg-[#fbf9f5] flex items-center justify-center px-4">
      <div className="text-center flex flex-col items-center gap-6">
        <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-heading font-bold text-emerald-700">Payment Successful! 🎉</h1>
        <p className="text-gray-500 text-[15px] max-w-md">
          Thank you for your order. We've received your payment and your order is being processed. You can track it in your profile.
        </p>
        <div className="flex gap-4 mt-2">
          <Link to="/profile" className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-8 py-3 rounded-lg transition shadow-md">
            View Orders
          </Link>
          <Link to="/products" className="border border-emerald-700 text-emerald-700 font-bold px-8 py-3 rounded-lg hover:bg-emerald-50 transition">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
