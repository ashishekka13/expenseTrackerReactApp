import useApiRequest from "../hooks/useApiRequest";
import { STORAGE_KEYS } from "../helpers/constants";
const BASE_URL = `http://127.0.0.1:8080`;

const getCredentials = () => {
  const adminData = JSON.parse(sessionStorage.getItem(STORAGE_KEYS.ADMIN));
  // const { id, key } = adminData || {};
  return { token: adminData };
};

export const useLoginRequest = () =>
  useApiRequest(`${BASE_URL}/verifyCredentials`, { verb: "post" });

export const useCreateNewAccount = () =>
  useApiRequest(`${BASE_URL}/registerUser`, { verb: "post" });

export const useLogoutRequest = () =>
  useApiRequest(`${BASE_URL}/logout`, {
    verb: "post",
    token: getCredentials(),
  });

export const useCheckUsernameAvailability = () =>
  useApiRequest(`${BASE_URL}/checkUsernameAvailability`, {
    verb: "post",
    token: getCredentials(),
  });

export const useAddSharedUser = () =>
  useApiRequest(`${BASE_URL}/addSharedUser`, {
    verb: "post",
    token: getCredentials(),
  });
export const useGetPersonalDetails = () =>
  useApiRequest(`${BASE_URL}/fetchPersonalDetails`, {
    verb: "post",
    token: getCredentials(),
  });

export const useUpdatePassword = () =>
  useApiRequest(`${BASE_URL}/updatePassword`, {
    verb: "post",
    token: getCredentials(),
  });
export const useUpdateFullName = () =>
  useApiRequest(`${BASE_URL}/updateUserNameDetails`, {
    verb: "post",
    token: getCredentials(),
  });
export const useUpdateEmail = () =>
  useApiRequest(`${BASE_URL}/updateEmailDetails`, {
    verb: "post",
    token: getCredentials(),
  });

export const useGetRecentExpenses = () =>
  useApiRequest(`${BASE_URL}/getRecentExpenses`, {
    verb: "post",
    token: getCredentials(),
  });

export const useGetTotalBalanceAmount = () =>
  useApiRequest(`${BASE_URL}/getTotalBalanceAmount`, {
    verb: "post",
    token: getCredentials(),
  });

export const useGetPendingBalanceAmount = () =>
  useApiRequest(`${BASE_URL}/getPendingBalanceAmount`, {
    verb: "post",
    token: getCredentials(),
  });

export const useGetPendingBalances = () =>
  useApiRequest(`${BASE_URL}/getPendingBalances`, {
    verb: "post",
    token: getCredentials(),
  });
export const useGetTotalBalances = () =>
  useApiRequest(`${BASE_URL}/getTotalBalances`, {
    verb: "post",
    token: getCredentials(),
  });

export const useCreateNewExpense = () =>
  useApiRequest(`${BASE_URL}/createNewExpense`, {
    verb: "post",
    token: getCredentials(),
  });

export const useGetExpensesByDate = () =>
  useApiRequest(`${BASE_URL}/getExpensesByDate`, {
    verb: "post",
    token: getCredentials(),
  });

export const useFetchUnseenNotifications = () =>
  useApiRequest(`${BASE_URL}/fetchUnseenNotifications`, {
    verb: "post",
    token: getCredentials(),
  });

export const useMarkNotificationAsSeen = () =>
  useApiRequest(`${BASE_URL}/markNotificationSeen`, {
    verb: "post",
    token: getCredentials(),
  });

export const useSettleUpExpense = () =>
  useApiRequest(`${BASE_URL}/settleUpExpense`, {
    verb: "post",
    token: getCredentials(),
  });
