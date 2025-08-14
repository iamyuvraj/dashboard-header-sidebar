import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      setUser({ name: 'Admin User', email: 'admin@example.com' });
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    // Simulate API call
    if (credentials.username === 'admin' && credentials.password === 'password') {
      const token = 'dummy-jwt-token';
      localStorage.setItem('authToken', token);
      setIsAuthenticated(true);
      setUser({ name: 'Admin User', email: 'admin@example.com' });
      return { success: true };
    }
    return { success: false, message: 'Invalid credentials' };
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
