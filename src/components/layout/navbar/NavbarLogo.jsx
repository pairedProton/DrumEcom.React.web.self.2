import React from 'react'
import {logoImages} from '../../../assets/images'
import { Link } from 'react-router-dom'

const NavbarLogo = () => {
  return (
    <figure className="figure w-21 h-21  flex items-center justify-center">
      <Link to="/" className="w-full h-full block">
        <img src={logoImages.logo} alt="lightlogo" className="w-full h-full object-contain drop-shadow-md rounded-full" />
      </Link>
    </figure>
  );
}

export default NavbarLogo