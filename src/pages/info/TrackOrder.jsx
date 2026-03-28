import React from 'react';

const TrackOrder = () => {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center bg-[#fbf9f5] py-20 px-4">
      <div className="w-full max-w-lg flex flex-col items-center gap-8">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-emerald-800 tracking-tight text-center">
          Track Your Order
        </h1>
        
        <div className="w-full flex flex-col gap-6 mt-4">
          <label htmlFor="trackingNumber" className="text-center font-bold text-gray-900 text-lg">
            Order ID / Tracking Number
          </label>
          <input 
            type="text" 
            id="trackingNumber"
            placeholder="Enter Order ID or Tracking Number" 
            className="w-full px-6 py-4 rounded-md border border-gray-300 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-[#e1b931] bg-white placeholder-gray-400 text-center text-lg shadow-sm"
          />
          <button className="w-full mt-2 bg-[#dcb124] hover:bg-[#c9a120] text-zinc-900 font-bold text-xl py-4 rounded-md transition-colors duration-300 shadow-sm">
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;