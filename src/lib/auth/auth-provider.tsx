"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { apiClient } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";
import { setAccessToken, clearTokens } from "@/lib/auth/token-store";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const data = await apiClient.get<User>(API.auth.me);
      setUser(data);
    } catch {
      setUser(null);
      clearTokens();
    }
  }, []);

  useEffect(() => {
    refreshUser().finally(() => setIsLoading(false));
  }, [refreshUser]);

  const login = useCallback(
    async (email: string, password: string) => {
      const data = await apiClient.post<{ access_token: string; user: User }>(
        API.auth.login,
        { email, password }
      );
      setAccessToken(data.access_token);
      setUser(data.user);
    },
    []
  );

  const register = useCallback(
    async (data: RegisterData) => {
      const res = await apiClient.post<{ access_token: string; user: User }>(
        API.auth.register,
        data
      );
      setAccessToken(res.access_token);
      setUser(res.user);
    },
    []
  );

  const logout = useCallback(async () => {
    try {
      await apiClient.post(API.auth.logout);
    } catch {
      // proceed even if logout call fails
    }
    clearTokens();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
