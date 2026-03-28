import React, { useState } from 'react';

const PaymentModal = ({ isOpen, amount, onClose, onPaymentSuccess }) => {
  const [step, setStep] = useState('methods'); // 'methods' | 'card' | 'upi' | 'processing' | 'success'
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [upiId, setUpiId] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');

  if (!isOpen) return null;

  const resetAndClose = () => {
    setStep('methods');
    setCardNumber(''); setExpiry(''); setCvv(''); setCardName(''); setUpiId('');
    setSelectedMethod('');
    onClose();
  };

  const simulatePayment = (method) => {
    setSelectedMethod(method);
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2200);
  };

  const handleCardPay = (e) => {
    e.preventDefault();
    simulatePayment('Card');
  };

  const handleUpiPay = (e) => {
    e.preventDefault();
    simulatePayment('UPI');
  };

  const handleSuccessDone = () => {
    onPaymentSuccess(selectedMethod);
    resetAndClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white w-full max-w-[440px] rounded-2xl shadow-2xl overflow-hidden relative">

        {/* ─── Header ─── */}
        <div className="bg-[#1a2e44] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-wide">Taurus Secure Pay</p>
              <p className="text-blue-200 text-xs">Powered by Razorpay</p>
            </div>
          </div>
          <button onClick={resetAndClose} className="text-white/70 hover:text-white transition p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>

        {/* Amount Bar */}
        {step !== 'success' && step !== 'processing' && (
          <div className="bg-[#f0f4f8] px-6 py-3 flex justify-between items-center border-b border-gray-200">
            <span className="text-gray-500 text-sm font-medium">Amount Payable</span>
            <span className="text-xl font-bold text-gray-900">₹ {amount}</span>
          </div>
        )}

        {/* ─── Step: Payment Methods ─── */}
        {step === 'methods' && (
          <div className="p-6 flex flex-col gap-3">
            <p className="text-sm font-semibold text-gray-500 mb-1">Select Payment Method</p>

            <button onClick={() => setStep('card')} className="w-full flex items-center gap-4 border border-gray-200 rounded-xl px-5 py-4 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900 text-[15px] group-hover:text-emerald-700 transition">Credit / Debit Card</p>
                <p className="text-gray-400 text-xs">Visa, MasterCard, Rupay</p>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>

            <button onClick={() => setStep('upi')} className="w-full flex items-center gap-4 border border-gray-200 rounded-xl px-5 py-4 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                <span className="text-green-700 font-bold text-sm">UPI</span>
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900 text-[15px] group-hover:text-emerald-700 transition">UPI</p>
                <p className="text-gray-400 text-xs">Google Pay, PhonePe, Paytm</p>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>

            <button onClick={() => simulatePayment('COD')} className="w-full flex items-center gap-4 border border-gray-200 rounded-xl px-5 py-4 hover:border-emerald-400 hover:bg-emerald-50/50 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                <span className="text-amber-700 text-lg">💵</span>
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-gray-900 text-[15px] group-hover:text-emerald-700 transition">Cash on Delivery</p>
                <p className="text-gray-400 text-xs">Pay when you receive your order</p>
              </div>
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        )}

        {/* ─── Step: Card Form ─── */}
        {step === 'card' && (
          <form onSubmit={handleCardPay} className="p-6 flex flex-col gap-4">
            <button type="button" onClick={() => setStep('methods')} className="text-emerald-600 text-sm font-semibold flex items-center gap-1 mb-1 hover:underline w-fit">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              Back
            </button>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Card Number</label>
              <input type="text" required value={cardNumber} onChange={e => setCardNumber(e.target.value.replace(/\D/g, '').slice(0, 16))}
                placeholder="1234 5678 9012 3456" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white font-mono tracking-wider" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">Cardholder Name</label>
              <input type="text" required value={cardName} onChange={e => setCardName(e.target.value)}
                placeholder="John Doe" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500 mb-1 block">Expiry</label>
                <input type="text" required value={expiry} onChange={e => setExpiry(e.target.value.slice(0, 5))}
                  placeholder="MM/YY" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white font-mono" />
              </div>
              <div className="flex-1">
                <label className="text-xs font-semibold text-gray-500 mb-1 block">CVV</label>
                <input type="password" required value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="•••" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white font-mono" />
              </div>
            </div>
            <button type="submit" className="w-full bg-[#1a2e44] hover:bg-[#152438] text-white font-bold py-3.5 rounded-lg transition-all shadow-md mt-2 text-[15px]">
              Pay ₹{amount}
            </button>
          </form>
        )}

        {/* ─── Step: UPI Form ─── */}
        {step === 'upi' && (
          <form onSubmit={handleUpiPay} className="p-6 flex flex-col gap-4">
            <button type="button" onClick={() => setStep('methods')} className="text-emerald-600 text-sm font-semibold flex items-center gap-1 mb-1 hover:underline w-fit">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
              Back
            </button>
            <div>
              <label className="text-xs font-semibold text-gray-500 mb-1 block">UPI ID</label>
              <input type="text" required value={upiId} onChange={e => setUpiId(e.target.value)}
                placeholder="username@upi" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-green-500 bg-white" />
            </div>
            <button type="submit" className="w-full bg-[#1a2e44] hover:bg-[#152438] text-white font-bold py-3.5 rounded-lg transition-all shadow-md mt-2 text-[15px]">
              Pay ₹{amount} via UPI
            </button>
          </form>
        )}

        {/* ─── Step: Processing ─── */}
        {step === 'processing' && (
          <div className="p-10 flex flex-col items-center justify-center gap-5">
            <div className="w-14 h-14 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin"></div>
            <p className="text-gray-700 font-semibold text-lg">Processing Payment...</p>
            <p className="text-gray-400 text-sm">Please do not close this window</p>
          </div>
        )}

        {/* ─── Step: Success ─── */}
        {step === 'success' && (
          <div className="p-10 flex flex-col items-center justify-center gap-4">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h3 className="text-2xl font-bold text-emerald-700">Payment Successful!</h3>
            <p className="text-gray-500 text-[15px] text-center">Your payment of <span className="font-bold text-gray-800">₹{amount}</span> has been received.</p>
            <p className="text-gray-400 text-sm">Paid via {selectedMethod}</p>
            <button onClick={handleSuccessDone} className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-lg transition-all shadow-md mt-2 text-[15px]">
              View Order
            </button>
          </div>
        )}

        {/* Footer */}
        {step !== 'success' && step !== 'processing' && (
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex items-center justify-center gap-2">
            <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>
            <span className="text-xs text-gray-400">Secured by 256-bit SSL encryption</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
