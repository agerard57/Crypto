type AuthTokenData = {
  id: string;
  email: string;
};

type AuthTokenMeta = {
  rememberMe: boolean;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
  sub: string;
};

export interface AuthToken {
  data: AuthTokenData | null;
  meta: AuthTokenMeta;
}

export type LoggedUserDataProps = {
  loggedUserData: AuthTokenData | null;
};
