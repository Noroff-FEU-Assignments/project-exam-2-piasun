import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getUser,
  saveUser,
  saveToken,
  clearStorage,
  isLoggedIn as checkIsLoggedIn,
} from "../hooks/useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = getUser();
    const loggedIn = checkIsLoggedIn();
    setUser(user);
    setIsLoggedIn(loggedIn);
  }, []);

  const login = (userData, token) => {
    saveUser(userData);
    saveToken(token);
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    clearStorage();
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);



/*import React, { createContext, useContext, useEffect, useState } from 'react';
import { getToken, saveToken, clearStorage, isLoggedIn as checkLoggedIn } from '../hooks/useLocalStorage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(checkLoggedIn());

    useEffect(() => {
        const handleStorageChange = (event) => {
          if (event.key === 'accestoken') {
            setIsLoggedIn(checkLoggedIn());
          }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const login = (token) => {
        saveToken(token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        clearStorage();
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);



/*import React, { createContext, useContext, useState, useEffect } from 'react';
import storage from '../hooks/useLocalStorage';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = storage.getToken();
    setIsAuthenticated(!!token);
  }, []);

  const login = (token) => {
    storage.setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    storage.clearToken();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);*/