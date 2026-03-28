import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { productImages } from '../../assets/images';
import PaymentModal from '../../components/payment/PaymentModal';

const SHIPPING_FEE = 80;

const Checkout = () => {
  const { cartItems, subtotal, clearCart, totalItems } = useCart();
  const { placeOrder } = useOrders();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showPayment, setShowPayment] = useState(false);

  const total = subtotal + SHIPPING_FEE;

  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-[60vh] bg-[#fbf9f5] flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-6xl">🛒</div>
        <h2 className="text-2xl font-heading font-bold text-gray-800">Nothing to checkout</h2>
        <Link to="/products" className="bg-emerald-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-emerald-800 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handlePaymentSuccess = (paymentMethod) => {
    placeOrder(cartItems, total, {
      paymentMethod,
      address: 'Default Address',
    });
    clearCart();
    navigate('/payment-success');
  };

  return (
    <div className="w-full min-h-screen bg-[#fbf9f5] py-10 px-4">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        
        <h1 className="text-2xl font-heading font-bold text-gray-900">Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* Left: Order Items */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-heading font-bold text-gray-900 mb-4">Order Items ({totalItems})</h3>
              <div className="flex flex-col gap-3">
                {cartItems.map(item => {
                  const price = item.salePrice || item.sale_price || item.price || 0;
                  const img = productImages[item.image] || item.image || productImages.ghee;
                  return (
                    <div key={item.id} className="flex items-center gap-4 py-2 border-b border-gray-100 last:border-b-0">
                      <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                        <img src={img} alt={item.name} className="w-full h-full object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                        <p className="text-xs text-gray-400">Qty: {item.qty}</p>
                      </div>
                      <p className="font-bold text-gray-900 text-sm shrink-0">₹ {price * item.qty}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-heading font-bold text-gray-900 mb-3">Shipping Address</h3>
              <p className="text-gray-600 text-sm">{user?.name || 'User'}</p>
              <p className="text-gray-500 text-sm mt-1">12, Green Park Colony, New Delhi — 110016</p>
              <p className="text-gray-400 text-sm mt-1">📞 {user?.phone || '+91 9876543210'}</p>
            </div>
          </div>

          {/* Right: Summary + Pay */}
          <div className="w-full lg:w-80 bg-white border border-gray-200 rounded-xl p-6 shadow-sm shrink-0">
            <h3 className="text-lg font-heading font-bold text-gray-900 mb-5">Payment Summary</h3>
            <div className="flex flex-col gap-3 text-[15px]">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₹ {subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className="font-semibold text-gray-900">₹ {SHIPPING_FEE}</span>
              </div>
              <hr className="border-gray-200 my-1" />
              <div className="flex justify-between font-bold text-gray-900 text-lg">
                <span>Total</span>
                <span>₹ {total}</span>
              </div>
            </div>
            
            <button
              onClick={() => setShowPayment(true)}
              className="w-full mt-6 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3.5 rounded-lg transition shadow-md text-[15px]"
            >
              Pay Now
            </button>
            <Link to="/cart" className="block text-center mt-4 text-gray-500 text-sm font-semibold hover:underline">
              ← Back to Cart
            </Link>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPayment}
        amount={total}
        onClose={() => setShowPayment(false)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Checkout;