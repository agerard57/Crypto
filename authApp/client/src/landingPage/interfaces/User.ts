export interface User {
  email: string;
  password: string;
  rememberMe: boolean;
}

export const initializeUser = {
  email: "",
  password: "",
  rememberMe: false,
};
