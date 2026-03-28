import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productsData } from '../../constants/productsData';
import { productImages } from '../../assets/images';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, openAuthModal } = useAuth();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Scroll to top when opening the page
    window.scrollTo(0, 0);
    const found = productsData.find(p => p.id === parseInt(id));
    setProduct(found);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center bg-[#fbf9f5]">
        <h2 className="text-2xl font-bold font-heading text-gray-800">Product Not Found</h2>
        <Link to="/products" className="mt-4 text-emerald-700 underline font-medium">Return to Catalog</Link>
      </div>
    );
  }

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAction = (type) => {
    if (!user) {
      openAuthModal('login');
      return;
    }
    if (type === 'cart') {
      addToCart(product, quantity);
      navigate('/cart');
    } else {
      // Buy Now: add to cart then go directly to cart/checkout
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  const imageSrc = productImages[product.image] || product.image || productImages.ghee;

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen pb-20">
      <div className="w-full max-w-6xl mx-auto px-4 py-8 lg:py-16">
        
        {/* Top Product Section */}
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
          
          {/* Left: Images */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="w-full bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden aspect-square flex items-center justify-center p-8">
              <img src={imageSrc} alt={product.name} className="w-full h-full object-contain" />
            </div>
            {/* Thumbnails */}
            <div className="flex gap-4">
              <div className="w-20 h-20 bg-white rounded-lg p-2 border-2 border-emerald-600 shadow-sm cursor-pointer hover:border-emerald-700 transition">
                <img src={imageSrc} alt="" className="w-full h-full object-contain" />
              </div>
            </div>
          </div>

          {/* Right: Info Area */}
          <div className="w-full md:w-1/2 flex flex-col pt-2 lg:pt-8">
            <h1 className="text-3xl md:text-4xl lg:text-4xl font-heading font-bold text-gray-900 mb-3 leading-tight font-family-body">
              {product.name}
            </h1>
            <p className="text-gray-600 mb-8 font-medium">Brand : <span className="text-gray-900 font-bold">{product.brand || 'Taurus'}</span></p>

            {product.offers && product.offers.length > 0 && (
              <div className="mb-8">
                <p className="font-bold text-gray-900 mb-4">Available Offers:</p>
                <ul className="flex flex-col gap-3">
                  {product.offers.map((offer, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-[15px] font-medium text-gray-800">
                      <span className="w-2 h-2 rounded-full bg-emerald-600 mt-1.5 shrink-0"></span>
                      {offer}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Variant / Size info */}
            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-2 font-medium">Select Variant</p>
              <div className="text-gray-900 font-medium mb-3">{product.boxSize || 'Standard Editon'}</div>
              <div className="flex justify-between items-center text-sm md:w-[85%]">
                <div>
                  <p className="mb-1"><span className="text-gray-500 font-medium">SKU:</span> {product.sku || `TAU-${product.id}00`}</p>
                </div>
                <div className="text-gray-600 font-medium">
                  MRP: ₹{product.price}
                </div>
              </div>
            </div>

            {/* Main Price */}
            <div className="text-2xl md:text-3xl font-bold font-heading text-gray-900 mb-10 font-family-body ">
              ₹ {product.salePrice || product.sale_price}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Quantity Adjuster */}
              <div className="flex items-center bg-white border border-gray-300 rounded overflow-hidden h-12 shadow-sm">
                <button onClick={decreaseQuantity} className="px-5 py-2 hover:bg-gray-100 transition text-gray-600 font-bold text-lg">-</button>
                <span className="px-2 font-bold text-gray-900 w-10 text-center">{quantity}</span>
                <button onClick={increaseQuantity} className="px-5 py-2 hover:bg-gray-100 transition text-gray-600 font-bold text-lg">+</button>
              </div>
              
              <button onClick={() => handleAction('cart')} className="h-12 px-8 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded shadow-md transition-all tracking-wide uppercase text-sm">
                Add to Cart
              </button>
              <button onClick={() => handleAction('buy')} className="h-12 px-8 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded shadow-md transition-all tracking-wide uppercase text-sm">
                Buy Now
              </button>
            </div>
            
          </div>
        </div>

        {/* Lower Description Sections */}
        <div className="w-full mt-24 flex flex-col gap-16 border-t border-gray-200 pt-16">
          
          {/* Description */}
          {product.description && (
            <div>
              <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">Description</h3>
              <p className="text-gray-700 leading-relaxed max-w-5xl text-[15px]">
                {product.description}
              </p>
            </div>
          )}

          {/* Ingredients */}
          {product.ingredients && (
            <div>
              <h3 className="text-xl font-bold font-heading text-gray-900 mb-4">Ingredients</h3>
              <p className="text-gray-700 leading-relaxed max-w-5xl text-[15px]">
                {product.ingredients}
              </p>
            </div>
          )}

          {/* Product Information */}
          <div>
            <h3 className="text-xl font-bold font-heading text-gray-900 mb-6">Product Information</h3>
            <div className="flex flex-col gap-4 text-gray-700 text-[15px] max-w-5xl">
              {product.material && (
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 md:gap-4"><span className="text-gray-500 font-medium">Material / Type :</span> <span className="col-span-1 md:col-span-3 lg:col-span-4">{product.material}</span></div>
              )}
              {product.boxSize && (
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 md:gap-4"><span className="text-gray-500 font-medium">Net Weight :</span> <span className="col-span-1 md:col-span-3 lg:col-span-4">{product.boxSize}</span></div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 md:gap-4"><span className="text-gray-500 font-medium">Shelf Life :</span> <span className="col-span-1 md:col-span-3 lg:col-span-4">24 Months</span></div>
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 md:gap-4"><span className="text-gray-500 font-medium">Manufacturer :</span> <span className="col-span-1 md:col-span-3 lg:col-span-4">Taurus Organic Pvt. Ltd.</span></div>
              <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 md:gap-4"><span className="text-gray-500 font-medium">Country Of Origin :</span> <span className="col-span-1 md:col-span-3 lg:col-span-4">India</span></div>
            </div>
          </div>

          {/* FAQs */}
          {product.faqs && product.faqs.length > 0 && (
            <div>
              <h3 className="text-xl font-bold font-heading text-gray-900 mb-8">FAQ</h3>
              <div className="flex flex-col gap-8 max-w-5xl">
                {product.faqs.map((faq, idx) => {
                  let question = faq;
                  let answer = "For further details on this query, please refer to the product packaging or contact our wellness support team.";
                  
                  // Extract answer if explicitly encoded in string
                  if (faq.includes('?')) {
                    const parts = faq.split('?');
                    question = parts[0] + '?';
                    if (parts.length > 1 && parts[1].trim() !== '') {
                      answer = parts.slice(1).join('?').trim();
                    }
                  }

                  return (
                    <div key={idx} className="flex flex-col gap-2">
                      <h4 className="font-bold text-gray-900 text-[15px]">{idx + 1}. {question}</h4>
                      <p className="text-gray-600 text-[15px]">{answer}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;