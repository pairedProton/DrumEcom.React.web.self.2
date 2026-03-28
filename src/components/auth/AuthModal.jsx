import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AuthModal = () => {
  const { isAuthModalOpen, authView, closeAuthModal, setAuthView, login, signup } = useAuth();
  
  // Local state handling explicit payload components seamlessly
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if(phone && password) login(phone, password);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if(name && email && phone && password) signup(name, email, phone, password);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-[#fbf9f5] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative">
        <button 
          onClick={closeAuthModal} 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 transition p-1 cursor-pointer bg-white rounded-full shadow-sm"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <div className="p-8">
          <h2 className="text-[2rem] font-heading font-bold text-center text-emerald-800 mb-6 tracking-tight">
            {authView === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>

          {authView === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
               <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Phone Number</label>
                  <input type="tel" required value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white" placeholder="+91 xxxxx xxxxx" />
               </div>
               <div>
                  <label className="text-sm font-semibold text-gray-700 mb-1 block">Password</label>
                  <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white" placeholder="••••••••" />
               </div>
               <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-lg transition-all shadow-md mt-2 text-lg">Login</button>
               <p className="text-center text-[15px] font-medium text-gray-600 mt-4">
                  New to Taurus? <span onClick={() => setAuthView('signup')} className="text-emerald-700 font-bold cursor-pointer hover:underline">Sign up</span>
               </p>
            </form>
          ) : (
             <form onSubmit={handleSignupSubmit} className="flex flex-col gap-4">
               <div>
                  <label className="text-[13px] font-semibold text-gray-700 mb-1 block">Full Name</label>
                  <input type="text" required value={name} onChange={(e)=>setName(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white" placeholder="John Doe" />
               </div>
               <div>
                  <label className="text-[13px] font-semibold text-gray-700 mb-1 block">Email Address</label>
                  <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white" placeholder="john@example.com" />
               </div>
               <div>
                  <label className="text-[13px] font-semibold text-gray-700 mb-1 block">Phone Number</label>
                  <input type="tel" required value={phone} onChange={(e)=>setPhone(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white" placeholder="+91 xxxxx xxxxx" />
               </div>
               <div>
                  <label className="text-[13px] font-semibold text-gray-700 mb-1 block">Password</label>
                  <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white" placeholder="••••••••" />
               </div>
               <button type="submit" className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3.5 rounded-lg transition-all shadow-md mt-2 text-lg">Sign Up</button>
               <p className="text-center text-[15px] font-medium text-gray-600 mt-2">
                  Already have an account? <span onClick={() => setAuthView('login')} className="text-emerald-700 font-bold cursor-pointer hover:underline">Login</span>
               </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
export default AuthModal;
