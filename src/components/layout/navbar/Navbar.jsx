import React from 'react'
import NavbarLogo from './NavbarLogo'
import NavbarMenu from './NavbarMenu'
import NavbarActions from './NavbarActions'


const Navbar = () => {
  return (
    <header className='w-full h-22  flex p-1 px-4 shadow-lg  justify-between items-center z-40'>
      <NavbarLogo/>
      <NavbarMenu/>
      <NavbarActions/>
    </header>
  )
}

export default Navbar