"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { apiClient, refreshSession } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";
import { setAccessToken, clearTokens } from "@/lib/auth/token-store";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  phone: string;
  role: "customer" | "admin" | "super_admin";
  status: "active" | "inactive" | "suspended";
  email_verified: boolean;
  created_at: string;
}

/** Body the backend returns from register, login and refresh. */
interface SessionResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}

interface AuthContextValue {
  user: User | null;
  /** True until the session has been restored on first load. */
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (data: RegisterData) => Promise<User>;
  logout: () => Promise<void>;
  /**
   * True from the moment a sign-out starts until the page it navigates to has
   * loaded. The route guard reads it so an intentional sign-out is not treated
   * as an expired session, which would bounce the customer to the sign-in page
   * instead of the home page.
   */
  isSigningOut: boolean;
  changePassword: (current: string, next: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const queryClient = useQueryClient();

  const refreshUser = useCallback(async () => {
    try {
      setUser(await apiClient.get<User>(API.auth.me));
    } catch {
      clearTokens();
      setUser(null);
    }
  }, []);

  // On first load the access token is gone (it only ever lived in memory), so
  // the session is restored from the refresh cookie before asking who we are.
  // Without a cookie this is a single rejected request and no user.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const restored = await refreshSession();
      if (restored && !cancelled) {
        await refreshUser();
      }
      if (!cancelled) setIsLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [refreshUser]);

  const login = useCallback(
    async (email: string, password: string) => {
      // skipRefresh: a 401 here means the credentials are wrong, not that a
      // session expired. Without it the client would try to refresh a session
      // that does not exist and report its failure instead, so a mistyped
      // password would read as "your session has expired".
      const session = await apiClient.post<SessionResponse>(
        API.auth.login,
        { email, password },
        { skipRefresh: true },
      );
      setAccessToken(session.access_token);
      setUser(session.user);
      return session.user;
    },
    [],
  );

  const register = useCallback(async (data: RegisterData) => {
    const session = await apiClient.post<SessionResponse>(
      API.auth.register,
      data,
      { skipRefresh: true },
    );
    setAccessToken(session.access_token);
    setUser(session.user);
    return session.user;
  }, []);

  const logout = useCallback(async () => {
    setIsSigningOut(true);
    try {
      await apiClient.post(API.auth.logout);
    } catch {
      // The local session is cleared regardless: the user asked to sign out.
    }
    clearTokens();
    setUser(null);
    // Drop every cached query so the next user never sees the previous one's data.
    queryClient.clear();
  }, [queryClient]);

  const changePassword = useCallback(
    async (current: string, next: string) => {
      await apiClient.post(API.auth.changePassword, {
        current_password: current,
        new_password: next,
      });
      // The backend revokes every session on a password change.
      clearTokens();
      setUser(null);
      queryClient.clear();
    },
    [queryClient],
  );

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading,
      isAuthenticated: user !== null,
      login,
      register,
      logout,
      isSigningOut,
      changePassword,
      refreshUser,
    }),
    [
      user,
      isLoading,
      isSigningOut,
      login,
      register,
      logout,
      changePassword,
      refreshUser,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
