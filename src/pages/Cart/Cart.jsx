import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { productImages } from '../../assets/images';

const SHIPPING_FEE = 80;

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, clearCart, subtotal, totalItems } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="w-full min-h-[60vh] bg-[#fbf9f5] flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-6xl">🛒</div>
        <h2 className="text-2xl font-heading font-bold text-gray-800">Your cart is empty</h2>
        <p className="text-gray-500">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="bg-emerald-700 text-white font-bold px-8 py-3 rounded-lg hover:bg-emerald-800 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const total = subtotal + SHIPPING_FEE;

  return (
    <div className="w-full min-h-screen bg-[#fbf9f5] py-10 px-4">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">

        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </h1>
          <button onClick={clearCart} className="text-red-500 font-semibold text-sm hover:underline cursor-pointer">
            Clear cart
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Cart Items */}
          <div className="flex-1 flex flex-col gap-4">
            {cartItems.map(item => {
              const price = item.salePrice || item.sale_price || item.price || 0;
              const imageSrc = productImages[item.image] || item.image || productImages.ghee;
              return (
                <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 shadow-sm">
                  {/* Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                    <img src={imageSrc} alt={item.name} className="w-full h-full object-contain p-1" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between gap-2">
                      <p className="font-semibold text-gray-900 text-[15px] leading-tight">{item.name}</p>
                      <p className="font-bold text-gray-900 shrink-0">₹ {price}</p>
                    </div>

                    <p className="text-emerald-600 text-sm font-medium">In stock</p>

                    <div className="flex items-center gap-4 mt-1">
                      {/* Qty controls */}
                      <div className="flex items-center border border-gray-300 rounded overflow-hidden h-8">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-3 text-gray-600 hover:bg-gray-100 transition font-bold text-sm h-full">-</button>
                        <span className="px-3 text-sm font-bold text-gray-900">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-3 text-gray-600 hover:bg-gray-100 transition font-bold text-sm h-full">+</button>
                      </div>

                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm font-semibold hover:underline cursor-pointer">
                        Remove
                      </button>

                      <span className="text-gray-500 text-sm">Line total: ₹ {price * item.qty}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-72 bg-white border border-gray-200 rounded-xl p-6 shadow-sm shrink-0">
            <h3 className="text-lg font-heading font-bold text-gray-900 mb-5">Order Summary</h3>
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
              <div className="flex justify-between font-bold text-gray-900 text-base">
                <span>Total</span>
                <span>₹ {total}</span>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/checkout')}
              className="w-full mt-6 bg-emerald-800 hover:bg-emerald-900 text-white font-bold py-3.5 rounded-lg transition shadow-md text-[15px]"
            >
              Proceed to Checkout
            </button>
            <Link to="/products" className="block text-center mt-4 text-emerald-700 text-sm font-semibold hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;