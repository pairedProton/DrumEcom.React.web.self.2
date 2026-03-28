import React from 'react';
import { Link } from 'react-router-dom';
import { productImages } from '../../assets/images';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

const ghee = productImages.ghee;

const ProductCard = ({product}) => {
  const { user, openAuthModal } = useAuth();
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    if (!user) {
      e.preventDefault();
      openAuthModal('login');
      return;
    }
    addToCart(product, 1);
  };

  return (
    <div className="productCard w-58 h-auto flex flex-col gap-4 justify-between items-start shrink-0 bg-white p-4 rounded-xl">
      <Link to={`/product/${product.id}`} className="productImage w-full h-60 block cursor-pointer">
        {product.image ? (
          <img
            src={productImages[product.image] || product.image}
            className="w-full h-full object-cover object-center rounded-md"
            alt=""
          />
        ) : (
          <img
            src={ghee}
            className="w-full h-auto object-cover object-center rounded-md"
            alt=""
          />
        )}
      </Link>
      <div className="productDetails w-full h-auto flex flex-col gap-2">
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-lg font-semibold text-emerald-700 font-heading h-12 leading-tight hover:underline">
            {product.name}
          </h3>
        </Link>
        <div className="productPriceSec flex gap-2">
          <p className="text-md font-semibold  font-heading text-zinc-800">
            {`₹${product.price}`}
          </p>
          <p className="text-sm font-semibold line-through text-gray-500 font-heading self-center">
            {`₹${product.salePrice || product.sale_price}`}
          </p>
        </div>
        <div className="productButton">
          <button onClick={handleAddToCart} className="bg-emerald-600 text-white px-4 py-2 rounded-md font-semibold font-heading w-full  hover:bg-emerald-800 transition-all duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard