import { apolloClient } from "@/lib/apolloClient";

import { clearAuthStorage } from "./authStorage";

export const forceLogout = async () => {
  clearAuthStorage();

  await apolloClient.clearStore();

  window.location.href = "/logIn";
};
