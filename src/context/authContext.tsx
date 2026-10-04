"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { useApolloClient } from "@apollo/client/react";

import { useRouter, usePathname } from "next/navigation";

import { VALIDATE_SESSION } from "@/graphql/queries/auth";

import {
  clearAuthStorage,
  getAccessToken,
  setAuthStorage,
} from "@/utils/authStorage";

import { AuthUser, ValidateSessionResponse } from "@/app/types/type";

import { connectSocket, disconnectSocket } from "@/lib/socket";
import { LOGOUT_MUTATION } from "@/graphql/mutations/auth";

interface AuthContextType {
  user: AuthUser | null;

  authenticated: boolean;

  loading: boolean;

  accessToken: string | null;

  validateSession: () => Promise<boolean>;

  login: (accessToken: string, refreshToken: string) => Promise<void>;

  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,

  authenticated: false,

  loading: true,

  accessToken: null,

  validateSession: async () => false,

  login: async () => {},

  logout: async () => {},
});

const getDashboardByRole = (role: string): string => {
  switch (role) {
    case "admin":
      return "/dashboard/admin";
    case "restaurant":
      return "/dashboard/restaurant_dash";
    case "rider":
      return "/dashboard/rider";
    case "logistics":
      return "/dashboard/logistics";
    default:
      return "/dashboard"; // customer
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const client = useApolloClient();

  const router = useRouter();

  const pathname = usePathname();

  const [loading, setLoading] = useState(true);

  const [authenticated, setAuthenticated] = useState(false);

  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [user, setUser] = useState<AuthUser | null>(null);

  //
  // VALIDATE SESSION
  //

  const validateSession = useCallback(async (): Promise<boolean> => {
    try {
      const token = getAccessToken();
      setAccessToken(token);

      //
      // NO TOKEN
      //

      if (!token) {
        setAuthenticated(false);

        setUser(null);

        return false;
      }

      //
      // VALIDATE
      //

      const { data } = await client.query<ValidateSessionResponse>({
        query: VALIDATE_SESSION,

        fetchPolicy: "network-only",
      });

      const valid = data?.validateSession?.authenticated;

      if (!valid) {
        clearAuthStorage();

        setAuthenticated(false);

        setUser(null);

        return false;
      }

      //
      // SUCCESS
      //

      setAuthenticated(true);

      setUser(data.validateSession.user);

      return true;
    } catch (error) {
      console.error("VALIDATION ERROR:", error);

      clearAuthStorage();

      setAuthenticated(false);

      setUser(null);

      return false;
    }
  }, [client]);

  //
  // LOGIN
  //

  const login = useCallback(
    async (newAccessToken: string, refreshToken: string) => {
      //
      // SAVE TOKENS
      //

      setAuthStorage({
        accessToken: newAccessToken,
        refreshToken,
      });

      setAccessToken(newAccessToken);

      //
      // WAIT A TICK
      // VERY IMPORTANT
      //

      await new Promise((resolve) => setTimeout(resolve, 50));

      //
      // VALIDATE SESSION
      //

      const success = await validateSession();

      if (success) {
        connectSocket(newAccessToken);
        // user state is set by validateSession — read it from the query result
        const { data } = await client.query<ValidateSessionResponse>({
          query: VALIDATE_SESSION,
          fetchPolicy: "cache-only", // already fetched, just read cache
        });
        const role = data?.validateSession?.user?.role ?? "customer";
        router.replace(getDashboardByRole(role));
      }
    },
    [router, validateSession, client],
  );

  //
  // LOGOUT
  //

// AuthContext.tsx — logout callback
const logout = useCallback(async () => {
  try {
    // Fire backend logout first while token is still in storage
    await client.mutate({ mutation: LOGOUT_MUTATION });
  } catch (err) {
    // Ignore — we're logging out regardless
    console.warn("Backend logout error (non-fatal):", err);
  }

  clearAuthStorage();
  await client.clearStore();
  disconnectSocket();
  setAuthenticated(false);
  setAccessToken(null);
  setUser(null);
  router.replace("/logIn");
}, [client, router]);

  //
  // INITIAL APP LOAD
  //

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);

      const valid = await validateSession();

      const authPages = ["/logIn", "/signUp"];

      //
      // NOT AUTHENTICATED
      //

      if (!valid && !authPages.includes(pathname)) {
        router.replace("/logIn");
      }

      //
      // AUTHENTICATED
      //

      if (valid && authPages.includes(pathname)) {
        // Reconnect socket on page refresh if already logged in
        const token = getAccessToken();
  if (token) connectSocket(token);
  const { data } = await client.query<ValidateSessionResponse>({
    query: VALIDATE_SESSION,
    fetchPolicy: "cache-only",
  });
  const role = data?.validateSession?.user?.role ?? "customer";
  router.replace(getDashboardByRole(role));
}

      setLoading(false);
    };

    initialize();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,

        authenticated,

        loading,

        accessToken,

        validateSession,

        login,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
