import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 🔥 Shuru mein check karega agar localStorage mein pehle se user ka login data para ho
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem('mazaCartUser');
    return localUser ? JSON.parse(localUser) : null;
  });

  // Login handler
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('mazaCartUser', JSON.stringify(userData));
  };

  // Logout handler
  const logout = () => {
    setUser(null);
    localStorage.removeItem('mazaCartUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.isAdmin || false }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}