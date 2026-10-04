"use client";

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

import { setContext } from "@apollo/client/link/context";

import { getAccessToken } from "@/utils/authStorage";

import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from '@/theme';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URL || "http://localhost:5000/graphql",

  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  const token = getAccessToken();

  return {
    headers: {
      ...headers,

      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),

  cache: new InMemoryCache(),
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export function ApProviders({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
