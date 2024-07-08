const authPayload = (user, remember_me) => ({
  id: user._id,
  confirmedEmail: user.email,
  rememberMe: remember_me,
});

const refreshPayload = (user) => ({
  id: user._id,
});

const baseOptions = {
  algorithm: "HS256",
  issuer: "AuthApp-API",
  subject: "User Token",
  audience: "AuthApp-client",
};

const authOptions = {
  expiresIn: "15m",
  ...baseOptions,
};

const refreshOptions = (remember) => ({
  expiresIn: remember === true ? "60d" : "1d",
  ...baseOptions,
});

const jwtConfig = {
  authJwt: {
    payload: (user, rememberMe) => authPayload(user, rememberMe),
    key: process.env.JWT_AUTH_KEY,
    options: authOptions,
  },
  refreshJwt: {
    payload: (user) => refreshPayload(user),
    key: process.env.JWT_REFRESH_KEY,
    options: (remember) => refreshOptions(remember),
  },
};

module.exports = jwtConfig;
