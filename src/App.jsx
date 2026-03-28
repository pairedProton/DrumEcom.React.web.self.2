import React from 'react'
import Routing from './routes/Routing'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="w-full min-h-screen bg-bg font-heading ">  
         <Routing/>
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App