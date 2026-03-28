import React from 'react'
import { CiUser } from "react-icons/ci";
import { PiShoppingCartSimpleThin } from "react-icons/pi";
import { useAuth } from '../../../context/AuthContext';
import { useCart } from '../../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const NavbarActions = () => {
  const { user, openAuthModal } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleUserClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      openAuthModal('login');
    }
  };

  const handleCartClick = () => {
    if (!user) {
      openAuthModal('login');
    } else {
      navigate('/cart');
    }
  };

  return (
    <div className='flex gap-5 pr-2 items-center' >
      <CiUser 
        onClick={handleUserClick} 
        title={user ? "My Profile" : "Login"} 
        className={`text-3xl transition-colors cursor-pointer ${user ? 'text-emerald-700' : 'hover:text-emerald-700'}`} 
      />
      {/* Cart icon with badge */}
      <div className="relative cursor-pointer" onClick={handleCartClick}>
        <PiShoppingCartSimpleThin className='text-3xl hover:text-emerald-700 transition-colors' />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none shadow">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </div>
    </div>
  )
}

export default NavbarActions