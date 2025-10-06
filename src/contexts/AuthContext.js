// src/contexts/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { setTokens, getAccessToken, logout as logoutUser } from "../services/auth";
import { apiRequest } from "../services/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setUser({ isAuthenticated: true });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await apiRequest("/auth/login", "POST", credentials);
    setTokens(data.accessToken, data.refreshToken);
    setUser({ isAuthenticated: true });
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const value = { user, login, logout, loading };

  if (loading) {
    return <p>Carregando aplicação...</p>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
