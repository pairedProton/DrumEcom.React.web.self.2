import React, { useState } from 'react';
import { HiCheck } from 'react-icons/hi2';
import { FiPackage, FiTruck, FiHome, FiClipboard } from 'react-icons/fi';

const TrackOrder = () => {
  const [trackingInput, setTrackingInput] = useState('');
  const [trackedOrder, setTrackedOrder] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingInput.trim()) return;
    
    setIsSearching(true);
    setTrackedOrder(null);

    // Simulate network delay
    setTimeout(() => {
      // Mock tracking data
      setTrackedOrder({
        orderId: trackingInput.startsWith('TAU') ? trackingInput.toUpperCase() : `TAU-${trackingInput.toUpperCase()}`,
        expectedArrival: new Date(Date.now() + 3 * 86400000).toLocaleDateString('en-GB'),
        trackingId: Math.floor(Math.random() * 90000000) + 10000000,
        currentStep: 3, // 1 to 4
      });
      setIsSearching(false);
    }, 1200);
  };

  const steps = [
    { id: 1, label: 'Order\nConfirmed', icon: <FiClipboard className="w-6 h-6" />, color: 'text-blue-600' },
    { id: 2, label: 'Order\nShipped', icon: <FiPackage className="w-6 h-6" />, color: 'text-amber-500' },
    { id: 3, label: 'Out for\nDelivery', icon: <FiTruck className="w-6 h-6" />, color: 'text-cyan-600' },
    { id: 4, label: 'Order\nDelivered', icon: <FiHome className="w-6 h-6" />, color: 'text-emerald-600' },
  ];

  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center bg-[#fbf9f5] py-16 px-4">
      <div className="w-full max-w-4xl flex flex-col items-center gap-10">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-emerald-800 tracking-tight text-center">
          Track Your Order
        </h1>
        
        {/* Search Bar */}
        <form onSubmit={handleTrack} className="w-full max-w-lg flex flex-col gap-4">
          <label htmlFor="trackingNumber" className="text-center font-bold text-gray-900 text-lg">
            Enter Order ID or Tracking Number
          </label>
          <div className="flex bg-white rounded-lg shadow-sm border border-gray-300 overflow-hidden focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
            <input 
              type="text" 
              id="trackingNumber"
              value={trackingInput}
              onChange={(e) => setTrackingInput(e.target.value)}
              placeholder="e.g. TAU-123456" 
              className="w-full px-5 py-4 focus:outline-none bg-transparent placeholder-gray-400 font-medium text-gray-800"
            />
            <button 
              type="submit" 
              disabled={isSearching || !trackingInput.trim()}
              className="bg-emerald-700 hover:bg-emerald-800 disabled:bg-emerald-400 text-white font-bold px-8 transition-colors duration-300 flex items-center justify-center shrink-0"
            >
              {isSearching ? 'Tracking...' : 'Track'}
            </button>
          </div>
        </form>

        {/* Tracking Results Area */}
        {trackedOrder && (
          <div className="w-full bg-white rounded-3xl shadow-sm border border-gray-200 p-8 md:p-12 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            
            {/* Header Details */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 border-b border-gray-100 pb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <FiPackage className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Order ID</p>
                  <p className="font-bold text-gray-900 text-xl tracking-tight">#{trackedOrder.orderId}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 justify-end">
                  <span className="font-semibold text-gray-700">Expected Arrival</span>
                  <span className="bg-blue-600 text-white font-bold px-4 py-1.5 rounded-full text-sm shadow-sm">{trackedOrder.expectedArrival}</span>
                </div>
                <div className="flex items-center gap-3 justify-end">
                  <span className="font-semibold text-gray-700">Tracking ID</span>
                  <span className="bg-red-500 text-white font-bold px-4 py-1.5 rounded-full text-sm shadow-sm">{trackedOrder.trackingId}</span>
                </div>
              </div>
            </div>

            {/* Visual Timeline */}
            <div className="relative flex justify-between items-start w-full max-w-3xl mx-auto px-4 sm:px-10">
              
              {/* Connecting Line Base */}
              <div className="absolute top-5 left-[10%] right-[10%] h-1.5 bg-gray-200 rounded-full -z-10 hidden sm:block"></div>
              
              {/* Connected Active Line */}
              <div 
                className="absolute top-5 left-[10%] h-1.5 bg-emerald-500 rounded-full -z-10 hidden sm:block transition-all duration-1000"
                style={{ width: `${((trackedOrder.currentStep - 1) / (steps.length - 1)) * 80}%` }}
              ></div>

              {steps.map((step, index) => {
                const isActive = step.id <= trackedOrder.currentStep;
                const isCurrent = step.id === trackedOrder.currentStep;

                return (
                  <div key={step.id} className="flex flex-col items-center gap-4 relative z-10 w-24">
                    {/* Node */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 shadow-md ${isActive ? 'bg-emerald-500 text-white ring-4 ring-emerald-50' : 'bg-gray-400 text-white'}`}>
                      {isActive ? <HiCheck className="w-6 h-6" /> : <span className="w-2.5 h-2.5 bg-white rounded-full opacity-50"></span>}
                    </div>

                    {/* Desktop Connecting lines (fallback for visual completeness if needed) */}
                    {index < steps.length - 1 && (
                      <div className={`absolute top-5 left-1/2 w-full h-1.5 -z-20 sm:hidden ${isActive ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
                    )}

                    {/* Info */}
                    <div className="flex flex-col items-center text-center gap-2">
                      <div className={`p-2 rounded-xl transition-colors ${isCurrent ? 'bg-gray-50 scale-110 shadow-sm border border-gray-100' : ''}`}>
                         <span className={isActive ? step.color : 'text-gray-400'}>{step.icon}</span>
                      </div>
                      <p className={`text-sm md:text-[15px] font-bold whitespace-pre-line leading-tight ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* <div className="mt-20 text-center">
              <p className="text-gray-500 font-medium">Want real-time updates? <button className="text-emerald-700 font-bold hover:underline">Enable SMS Notifications</button></p>
            </div> */}
            
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrder;