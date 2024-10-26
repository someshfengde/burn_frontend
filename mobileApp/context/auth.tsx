import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      setIsAuthenticated(!!token);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (token: string) => {
    try {
      await AsyncStorage.setItem("userToken", token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  if (isLoading) {
    // You might want to return a loading screen here
    return null;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
