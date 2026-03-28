import React, { useState, useEffect, useRef } from 'react';
import NavbarLogo from './NavbarLogo'
import NavbarMenu from './NavbarMenu'
import NavbarActions from './NavbarActions'
import { CiSearch } from "react-icons/ci";
import { productsData } from '../../../constants/productsData';
import { productImages } from '../../../assets/images';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  const searchRef = useRef(null);

  // Debounce logic
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 400); 
    return () => clearTimeout(timerId);
  }, [searchTerm]);

  // Search logic
  useEffect(() => {
    if (debouncedTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const lowerCaseTerm = debouncedTerm.toLowerCase();
    const results = productsData.filter(product => 
      product.name.toLowerCase().includes(lowerCaseTerm)
    ).slice(0, 5);

    setSearchResults(results);
  }, [debouncedTerm]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearching(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className='w-full flex flex-col shadow-sm z-40 bg-[#fbf9f5]'>
      <div className='w-full flex justify-between items-center py-1 px-8'>
        <NavbarLogo/>
        
        {/* Search Bar */}
        <div ref={searchRef} className="flex-1 max-w-2xl mx-8 ml-20 relative">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsSearching(true);
            }}
            onFocus={() => setIsSearching(true)}
            className="w-full bg-[#f3ebd8] text-gray-700 rounded-full py-2.5 px-6 focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
          <CiSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-600 cursor-pointer" />
          
          {/* Search Dropdown */}
          {isSearching && searchTerm.length > 0 && (
            <div className="absolute top-12 left-0 w-full bg-white rounded-lg shadow-xl overflow-hidden z-50 border border-gray-100 max-h-96 overflow-y-auto">
              {searchResults.length > 0 ? (
                <ul className="flex flex-col">
                  {searchResults.map(product => (
                    <li key={product.id} className="cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-none">
                      <Link to={`/`} className="flex items-center gap-4 p-3" onClick={() => setIsSearching(false)}>
                        <img 
                          src={productImages[product.image]} 
                          alt={product.name} 
                          className="w-12 h-12 object-cover rounded-md shadow-sm"
                        />
                        <div className="flex flex-col">
                          <span className="text-base font-semibold text-emerald-800">{product.name}</span>
                          <span className="text-sm text-gray-600 font-medium">₹{product.salePrice}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-4 text-center text-sm text-gray-500">
                  No products found for "{searchTerm}"
                </div>
              )}
            </div>
          )}
        </div>

        <NavbarActions/>
      </div>

      {/* Second Layer - Navigations */}
      <div className='w-full flex justify-center py-3 border-t border-gray-200'>
        <NavbarMenu/>
      </div>
    </header>
  )
}

export default Navbar