
import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthState, User, getStoredAuth, login as authLogin, register as authRegister, logout as authLogout } from "@/lib/auth";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<User>;
  register: (email: string, password: string, name: string) => Promise<User>;
  logout: () => void;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true
};

const AuthContext = createContext<AuthContextType>({
  ...initialState,
  login: () => Promise.reject("Auth provider not initialized"),
  register: () => Promise.reject("Auth provider not initialized"),
  logout: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  
  useEffect(() => {
    // Check for stored auth data on component mount
    const storedAuth = getStoredAuth();
    setAuthState({
      ...storedAuth,
      isLoading: false
    });
  }, []);
  
  const login = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const user = await authLogin(email, password);
      setAuthState({
        user,
        token: `mock-token-${user.id}`,
        isAuthenticated: true,
        isLoading: false
      });
      return user;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };
  
  const register = async (email: string, password: string, name: string) => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    try {
      const user = await authRegister(email, password, name);
      setAuthState({
        user,
        token: `mock-token-${user.id}`,
        isAuthenticated: true,
        isLoading: false
      });
      return user;
    } catch (error) {
      setAuthState(prev => ({ ...prev, isLoading: false }));
      throw error;
    }
  };
  
  const logout = () => {
    authLogout();
    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false
    });
  };
  
  return (
    <AuthContext.Provider 
      value={{
        ...authState,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
