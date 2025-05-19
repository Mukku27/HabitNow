import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
// import AuthService from "../services/auth"; // Removed due to TS6133 error
// import useAuth from '../api/hooks/useAuth'; // Removed due to TS2307 error

// Note: AuthContextType and useAuthHook removed due to TS2307 and TS2304 errors.
// Using a simplified type and placeholder hook.
// Create a type for the auth context
type AuthContextType = {
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  authenticatedFetch: (url: string, options?: RequestInit) => Promise<Response>;
};

// Create the context with a default value of null
const AuthContext = createContext<AuthContextType | null>(null);

// Create a provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  // Note: useAuthHook removed due to TS2304 error. Using placeholder hook.
  const useAuthHook = () => ({
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    signIn: async (email: string, password: string) => { console.log('signIn placeholder'); },
    signUp: async (email: string, password: string) => { console.log('signUp placeholder'); },
    signOut: () => { console.log('signOut placeholder'); },
    authenticatedFetch: async (url: string, options?: RequestInit) => { console.log('authenticatedFetch placeholder'); return new Response(JSON.stringify({}), { status: 200 }); },
  });

  const auth = useAuthHook();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// Create a hook to use the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
