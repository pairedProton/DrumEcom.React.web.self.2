import React from 'react'
import { CiSearch } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { PiShoppingCartSimpleThin } from "react-icons/pi";


const NavbarActions = () => {
  return (
    <div className='flex gap-5 pr-2 ' >
      <CiSearch className='text-xl hover:text-primary transition-colors cursor-pointer' />
      <CiUser className='text-xl hover:text-primary transition-colors cursor-pointer' />
      <CiHeart className='text-xl hover:text-primary transition-colors cursor-pointer' />
      <PiShoppingCartSimpleThin className='text-xl hover:text-primary transition-colors cursor-pointer' />
    </div>
  )
}

export default NavbarActions