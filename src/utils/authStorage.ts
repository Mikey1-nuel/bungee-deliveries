export const STORAGE_KEYS = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
};

const isBrowser = typeof window !== "undefined";

export const getAccessToken = (): string | null => {
  if (!isBrowser) return null;
  return localStorage.getItem(STORAGE_KEYS.accessToken);
};

export const getRefreshToken = (): string | null => {
  if (!isBrowser) return null;
  return localStorage.getItem(STORAGE_KEYS.refreshToken);
};

interface AuthStorageInput {
  accessToken: string;
  refreshToken: string;
}

export const setAuthStorage = ({
  accessToken,
  refreshToken,
}: AuthStorageInput) => {
  if (!isBrowser) return;
  localStorage.setItem(STORAGE_KEYS.accessToken, accessToken);
  localStorage.setItem(STORAGE_KEYS.refreshToken, refreshToken);
};

export const clearAuthStorage = () => {
  if (!isBrowser) return;
  localStorage.removeItem(STORAGE_KEYS.accessToken);
  localStorage.removeItem(STORAGE_KEYS.refreshToken);
};
