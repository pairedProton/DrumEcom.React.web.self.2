import React, { createContext, useContext, useState, useEffect } from 'react';

const defaultAuthContext = {
  user: null,
  isAuthModalOpen: false,
  authView: 'login',
  openAuthModal: () => {},
  closeAuthModal: () => {},
  login: () => {},
  signup: () => {},
  logout: () => {},
  setAuthView: () => {},
};

const AuthContext = createContext(defaultAuthContext);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState('login'); // 'login' or 'signup'

  // Presistence for mock session continuity
  useEffect(() => {
    const savedUser = localStorage.getItem('taurus_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (phone, password) => {
    // Mock login bypassing network for fully static rendering logic
    const mockUser = { id: Date.now(), phone, name: 'User' };
    setUser(mockUser);
    localStorage.setItem('taurus_user', JSON.stringify(mockUser));
    setIsAuthModalOpen(false);
  };

  const signup = (name, email, phone, password) => {
    // Mock signup handling parameters gracefully 
    const mockUser = { id: Date.now(), name, email, phone };
    setUser(mockUser);
    localStorage.setItem('taurus_user', JSON.stringify(mockUser));
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('taurus_user');
  };

  const openAuthModal = (view = 'login') => {
    setAuthView(view);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthModalOpen,
      authView,
      openAuthModal,
      closeAuthModal,
      login,
      signup,
      logout,
      setAuthView
    }}>
      {children}
    </AuthContext.Provider>
  );
};
