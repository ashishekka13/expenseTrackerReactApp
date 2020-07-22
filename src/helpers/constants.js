export const STATUS = {
  SUCCESS: "success",
  FAILED: "failed",
  UNAUTHENTICATED: "unauthenticated",
  UNAUTHORISED: "unauthorised",
};

export const STORAGE_KEYS = {
  ADMIN: "token",
};

export const ROUTES = {
  HOME: "/user/home",
  EXPENSES: "/user/expenses",
  ACCOUNT: "/user/account",
  LOGIN: "/login",
};

export const ACTION = {};

export const LOGGER = {
  CREATE_EXPENSE: " Created a new Expense. ",
  TAG_EXPENSE: " Tagged you in an Expense. ",
  SETTLE_EXPENSE: " Settled an Expense. ",
  CREATE_USER: " Created a new Account. ",
  LOGIN: " Logged in to the System. ",
};

export const LOGCONTEXT = {
  CREATE_EXPENSE: "",
  TAG_EXPENSE: "",
  SETTLE_EXPENSE: "Hi, I have settled an expense",
  CREATE_USER: "",
  LOGIN: "",
};
