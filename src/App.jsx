import React from 'react'
import Routing from './routes/Routing'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { OrderProvider } from './context/OrderContext'

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <div className="w-full min-h-screen bg-bg font-heading ">  
           <Routing/>
          </div>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App