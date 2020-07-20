import { STORAGE_KEYS } from "./constants";

export const isAuthenticated = () => {
  const adminData = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.ADMIN));
  const { valid } = adminData || {};
  return !!valid;
};
