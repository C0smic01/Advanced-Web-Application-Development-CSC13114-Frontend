import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, tokenManager } from '../utils/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already authenticated on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const refreshToken = tokenManager.getRefreshToken();
        if (refreshToken) {
          // Try to refresh and get user data
          await authAPI.refreshAccessToken();
          const userData = await authAPI.getCurrentUser();
          setUser(userData);
        }
      } catch (err) {
        console.error('Auth initialization failed:', err);
        tokenManager.clearTokens();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.login(email, password);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async (credential) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.googleSignIn(credential);
      setUser(response.user);
      return response;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authAPI.logout();
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    googleSignIn,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
