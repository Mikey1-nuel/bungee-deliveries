"use client";

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  Observable,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { CombinedGraphQLErrors } from "@apollo/client/errors";
import { ServerError } from "@apollo/client";
import {
  getAccessToken,
  getRefreshToken,
  setAuthStorage,
  clearAuthStorage,
} from "@/utils/authStorage";

const GQL_URL =
  process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:5000/graphql";

//
// HTTP LINK
//

const httpLink = createHttpLink({
  uri: GQL_URL,
  credentials: "include",
});

//
// AUTH LINK — attaches Bearer token to every request
//

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();
  return {
    headers: {
      ...headers,
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  };
});

//
// SILENT REFRESH — calls backend directly, no temp Apollo client
//

let isRefreshing = false;
let pendingQueue: Array<(token: string) => void> = [];

const flushQueue = (newToken: string) => {
  pendingQueue.forEach((resolve) => resolve(newToken));
  pendingQueue = [];
};

const doRefresh = async (): Promise<string> => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) throw new Error("No refresh token available");

  const response = await fetch(GQL_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        mutation RefreshToken($token: String!) {
          refreshToken(token: $token) {
            accessToken
            refreshToken
          }
        }
      `,
      variables: { token: refreshToken },
    }),
  });

  const json = await response.json();

  if (json.errors || !json.data?.refreshToken) {
    throw new Error("Refresh failed");
  }

  const { accessToken, refreshToken: newRefresh } = json.data.refreshToken;

  // Save both — refresh token is rotated on every refresh
  setAuthStorage({ accessToken, refreshToken: newRefresh });

  return accessToken;
};

const redirectToLogin = () => {
  if (typeof window !== "undefined") {
    clearAuthStorage();
    window.location.href = "/logIn";
  }
};

//
// ERROR LINK — intercepts Unauthorized, silently refreshes, retries
//

const errorLink = onError(({ error, operation, forward }) => {
  if (CombinedGraphQLErrors.is(error)) {
    const isUnauthorized = error.errors.some(
      (e) =>
        e.message?.toLowerCase().includes("unauthorized") ||
        e.message?.toLowerCase().includes("not authenticated") ||
        e.extensions?.code === "UNAUTHENTICATED",
    );

    if (isUnauthorized) {
      // Never retry auth mutations — prevents infinite loops
      const opName = operation.operationName ?? "";
      if (
        opName === "Login" ||
        opName === "Signup" ||
        opName === "RefreshToken" ||
        opName === "ValidateSession"
      ) {
        return;
      }

      if (isRefreshing) {
        // Queue this request until refresh resolves
        return new Observable((observer) => {
          pendingQueue.push((newToken: string) => {
            operation.setContext(({ headers = {} }: any) => ({
              headers: { ...headers, authorization: `Bearer ${newToken}` },
            }));

            forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          });
        });
      }

      isRefreshing = true;

      return new Observable((observer) => {
        doRefresh()
          .then((newToken) => {
            flushQueue(newToken);
            isRefreshing = false;

            operation.setContext(({ headers = {} }: any) => ({
              headers: { ...headers, authorization: `Bearer ${newToken}` },
            }));

            forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch((err) => {
            isRefreshing = false;
            pendingQueue = [];
            console.error("Silent refresh failed:", err);
            redirectToLogin();
            observer.error(err);
          });
      });
    }

    //
    // NETWORK 401
    //

    if (ServerError.is(error) && error.statusCode === 401) {
      redirectToLogin();
    }
  }
});

//
// APOLLO CLIENT
//

export const apolloClient = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { fetchPolicy: "cache-and-network" },
    query: { fetchPolicy: "network-only" },
  },
});
