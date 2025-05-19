import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
// import AuthService from "../services/auth"; // Removed due to TS6133 error

interface AuthContextType {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  authenticatedFetch: (url: string, options?: RequestInit) => Promise<Response>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    return localStorage.getItem('accessToken');
  });
  const [refreshToken, setRefreshToken] = useState<string | null>(() => {
    return localStorage.getItem('refreshToken');
  });

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    } else {
      localStorage.removeItem('accessToken');
    }
  }, [accessToken]);

  useEffect(() => {
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    } else {
      localStorage.removeItem('refreshToken');
    }
  }, [refreshToken]);

  const signIn = useCallback(async (email: string, password: string) => {
    // Simulate async sign in
    await new Promise((resolve) => setTimeout(resolve, 500));
    setAccessToken("mock-access-token-1234567890");
    setRefreshToken("mock-refresh-token-0987654321");
  }, []);

  const signUp = useCallback(async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    setAccessToken("mock-access-token-1234567890");
    setRefreshToken("mock-refresh-token-0987654321");
  }, []);

  const signOut = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }, []);

  const authenticatedFetch = useCallback(async (url: string, options: RequestInit = {}) => {
    // Simulate always successful fetch with a dummy Response
    await new Promise((resolve) => setTimeout(resolve, 500));
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }, []);

  const value = {
    isAuthenticated: !!accessToken,
    accessToken,
    refreshToken,
    signIn,
    signUp,
    signOut,
    authenticatedFetch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 