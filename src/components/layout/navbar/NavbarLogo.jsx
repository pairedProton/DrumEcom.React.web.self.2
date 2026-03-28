import React from 'react'
import {logoImages} from '../../../assets/images'
import { Link } from 'react-router-dom'

const NavbarLogo = () => {
  return (
    <figure className="figure h-full aspect-square  ">
      <Link to="/">
      <img src={logoImages.lightlogo} alt="lightlogo" className="drop-shadow-xl" />
      </Link>
    </figure>
  );
}

export default NavbarLogo